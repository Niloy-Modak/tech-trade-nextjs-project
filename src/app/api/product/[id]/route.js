import { authOptions } from "@/lib/authOpthions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const DELETE = async (req, context) => {
  const { id } = await context.params; // Await the object before using .id

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const productCollection = dbConnect(collectionNameObj.productCollection);

  // Fetch the product document
  const product = await productCollection.findOne({ _id: new ObjectId(id) });

  if (!product) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 }
    );
  }

  // Check ownership
  if (product.seller_email !== session.user.email) {
    return NextResponse.json(
      { success: false, message: "Forbidden action" },
      { status: 403 }
    );
  }

  // Delete product
  const deleteResponse = await productCollection.deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json({
    success: true,
    deletedCount: deleteResponse.deletedCount,
  });
};

export const GET = async (req, { params }) => {
  const p = await params;
  const productCollection = dbConnect(collectionNameObj.productCollection);
  const query = { _id: new ObjectId(p.id) };
  const data = await productCollection.findOne(query);

  return NextResponse.json(data);
};
