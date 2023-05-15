
'use client'

import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react'
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import FormInput from '@/components/FormInput';
import { ThreeDots } from 'react-loader-spinner'
import { object, string, TypeOf } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"


const loginSachema = object({
    email: string()
        .min(1, "Email address is required")
        .email("Email Address is invalid"),
    password: string()
})
export type LoginInput = TypeOf<typeof loginSachema>


export default function Login() {
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams();
    const router = useRouter()


    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSachema)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);


    const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
        // 👇 Execute the Mutation
        setLoading(true)
        const signInResult = await signIn("credentials", {
            email: values.email.toLowerCase(),
            password: values.password,
            redirect: false,
            callbackUrl: searchParams?.get("from") || "/dashboard",
        })
        setLoading(false)

        if (!signInResult?.ok) {
            toast.error(signInResult?.error || "Credenciales incorrectas")
            return
        }
        toast.success("Bienvenido")
        router.push(searchParams?.get("from") || "/dashboard")

    };

    return (
        <>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="rgb(79 70 229)"
                ariaLabel="three-dots-loading"
                wrapperStyle={
                    { position: "absolute", top: "50%", left: "50%", zIndex: "100" }
                }
                visible={loading}
            />
            <main className="flex bg-gray-50 h-screen  dark:bg-gray-900">
                <div className="flex w-full flex-col items-center justify-center px-6 py-8 mx-auto ">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Inicio de sesión
                            </h1>
                            <FormProvider {...methods}>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
                                    <FormInput label="Email" name="email" type="email" placeholder='nombre@empresa.com' />
                                    <FormInput label="Password" name="password" type="password" placeholder='******' />
                                    <button
                                        type="submit"
                                        className="group relative mb-3 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                        </span>
                                        Sign in
                                    </button>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}