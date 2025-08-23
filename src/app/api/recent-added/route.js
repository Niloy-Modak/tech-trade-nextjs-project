// app/api/recent-added/route.js
import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

const allProductsCollection = dbConnect(collectionNameObj.productCollection);

export async function GET() {
  try {
    // Fetch the 4 most recently added products, assuming '_id' indicates insertion order
    const products = await allProductsCollection
      .find({})
      .sort({ _id: -1 }) // sort by newest first
      .limit(4)
      .toArray();

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Failed to fetch recent products:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch products' }, { status: 500 });
  }
}
