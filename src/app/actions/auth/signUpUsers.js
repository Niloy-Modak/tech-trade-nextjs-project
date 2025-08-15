"use server";
import bcrypt from 'bcrypt'
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export const signUpUsers = async (payload) => {
  console.log(payload);
  const userCollection = dbConnect(collectionNameObj.userCollection);
  const { password } = payload;

  //validation
  const user = await userCollection.findOne({ email: payload.email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;

    const result = await userCollection.insertOne(payload);
    result.insertedId = result.insertedId.toString();
    return result;
  }

  return null;
};
