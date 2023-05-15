import { DataTable } from "@/components/ui/data-table"
import { Access, columns } from './columns'

async function getData(): Promise<Access[]> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/access`, {
        cache: 'no-store',
    })

    if (!res.ok) throw new Error('Something went wrong')

    return res.json()
}



export default async function DashBoard() {

    const data = await getData()
    return (
        <div>
            <h1>Dashboard</h1>
            <div className="flex w-full ">
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}