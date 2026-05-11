import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

/**
 * Utility to recalculate and update tool rating/votes
 */
async function updateToolStats(toolId) {
  try {
    const reviewsCollection = await getCollection('reviews');
    const toolsCollection = await getCollection('tools');

    // Aggregate reviews to get fresh stats
    const stats = await reviewsCollection.aggregate([
      { $match: { toolId: String(toolId), status: 'approved' } },
      {
        $group: {
          _id: '$toolId',
          averageRating: { $avg: '$rating' },
          totalVotes: { $sum: 1 }
        }
      }
    ]).toArray();

    const newStats = stats[0] || { averageRating: 0, totalVotes: 0 };
    
    // Support both string and ObjectId lookups for safety
    const query = { $or: [{ _id: toolId }, { _id: String(toolId) }] };
    try {
      if (typeof toolId === 'string' && toolId.length === 24) {
        query.$or.push({ _id: new ObjectId(toolId) });
      }
    } catch (e) {}

    await toolsCollection.updateOne(query, {
      $set: {
        rating: Number(newStats.averageRating.toFixed(1)),
        votes: newStats.totalVotes,
        updatedAt: new Date()
      }
    });

    return newStats;
  } catch (error) {
    console.error('Error updating tool stats:', error);
    throw error;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const toolId = searchParams.get('toolId');
  if (!toolId) return NextResponse.json({ error: 'toolId required' }, { status: 400 });

  try {
    const reviewsCollection = await getCollection('reviews');
    const toolReviews = await reviewsCollection
      .find({ toolId, status: 'approved' }, { projection: { editToken: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
      
    return NextResponse.json(toolReviews);
  } catch (error) {
    console.error('Reviews GET Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { toolId, rating, comment, userName } = body;
    
    let userId = null;
    try {
      const authResult = await auth();
      userId = authResult?.userId;
    } catch (authError) {}
    
    if (!toolId || !rating) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const reviewsCollection = await getCollection('reviews');
    const editToken = !userId ? uuidv4() : null;

    const newReview = {
      toolId: String(toolId),
      rating: Number(rating),
      comment: comment || '',
      userName: userName || 'Anonymous',
      userId: userId || null,
      editToken,
      status: 'approved',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await reviewsCollection.insertOne(newReview);
    
    // Asynchronously update stats to not block response
    updateToolStats(toolId).catch(err => console.error('Delayed stats update failed:', err));

    return NextResponse.json({ 
      success: true, 
      review: { ...newReview, _id: result.insertedId }, 
      editToken 
    });
  } catch (error) {
    console.error('Reviews POST Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { reviewId, rating, comment, editToken } = body;
    
    let userId = null;
    try {
      const authResult = await auth();
      userId = authResult?.userId;
    } catch (e) {}

    if (!reviewId) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

    const reviewsCollection = await getCollection('reviews');
    
    let query = { _id: reviewId };
    let review = await reviewsCollection.findOne(query);
    if (!review) {
      try { query = { _id: new ObjectId(reviewId) }; review = await reviewsCollection.findOne(query); } catch (e) {}
    }

    if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    // Permissions check
    const usersCollection = await getCollection('users');
    const isAdmin = userId && (await usersCollection.findOne({ userId, role: 'admin' }));
    const isOwner = userId && review.userId === userId;
    const isTokenValid = editToken && review.editToken === editToken;

    if (!isAdmin && !isOwner && !isTokenValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await reviewsCollection.updateOne(query, {
      $set: { 
        rating: Number(rating), 
        comment: comment || '', 
        updatedAt: new Date() 
      }
    });

    await updateToolStats(review.toolId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reviews PATCH Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const reviewId = searchParams.get('id');
  const editToken = searchParams.get('editToken');
  
  let userId = null;
  try {
    const authResult = await auth();
    userId = authResult?.userId;
  } catch (e) {}

  if (!reviewId) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

  try {
    const reviewsCollection = await getCollection('reviews');

    let query = { _id: reviewId };
    let review = await reviewsCollection.findOne(query);
    if (!review) {
      try { query = { _id: new ObjectId(reviewId) }; review = await reviewsCollection.findOne(query); } catch (e) {}
    }

    if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    const usersCollection = await getCollection('users');
    const isAdmin = userId && (await usersCollection.findOne({ userId, role: 'admin' }));
    const isOwner = userId && review.userId === userId;
    const isTokenValid = editToken && review.editToken === editToken;

    if (!isAdmin && !isOwner && !isTokenValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await reviewsCollection.deleteOne(query);
    await updateToolStats(review.toolId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reviews DELETE Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

