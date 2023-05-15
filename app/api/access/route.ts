import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"


export async function GET() {

    try {
        // const session = await getServerSession(authOptions)
        // if(!session) return new Response("Unauthorized", { status: 403 })

        // const { user } = session
        const access = await db.access.findMany({
            include: {
                customer: true
            }
        })
        return new Response(JSON.stringify(access), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(null, { status: 500 })
    }

}