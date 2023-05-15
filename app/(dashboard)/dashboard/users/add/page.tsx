'use client'

import LayoutWithSpinner from "@/components/LayoutWithSpinner"
import { object, string, TypeOf } from 'zod';
import { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import FaceCam from "@/components/FaceCam";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const CustomerSachema = object({
    email: string()
        .min(1, "Correo es requerido")
        .email("El correo es invalido"),
    name: string().min(1, "Nombre es requerido"),
    photo_url: string().min(1, "Foto es requerida"),
    uuid: string().min(1, "UUID es requerido"),
})

export type CustomerInput = TypeOf<typeof CustomerSachema>

export default function AddUser() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const methods = useForm<CustomerInput>({
        resolver: zodResolver(CustomerSachema)
    })

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<CustomerInput> = async (values) => {
        console.log(values)
        setLoading(true)
        const res = await fetch('/api/customers', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setLoading(false);
        if (res.ok) {
            toast.success('Cliente creado correctamente')
            router.push('/dashboard/users')
            return;
        }
        const json = await res.json()
        toast.error(json.message)

    }

    const submitPhoto = async (photo: string) => {

        setLoading(true)
        if(!photo) return;
        const uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);
        const img = await fetch(photo).then(res => res.blob())
        const file = new File([img], `${uuid}.jpg`, { type: 'image/jpeg' })
        console.log(file)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('user_id', uuid)
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        setLoading(false)
        const json = await res.json()
        if (res.ok) {
            console.log(json)
            methods.setValue('photo_url', json.fileUrl)
            methods.setValue('uuid', uuid)
            toast.success('Imagen subida correctamente')
            return;
        }
        toast.error(json.message || 'Error al subir la imagen')

    }

    return (
        <LayoutWithSpinner loading={loading}>
            <FormProvider {...methods}>
                <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmitHandler)}>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nombre">
                            Nombre
                        </label>

                        <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" +
                            (methods.formState.errors.name ? " border-red-500" : "")
                        }
                            id="grid-nombre" type="text"  {...methods.register("name")} placeholder="Ingrese nombre"></input>
                        <p className="text-red-500 text-xs italic">  {methods.formState.errors.name && <span>{methods.formState.errors.name.message}</span>}</p>

                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                            Correo
                        </label>

                        <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" +
                            (methods.formState.errors.email ? " border-red-500" : "")
                        }
                            id="grid-nombre" type="email"  {...methods.register("email")} placeholder="Ingrese Correo"></input>
                        <p className="text-red-500 text-xs italic">  {methods.formState.errors.email && <span>{methods.formState.errors.email.message}</span>}</p>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <FaceCam submit={submitPhoto} />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="flex flex-col justify-center align-center w-[480px]">
                            <button type="submit" disabled={loading && methods.formState.isValid}
                                className="bg-[#334155] flex justify-center text-white border-none rounded-[25px] mt-[10px] px-[40px] py-[10px] cursor-pointer"
                            >
                                {methods.formState.isValid}
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </LayoutWithSpinner>
    )

}