import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

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
    
    // Temporarily skip auth for testing if needed
    let userId = null;
    try {
      const authResult = await auth();
      userId = authResult?.userId;
    } catch (authError) {
      console.log('Auth error in reviews POST:', authError.message);
    }
    
    if (!toolId || !rating) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const reviewsCollection = await getCollection('reviews');
    const toolsCollection = await getCollection('tools');
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

    try {
      let targetTool = await toolsCollection.findOne({ _id: toolId });
      if (!targetTool && typeof toolId === 'string' && toolId.length === 24) {
        try { targetTool = await toolsCollection.findOne({ _id: new ObjectId(toolId) }); } catch (e) {}
      }
      if (targetTool) {
        const oldVotes = Number(targetTool.votes || 0);
        const oldRating = Number(targetTool.rating || 0);
        const newVotes = oldVotes + 1;
        const newRating = ((oldRating * oldVotes) + Number(rating)) / newVotes;
        await toolsCollection.updateOne({ _id: targetTool._id }, { $set: { rating: Number(newRating.toFixed(1)), votes: newVotes, updatedAt: new Date() } });
      }
    } catch (e) {
      console.error('Error updating tool rating:', e);
    }

    return NextResponse.json({ success: true, review: { ...newReview, _id: result.insertedId }, editToken });
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
    } catch (authError) {
      console.log('Auth error in reviews PATCH:', authError.message);
    }

    if (!reviewId) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

    const reviewsCollection = await getCollection('reviews');
    const toolsCollection = await getCollection('tools');

    let query = { _id: reviewId };
    let review = await reviewsCollection.findOne(query);
    if (!review) {
      try { query = { _id: new ObjectId(reviewId) }; review = await reviewsCollection.findOne(query); } catch (e) {}
    }

    if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    const usersCollection = await getCollection('users');
    const userIsAdmin = userId && await usersCollection.findOne({ userId, role: 'admin' });
    const userIsOwner = userId && review.userId === userId;
    const hasValidToken = editToken && review.editToken === editToken;

    if (!userIsAdmin && !userIsOwner && !hasValidToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await reviewsCollection.updateOne(query, {
      $set: { rating: Number(rating), comment, updatedAt: new Date() }
    });

    try {
      const toolId = review.toolId;
      const allReviews = await reviewsCollection.find({ toolId, status: 'approved' }).toArray();
      const newVotes = allReviews.length;
      const newRating = Number((allReviews.reduce((acc, rev) => acc + rev.rating, 0) / newVotes).toFixed(1));
      await toolsCollection.updateOne({ $or: [{ _id: toolId }, { _id: String(toolId) }] }, { $set: { rating: newRating, votes: newVotes } });
    } catch (e) {
      console.error('Error updating tool rating on PATCH:', e);
    }

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
  } catch (authError) {
    console.log('Auth error in reviews DELETE:', authError.message);
  }

  if (!reviewId) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

  try {
    const reviewsCollection = await getCollection('reviews');
    const toolsCollection = await getCollection('tools');

    let query = { _id: reviewId };
    let review = await reviewsCollection.findOne(query);
    if (!review) {
      try { query = { _id: new ObjectId(reviewId) }; review = await reviewsCollection.findOne(query); } catch (e) {}
    }

    if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    const usersCollection = await getCollection('users');
    const userIsAdmin = userId && await usersCollection.findOne({ userId, role: 'admin' });
    const userIsOwner = userId && review.userId === userId;
    const hasValidToken = editToken && review.editToken === editToken;

    if (!userIsAdmin && !userIsOwner && !hasValidToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await reviewsCollection.deleteOne(query);

    try {
      const toolId = review.toolId;
      const allReviews = await reviewsCollection.find({ toolId, status: 'approved' }).toArray();
      const newVotes = allReviews.length;
      const newRating = newVotes > 0 ? Number((allReviews.reduce((acc, rev) => acc + rev.rating, 0) / newVotes).toFixed(1)) : 0;
      await toolsCollection.updateOne({ $or: [{ _id: toolId }, { _id: String(toolId) }] }, { $set: { rating: newRating, votes: newVotes } });
    } catch (e) {
      console.error('Error updating tool rating on DELETE:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reviews DELETE Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
