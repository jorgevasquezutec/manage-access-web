'use client'

import LayoutWithSpinner from "@/components/LayoutWithSpinner"
import { object, string, TypeOf } from 'zod';
import { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import FaceCam from "@/components/FaceCam";


const CustomerSachema = object({
    email: string()
        .min(1, "Correo es requerido")
        .email("El correo es invalido"),
    name: string().min(1, "Nombre es requerido"),
    photo_url: string().min(1, "Foto es requerida"),
})

export type CustomerInput = TypeOf<typeof CustomerSachema>

export default function AddUser() {
    const [loading, setLoading] = useState(false)

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

    }

    const submitPhoto = async (photo: string) => {

        //generar un rando uuid
        const uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);
        
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


                    <Button variant="outline" type="submit">
                        Guardar
                    </Button>
                </form>
            </FormProvider>
        </LayoutWithSpinner>
    )

}