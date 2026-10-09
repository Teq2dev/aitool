import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { sanitizeHtml } from '@/lib/sanitize';
import { sendContactNotificationEmail } from '@/lib/email';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request payload. Expected JSON body.' },
        { status: 400 }
      );
    }

    const { name, email, country, description, _hp } = body;

    // Spam honeypot trap: if hidden honeypot field is filled, silently succeed
    if (_hp && String(_hp).trim().length > 0) {
      return NextResponse.json(
        { success: true, message: 'Your message has been received. Thank you for reaching out!' },
        { status: 200 }
      );
    }

    // 1. Validate Name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 2 characters long.' },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: 'Name cannot exceed 100 characters.' },
        { status: 400 }
      );
    }

    // 2. Validate Email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail.length > 150 || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 3. Validate Country
    if (!country || typeof country !== 'string' || country.trim().length === 0) {
      return NextResponse.json(
        { error: 'Country selection is required.' },
        { status: 400 }
      );
    }
    if (country.trim().length > 100) {
      return NextResponse.json(
        { error: 'Invalid country selection.' },
        { status: 400 }
      );
    }

    // 4. Validate Description
    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Description is required and must be at least 10 characters long.' },
        { status: 400 }
      );
    }
    if (description.trim().length > 4000) {
      return NextResponse.json(
        { error: 'Description cannot exceed 4000 characters.' },
        { status: 400 }
      );
    }

    // Sanitize values to prevent XSS
    const sanitizedName = sanitizeHtml(name.trim());
    const sanitizedCountry = sanitizeHtml(country.trim());
    const sanitizedDescription = sanitizeHtml(description.trim());

    // Basic client metadata (truncated to prevent unbounded storage; client IP is intentionally omitted to prevent trusting spoofable headers and to protect user privacy)
    const rawUserAgent = request.headers.get('user-agent') || 'unknown';
    const userAgent = rawUserAgent.slice(0, 255);

    // Store in MongoDB 'contacts' collection (authoritative source of truth)
    let insertedId = null;
    const submissionDate = new Date();
    try {
      const contactsCollection = await getCollection('contacts');
      const insertResult = await contactsCollection.insertOne({
        name: sanitizedName,
        email: cleanEmail,
        country: sanitizedCountry,
        description: sanitizedDescription,
        status: 'unread',
        createdAt: submissionDate,
        userAgent,
        emailNotification: 'pending',
      });
      insertedId = insertResult.insertedId;
    } catch (dbError) {
      console.error('Contact submission database insertion error:', dbError.message);
      // Return server error if database persistence fails
      return NextResponse.json(
        { error: 'Unable to save your message due to a server error. Please try again later.' },
        { status: 500 }
      );
    }

    // Trigger transactional email notification asynchronously/safely
    // The MongoDB contact record remains the source of truth.
    // If email delivery fails, the submission is NOT lost or duplicated.
    try {
      const emailResult = await sendContactNotificationEmail({
        name: sanitizedName,
        email: cleanEmail,
        country: sanitizedCountry,
        description: sanitizedDescription,
        createdAt: submissionDate,
      });

      const notificationStatus = emailResult.success
        ? 'sent'
        : (emailResult.reason === 'unconfigured_api_key' ? 'unconfigured' : 'failed');

      const contactsCollection = await getCollection('contacts');
      await contactsCollection.updateOne(
        { _id: insertedId },
        {
          $set: {
            emailNotification: notificationStatus,
            emailNotificationAt: new Date(),
          },
        }
      ).catch((updateErr) => {
        console.error('Error updating email status on contact record:', updateErr.message);
      });
    } catch (emailErr) {
      console.error('Contact notification email dispatch exception:', emailErr?.message || 'Unknown error');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. Thank you for reaching out!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in /api/contact:', error?.message || 'Internal error');
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
