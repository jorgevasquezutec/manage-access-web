'use client'

import { DataTable } from "@/components/ui/data-table"
import { Customer, columns } from './columns'
import ButtonLink from "@/components/ButtonLink"
import * as React from "react"


async function getData(): Promise<Customer[]> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/customers`, {
        next: { revalidate: 10 },
    })

    if (!res.ok) throw new Error('Something went wrong')

    return res.json()
}



export default async function Users() {
    const data = await getData();
   
    return (
        <div>
            <h1>Usuarios</h1>
            <ButtonLink href="/dashboard/users/add" text="Crear" />
            <div className="flex w-full">
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}