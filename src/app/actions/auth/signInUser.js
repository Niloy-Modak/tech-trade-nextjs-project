"use server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from 'bcrypt';

export const signInUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = dbConnect(collectionNameObj.userCollection);
  const user = await userCollection.findOne({ email }); 

  if (!user) return null;

  const correctPass = await bcrypt.compare(password, user.password);

  if (!correctPass) return null;

  return user;
};
