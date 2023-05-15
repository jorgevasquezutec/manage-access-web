
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";


export async function POST(req: NextRequest) {
    // console.log("entro")
    try {

        const formData = await req.formData();
        const file = formData.get("file") as Blob | null
        const user_id = formData.get('user_id');

        if (!file) {
            return NextResponse.json(
                { error: "File blob is required." },
                { status: 400 }
            );
        }

        const res = await fetch(`${process.env.FACE_API}/facial/upload`, {
            method: "POST",
            body: formData,
        });

        let data = await res.json();

        if (res.status !== 200) return new Response(JSON.stringify(data) || 'Ocurrio un Error', { status: 500 })

        //   return new Response(null, { status: 200 })

        //guardar el achivo
        const buffer = Buffer.from(await file.arrayBuffer());
        const relativeUploadDir = `/uploads`;
        const uploadDir = join(process.cwd(), "public", relativeUploadDir);

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(
                    "Error while trying to create directory when uploading a file\n",
                    e
                );
                return NextResponse.json(
                    { error: "Something went wrong." },
                    { status: 500 }
                );
            }
        }

        try {
            const filename = `${file.name.replace(
                /\.[^/.]+$/,
                ""
            )}.${mime.getExtension(file.type)}`;
            await writeFile(`${uploadDir}/${filename}`, buffer);
            return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` });
        } catch (e) {
            console.error("Error while trying to upload a file\n", e);
            return NextResponse.json(
                { error: "Something went wrong." },
                { status: 500 }
            );
        }

    } catch (error) {
        console.log(error)
        return new Response(null, { status: 500 })
    }
}
