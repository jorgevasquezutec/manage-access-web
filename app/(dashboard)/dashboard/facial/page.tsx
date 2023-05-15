'use client'
import FaceCam from "@/components/FaceCam"
import LayoutWithSpinner from "@/components/LayoutWithSpinner"
import { useState } from "react"
import { toast } from "react-toastify";
import * as z from "zod"


const facilResSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    name: z.string(),
    email: z.string(),
    photo_url: z.string(),
})


export default function Facial() {

    const [loading, setLoading] = useState(false)

    const submitPhoto = async (photo: string) => {

        const img = await fetch(photo).then(res => res.blob())
        const file = new File([img], `validate.jpg`, { type: 'image/jpeg' })
        const formData = new FormData()
        formData.append('file', file)
        setLoading(true)
        const res = await fetch('/api/facial', {
            method: 'POST',
            body: formData
        })
        setLoading(false)
        const json = await res.json()
        if (res.ok) {
            // console.log(json)
            const data = facilResSchema.parse(json)
            toast.success(`Bienvenido ${data.name}`)
            return;
        }
        toast.error(json.message)
    }


    return (
        <LayoutWithSpinner loading={loading}>
            <h1>Facial</h1>
            <div className="flex w-full justify-center align-center">
                <div className="flex flex-wrap -mx-3 mb-6 ">
                    <FaceCam submit={submitPhoto} />
                </div>
            </div>

        </LayoutWithSpinner>
    )
}