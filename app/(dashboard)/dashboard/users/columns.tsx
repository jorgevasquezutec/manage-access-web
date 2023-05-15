import { ColumnDef } from "@tanstack/react-table"

export type Customer = {
    id: number
    name: string
    email: string
    photo_url: string
}

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "photo_url",
        header: "Foto",
    }
]
