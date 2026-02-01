import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"

export default function MainLayout() {
    return (
        <div className="fixed inset-0 flex h-screen w-full bg-background overflow-hidden text-foreground">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto bg-background">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
