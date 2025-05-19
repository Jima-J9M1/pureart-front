import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Here you would typically:
    // 1. Save the inquiry to your database
    // 2. Send email notifications
    // 3. Update any relevant analytics
    
    // For now, we'll just log it and return success
    console.log('New artwork inquiry:', data);

    // You can implement your database logic here
    // Example with Strapi:
    /*
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          preferredContact: data.preferredContact,
          specialRequirements: data.specialRequirements,
          artwork: data.artworkId,
          status: 'new',
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save inquiry');
    }
    */

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit inquiry' 
      },
      { status: 500 }
    );
  }
} 