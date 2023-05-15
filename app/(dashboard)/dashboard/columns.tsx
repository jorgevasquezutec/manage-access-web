"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Customer } from "./users/columns"


export type Access = {
    id: number
    customer: Customer
    customerId: number
    date: string
}


export const columns: ColumnDef<Access>[] = [
    {
        accessorKey: "id",
        header: "ID Acceso",
    }, {
        accessorKey: "customer.name",
        header: "Usuario",
    },
    {
        accessorKey: "date",
        header: "Fecha",
    }
]