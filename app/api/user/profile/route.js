import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCollection } from '@/lib/db';
import { isValidCountry, isValidLinkedInUrl, normalizeLinkedInUrl } from '@/lib/countries';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const usersCollection = await getCollection('users');
    const email = session.user.email.toLowerCase();
    const dbUser = await usersCollection.findOne({ email });

    if (!dbUser) {
      return NextResponse.json({
        name: session.user.name || '',
        email: session.user.email,
        country: '',
        linkedinProfile: '',
        isProfileComplete: false,
        isAdmin: Boolean(session.user.isAdmin)
      });
    }

    return NextResponse.json({
      name: dbUser.name || session.user.name || '',
      email: dbUser.email || session.user.email,
      country: dbUser.country || '',
      linkedinProfile: dbUser.linkedinProfile || '',
      isProfileComplete: Boolean(dbUser.name?.trim() && dbUser.country?.trim()),
      isAdmin: Boolean(dbUser.isAdmin || dbUser.role === 'admin' || session.user.isAdmin)
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, country, linkedinProfile } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Full Name is required' }, { status: 400 });
    }

    if (!country || !isValidCountry(country)) {
      return NextResponse.json({ error: 'Please select a valid country' }, { status: 400 });
    }

    if (linkedinProfile && !isValidLinkedInUrl(linkedinProfile)) {
      return NextResponse.json({ error: 'Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/your-profile)' }, { status: 400 });
    }

    const usersCollection = await getCollection('users');
    const email = session.user.email.toLowerCase();
    const now = new Date();

    const normalizedLinkedIn = linkedinProfile ? normalizeLinkedInUrl(linkedinProfile) : undefined;

    const updateFields = {
      name: name.trim(),
      country: country.trim(),
      updatedAt: now
    };

    if (normalizedLinkedIn !== undefined) {
      updateFields.linkedinProfile = normalizedLinkedIn;
    }

    const result = await usersCollection.updateOne(
      { email },
      {
        $set: updateFields,
        $setOnInsert: {
          email,
          userId: session.user.id || email,
          role: session.user.isAdmin ? 'admin' : 'user',
          isAdmin: Boolean(session.user.isAdmin),
          createdAt: now
        }
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        name: name.trim(),
        email,
        country: country.trim(),
        linkedinProfile: normalizedLinkedIn || '',
        isProfileComplete: true
      }
    });
  } catch (error) {
    console.error('Error saving user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  return POST(request);
}
