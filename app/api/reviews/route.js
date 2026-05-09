import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('toolId');
    
    if (!toolId) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
    }
    
    const reviewsCollection = await getCollection('reviews');
    const toolReviews = await reviewsCollection
      .find({ toolId, status: 'approved' })
      .sort({ createdAt: -1 })
      .toArray();
      
    return NextResponse.json(toolReviews);
  } catch (error) {
    console.error('Reviews GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { toolId, rating, comment, userName } = body;
    
    if (!toolId || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const reviewsCollection = await getCollection('reviews');
    const toolsCollection = await getCollection('tools');
    
    const newReview = {
      toolId,
      rating: Number(rating),
      comment: comment || '',
      userName: userName || 'Anonymous',
      status: 'approved',
      createdAt: new Date()
    };
    
    await reviewsCollection.insertOne(newReview);
    
    // Update tool's aggregate rating and votes
    try {
      const tool = await toolsCollection.findOne({ _id: toolId }); // Try string ID first
      let targetTool = tool;
      
      if (!targetTool) {
        // Try ObjectId if string ID fails
        try {
          targetTool = await toolsCollection.findOne({ _id: new ObjectId(toolId) });
        } catch (e) {}
      }
      
      if (targetTool) {
        const newVotes = (targetTool.votes || 0) + 1;
        const newRating = ((targetTool.rating || 0) * (targetTool.votes || 0) + Number(rating)) / newVotes;
        
        await toolsCollection.updateOne(
          { _id: targetTool._id },
          { $set: { rating: Number(newRating.toFixed(1)), votes: newVotes } }
        );
      }
    } catch (updateError) {
      console.error('Error updating tool rating:', updateError);
      // Don't fail the review submission if only the aggregate update fails
    }
    
    return NextResponse.json({ success: true, review: newReview });
  } catch (error) {
    console.error('Reviews POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
