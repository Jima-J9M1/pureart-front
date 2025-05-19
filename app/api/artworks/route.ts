import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/artworks?populate=*`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch artworks');
    }

    const data = await response.json();
    
    // Transform the data to match our frontend needs
    const artworks = data.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      price: item.attributes.price,
      imageUrl: item.attributes.image?.data?.attributes?.url 
        ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.attributes.image.data.attributes.url}`
        : '/placeholder-image.jpg',
      artist: {
        name: item.attributes.artist?.data?.attributes?.name || 'Unknown Artist',
      },
      category: item.attributes.category,
      style: item.attributes.style,
      dimensions: item.attributes.dimensions,
      year: item.attributes.year,
    }));

    return NextResponse.json(artworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
} 