import { authOptions } from "@/lib/authOpthions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const p = await params;
  const productCollection = dbConnect(collectionNameObj.productCollection);
  const query = { _id: new ObjectId(p.id) };
  const singleProduct = await productCollection.findOne(query);

  const isOwnerOk = email === singleProduct?.seller_email;

  if (isOwnerOk) {
    return NextResponse.json(singleProduct);
  } else {
    return NextResponse.json({ massage: "forbidden action" }, { status: 403 });
  }
};

export const PATCH = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const p = await params;
  const productCollection = dbConnect(collectionNameObj.productCollection);
  const query = { _id: new ObjectId(p.id) };

  const currentProductData = await productCollection.findOne(query);

  const isOwnerOk = email === currentProductData?.seller_email;

  if (isOwnerOk) {
    const body = await req.json();

    const filter = { $set: { ...body } };
    const option = { upsert: true };

    const updateResponse = await productCollection.updateOne(
      query,
      filter,
      option
    );
    revalidatePath("/my-products");
    return NextResponse.json(updateResponse);
  } else {
    return NextResponse.json({ massage: "forbidden action" }, { status: 403 });
  }
};
