
import Sidebar from "@/components/Sidebar"


export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
    return <>
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-60 p-10">
                {children}
            </main>
        </div>
    </>
}