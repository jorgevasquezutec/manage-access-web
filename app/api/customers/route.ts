
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import fs from "fs"
import formidable from "formidable"



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

export async function POST(req: Request){
    try{
        const form = new formidable.IncomingForm()
        console.log(form)
        form.parse(req, async (err, fields, files) => {
            await saveFile(files.file)
            return new Response(JSON.stringify({ message: "File uploaded" }), { status: 200 })
        })

    }catch(error){
        console.log(error)
        return new Response(null, { status: 500 })
    }
}

const saveFile = async (file: formidable.File) => {
    const data = fs.readFileSync(file.path)
    fs.writeFileSync(`./public/images/${file.name}`, data)
    await fs.unlinkSync(file.path)
    return;
}