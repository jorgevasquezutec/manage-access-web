import { db } from "@/lib/db"
import bcrypt from 'bcrypt'
import { exclude } from "@/lib/utils"
import { User } from "@prisma/client"


export async function POST(req: Request) {

    const { email, password } = await req.json()

    let userRes = await db.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        }
    })
    if (!userRes) {
        return new Response(
            JSON.stringify({ error: "Invalid email" }),
            {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )
    }


    const passwordValid = await bcrypt.compare(password, userRes.password)


    if (!passwordValid) {
        return new Response(
            JSON.stringify({ error: "Invalid password" }),
            {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )
    }

    const user = exclude(userRes, ["password"]) as User

    return new Response(
        JSON.stringify({ user }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    )

}