


import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"
import * as z from "zod"


const facilSchema = z.object({
    message: z.string(),
    user_id: z.string(),
  })

export async function POST(req: NextRequest) {

    const formData = await req.formData();
    const file = formData.get("file") as Blob | null

    
    if (!file) {
        return NextResponse.json(
            { error: "File blob is required." },
            { status: 400 }
        );
    }

    const res = await fetch(`${process.env.FACE_API}/facial/detect`, {
        method: "POST",
        body: formData,
    });

    let data = await res.json();

    if (res.status !== 200) return new Response(JSON.stringify(data) || 'Ocurrio un Error', { status: 500 })

    const body = facilSchema.parse(data)
    
    if(!body.user_id) return new Response(JSON.stringify(data) || 'Ocurrio un Error', { status: 500 })

    let user = await db.customer.findFirst({
        where: {
            uuid: body.user_id
        }
    });
    
    if(!user)
     return new Response(JSON.stringify({
        message: "Usuario no encontrado"
    }), { status: 500 })

    await db.access.create({
        data: {
            customerId: user.id,
            date: new Date(),
        }
    })

    return new Response(JSON.stringify(user), { status: 200 })

}