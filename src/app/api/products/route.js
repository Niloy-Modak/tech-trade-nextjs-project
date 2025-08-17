import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Connect to the products collection
    const allProductsCollection = dbConnect(collectionNameObj.productCollection);

    // Fetch all products from the database
    const allProducts = await allProductsCollection.find({}).toArray();

    // Return products as JSON
    return NextResponse.json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
