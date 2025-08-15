import { authOptions } from "@/lib/authOpthions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    const session = await getServerSession(authOptions)
    if(session){
        const email = session?.user?.email
        const cartCollection = dbConnect(collectionNameObj.cartCollection)
        const result = await cartCollection.find({buyer_email:email}).toArray()

        return NextResponse.json(result)
    }

    return NextResponse.json({})
}

