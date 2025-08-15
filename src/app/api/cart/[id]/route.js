import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/authOpthions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export const DELETE = async (req, { params }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params || {};

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Cart item ID is required" },
      { status: 400 }
    );
  }

  const cartCollection = dbConnect(collectionNameObj.cartCollection);

  //  Find the cart item first
  const cartItem = await cartCollection.findOne({ _id: new ObjectId(id) });

  if (!cartItem) {
    return NextResponse.json(
      { success: false, message: "Item not found" },
      { status: 404 }
    );
  }

  // Check ownership
  const isOkOwner = session.user.email === cartItem.buyer_email;

  if (!isOkOwner) {
    return NextResponse.json(
      { success: false, message: "Forbidden action" },
      { status: 403 }
    );
  }

  // Delete the item
  const deleteRes = await cartCollection.deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json(deleteRes);
};
