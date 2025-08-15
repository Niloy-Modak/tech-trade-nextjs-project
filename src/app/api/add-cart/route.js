import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { NextResponse } from "next/server"


export const POST = async (req) =>{
    const body = await req.json()
    const cartCollection = dbConnect(collectionNameObj.cartCollection)

    const result = await cartCollection.insertOne(body)
    return NextResponse.json(result)
}