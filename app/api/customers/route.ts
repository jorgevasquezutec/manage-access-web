
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod"


const postCustomerSchema = z.object({
    uuid: z.string().min(1,'uuid is required'),
    name: z.string().min(1,'Nombre es requerido'),
    email: z.string().email('Correo invalido').min(1,'Correo es requerido'),
    photo_url : z.string().min(1,'Foto es requerida'),
  })


export async function GET(req: Request) {
    try{

        // const session = await getServerSession(authOptions)
        // if(!session) return new Response("Unauthorized", { status: 403 })

        // const { user } = session
        const customers = await db.customer.findMany();
        return new Response(JSON.stringify(customers), { status: 200 })

    }catch(error){
        console.log(error)
        return new Response(null, { status: 500 })
    }
}


export async function POST(req: NextRequest){
    try{

        const json = await req.json()
        const body = postCustomerSchema.parse(json)

        const customer = await db.customer.create({
            data: {
                uuid: body.uuid,
                name: body.name,
                email: body.email,
                photo_url: body.photo_url
            }
        })
    
        return new Response(JSON.stringify(customer), { status: 200 })

    }catch(error){
        console.log(error)
        return new Response(null, { status: 500 })
    }
}
