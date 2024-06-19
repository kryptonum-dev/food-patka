import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
  dataset: 'production',
  apiVersion: '2024-04-22',
  useCdn: false,
});

export async function POST(request: Request) {
  const { productId, rating, name, review } = await request.json();

  if (!productId || (typeof rating !== 'number' || (rating < 1 || rating > 5)) || !name || !review) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong'
    }, { status: 422 });
  }

  const data = {
    _type: 'Review_Collection',
    visible: false,
    name: name,
    rating: rating,
    product: {
      _type: 'reference',
      _ref: productId,
    },
    content: review,
  };

  try {
    await client.create(data);
    return NextResponse.json({
      success: true,
      message: 'Review successfully created'
    }, { status: 200 });
  } catch {
    return NextResponse.json({
      success: false,
      message: 'There was an error creating the review. Try again later.'
    }, { status: 500 });
  }
}
