import { authOptions } from "@/lib/authOpthions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    const session = await getServerSession(authOptions)
    if(session){
        const email = session?.user?.email
        const productCollection = dbConnect(collectionNameObj.productCollection)
        const result = await productCollection.find({seller_email: email}).toArray()

        return NextResponse.json(result)
    }
    return NextResponse.json({})
}

export const POST = async (req) =>{
    const body = await req.json()
    const productCollection = dbConnect(collectionNameObj.productCollection)

    const result = await productCollection.insertOne(body)
    return NextResponse.json(result)
}