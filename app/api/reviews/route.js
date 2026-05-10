import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';

// Helper to check if user is admin
async function isAdmin(userId) {
  if (!userId) return false;
  const usersCollection = await getCollection('users');
  const user = await usersCollection.findOne({ userId, role: 'admin' });
  return !!user;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('toolId');
    
    console.log(`[Reviews GET] Fetching reviews for toolId: ${toolId}`);
    
    if (!toolId) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
    }
    
    const reviewsCollection = await getCollection('reviews');
    
    // Find reviews - handle both string and potential ObjectId toolId
    const toolReviews = await reviewsCollection
      .find({ 
        toolId: toolId,
        status: 'approved' 
      })
      .sort({ createdAt: -1 })
      .toArray();
      
    console.log(`[Reviews GET] Found ${toolReviews.length} reviews`);
    return NextResponse.json(toolReviews);
  } catch (error) {
    console.error('[Reviews GET Error]:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews', details: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { toolId, rating, comment, userName } = body;
    
    console.log(`[Reviews POST] Received review for toolId: ${toolId}, rating: ${rating}`);
    
    if (!toolId || !rating) {
      return NextResponse.json({ error: 'Missing required fields (toolId, rating)' }, { status: 400 });
    }
    
    const reviewsCollection = await getCollection('reviews');
    const toolsCollection = await getCollection('tools');
    
    const { userId } = await auth();
    const editToken = !userId ? uuidv4() : null;
    
    const newReview = {
      toolId: String(toolId), // Ensure toolId is stored as string
      rating: Number(rating),
      comment: comment || '',
      userName: userName || 'Anonymous',
      userId: userId || null, // Store userId if authenticated
      editToken: editToken, // Token for anonymous edits
      status: 'approved',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await reviewsCollection.insertOne(newReview);
    console.log(`[Reviews POST] Review inserted with ID: ${result.insertedId}`);
    
    // Update tool's aggregate rating and votes
    try {
      // Find tool by ID (try both string and ObjectId)
      let targetTool = await toolsCollection.findOne({ _id: toolId });
      
      if (!targetTool && typeof toolId === 'string' && toolId.length === 24) {
        try {
          targetTool = await toolsCollection.findOne({ _id: new ObjectId(toolId) });
        } catch (e) {}
      }
      
      if (targetTool) {
        const oldVotes = Number(targetTool.votes || 0);
        const oldRating = Number(targetTool.rating || 0);
        const newVotes = oldVotes + 1;
        const newRating = ((oldRating * oldVotes) + Number(rating)) / newVotes;
        
        await toolsCollection.updateOne(
          { _id: targetTool._id },
          { $set: { 
            rating: Number(newRating.toFixed(1)), 
            votes: newVotes,
            updatedAt: new Date()
          } }
        );
        console.log(`[Reviews POST] Tool rating updated: ${newRating.toFixed(1)} (${newVotes} votes)`);
      } else {
        console.warn(`[Reviews POST] Tool with ID ${toolId} not found for rating update`);
      }
    } catch (updateError) {
      console.error('[Reviews POST] Error updating tool aggregate rating:', updateError);
    }
    
    return NextResponse.json({ 
      success: true, 
      review: { ...newReview, _id: result.insertedId }, 
      editToken 
    });
  } catch (error) {
    console.error('[Reviews POST Error]:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('id');
    const editToken = searchParams.get('editToken');
    const { userId } = await auth();

    if (!reviewId) {
      return NextResponse.json({ error: 'Review ID required' }, { status: 400 });
    }

    const reviewsCollection = await getCollection('reviews');
    const toolsCollection = await getCollection('tools');

    // Find the review to check ownership
    let query = { _id: reviewId };
    let review = await reviewsCollection.findOne(query);
    
    if (!review) {
      try {
        query = { _id: new ObjectId(reviewId) };
        review = await reviewsCollection.findOne(query);
      } catch (e) {}
    }

    if (!review) {
      console.warn(`[Reviews DELETE] Review not found: ${reviewId}`);
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    console.log(`[Reviews DELETE] Found review. userId: ${review.userId}, editToken: ${review.editToken}`);

    // Check if user is owner or admin or has correct editToken
    const userIsAdmin = await isAdmin(userId);
    const userIsOwner = userId && review.userId === userId;
    const hasValidToken = editToken && review.editToken === editToken;

    console.log(`[Reviews DELETE] Permissions - Admin: ${userIsAdmin}, Owner: ${userIsOwner}, Token: ${hasValidToken}`);

    if (!userIsAdmin && !userIsOwner && !hasValidToken) {
      return NextResponse.json({ error: 'Unauthorized to delete this review' }, { status: 401 });
    }

    // Delete the review
    const deleteResult = await reviewsCollection.deleteOne(query);
    console.log(`[Reviews DELETE] Delete result:`, deleteResult);

    // Update tool aggregate rating
    try {
      const toolId = review.toolId;
      const allReviews = await reviewsCollection.find({ toolId, status: 'approved' }).toArray();
      
      const newVotes = allReviews.length;
      const newRating = newVotes > 0 
        ? Number((allReviews.reduce((acc, rev) => acc + rev.rating, 0) / newVotes).toFixed(1))
        : 0;

      // Update tool using both string and ObjectId formats for robustness
      const toolUpdateResult = await toolsCollection.updateOne(
        { $or: [{ _id: toolId }, { _id: String(toolId) }] },
        { $set: { rating: newRating, votes: newVotes } }
      );
      
      if (toolUpdateResult.matchedCount === 0 && typeof toolId === 'string' && toolId.length === 24) {
        await toolsCollection.updateOne(
          { _id: new ObjectId(toolId) },
          { $set: { rating: newRating, votes: newVotes } }
        );
      }
      
      console.log(`[Reviews DELETE] Tool aggregate updated: ${newRating} (${newVotes} votes)`);
    } catch (e) {
      console.error('[Reviews DELETE] Error updating tool rating:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Reviews DELETE Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { reviewId, rating, comment, editToken } = body;
    const { userId } = await auth();

    if (!reviewId) {
      return NextResponse.json({ error: 'Review ID required' }, { status: 400 });
    }

    const reviewsCollection = await getCollection('reviews');
    const toolsCollection = await getCollection('tools');

    // Find the review
    let query = { _id: reviewId };
    let review = await reviewsCollection.findOne(query);
    
    if (!review) {
      try {
        query = { _id: new ObjectId(reviewId) };
        review = await reviewsCollection.findOne(query);
      } catch (e) {}
    }

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Check ownership or admin or editToken
    const userIsAdmin = await isAdmin(userId);
    const userIsOwner = userId && review.userId === userId;
    const hasValidToken = editToken && review.editToken === editToken;

    if (!userIsAdmin && !userIsOwner && !hasValidToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update review
    await reviewsCollection.updateOne(query, {
      $set: {
        rating: Number(rating),
        comment: comment,
        updatedAt: new Date()
      }
    });

    // Update tool aggregate rating
    try {
      const toolId = review.toolId;
      const allReviews = await reviewsCollection.find({ toolId, status: 'approved' }).toArray();
      
      const newVotes = allReviews.length;
      const newRating = Number((allReviews.reduce((acc, rev) => acc + rev.rating, 0) / newVotes).toFixed(1));

      // Update tool using both string and ObjectId formats
      const toolUpdateResult = await toolsCollection.updateOne(
        { $or: [{ _id: toolId }, { _id: String(toolId) }] },
        { $set: { rating: newRating, votes: newVotes } }
      );
      
      if (toolUpdateResult.matchedCount === 0 && typeof toolId === 'string' && toolId.length === 24) {
        await toolsCollection.updateOne(
          { _id: new ObjectId(toolId) },
          { $set: { rating: newRating, votes: newVotes } }
        );
      }
      
      console.log(`[Reviews PATCH] Tool aggregate updated: ${newRating} (${newVotes} votes)`);
    } catch (e) {
      console.error('[Reviews PATCH] Error updating tool rating:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Reviews PATCH Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
