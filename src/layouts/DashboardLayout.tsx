import { useState } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { ChevronDown, ChevronRight, LayoutDashboard, ChevronLeft, LogOut, UserIcon, Settings, Bell, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardLayout() {
    const [expanded, setExpanded] = useState<string[]>(["accounts-audit"])
    const location = useLocation()

    const toggleExpand = (key: string) => {
        setExpanded(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        )
    }

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
            {/* Sidebar */}
            <aside className="w-60 border-r bg-muted/20 hidden md:block">
                <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <span>AATS</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {/* Main Function: Accounts & Audit */}
                        <div>
                            <button
                                onClick={() => toggleExpand("accounts-audit")}
                                className="flex items-center justify-between w-full px-3 py-2 text-muted-foreground hover:text-primary transition-colors hover:bg-muted/50 rounded-md"
                            >
                                <div className="flex items-center gap-3">
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span>Accounts & Audit</span>
                                </div>
                                {expanded.includes("accounts-audit") ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </button>
                            {expanded.includes("accounts-audit") && (
                                <div className="ml-4 mt-1 space-y-1 border-l pl-2">
                                    <Link
                                        to="/audit-assurance"
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted/50",
                                            location.pathname.startsWith("/audit-assurance") || location.pathname === "/"
                                                ? "bg-muted text-primary font-semibold"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        Audit & Assurance
                                    </Link>
                                    <Link
                                        to="/internal-audit"
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted/50",
                                            location.pathname.startsWith("/internal-audit")
                                                ? "bg-muted text-primary font-semibold"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        Internal Audit
                                    </Link>
                                    <Link
                                        to="/forensic-audit"
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted/50",
                                            location.pathname.startsWith("/forensic-audit")
                                                ? "bg-muted text-primary font-semibold"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        Forensic Audit
                                    </Link>
                                    <Link
                                        to="/management-account"
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted/50",
                                            location.pathname.startsWith("/management-account")
                                                ? "bg-muted text-primary font-semibold"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        Management Account
                                    </Link>
                                    <Link
                                        to="/tax-account"
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted/50",
                                            location.pathname.startsWith("/tax-account")
                                                ? "bg-muted text-primary font-semibold"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        Tax Account
                                    </Link>
                                    <Link
                                        to="/internal-control-outsourcing"
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted/50",
                                            location.pathname.startsWith("/internal-control-outsourcing")
                                                ? "bg-muted text-primary font-semibold"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        Internal Control Systems & Outsourcing
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header is minimal as per requirement "Top left - Header Label – Audit & Assurance". This is handled in the page content usually, or here. 
             But dashboard layout usually has a top bar. I will keep a simple one or remove if requirement implies page-content only.
             Req says: "Main Layout • Top left - Header Label – Audit & Assurance". This implies inside the main content area, or a global header.
             I'll put a global header, but maybe it's just the page title. 
             Actually, "Top left - Header Label – Audit & Assurance" is listed under "Audit & Assurance Main Layout". 
             So I will let the page handle the title. 
             I will keep the layout shell simple.
         */}
                {/* Navbar with Navigation Controls */}
                <header className="flex h-14 items-center gap-8 bg-background px-6 border-b z-10">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.history.back()}
                            className="bg-accent/50 hover:bg-accent hover:text-primary rounded-full p-2 transition-colors disabled:opacity-50"
                            title="Go Back"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => window.history.forward()}
                            className="bg-accent/50 hover:bg-accent hover:text-primary rounded-full p-2 transition-colors disabled:opacity-50"
                            title="Go Forward"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Breadcrumb */}
                    <ol className="flex items-center whitespace-nowrap">
                        <li className="inline-flex items-center">
                            <Link
                                to="/"
                                className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                            >
                                Home
                            </Link>
                            {location.pathname !== "/" && (
                                <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            )}
                        </li>
                        {location.pathname.startsWith("/audit-assurance") && (
                            <>
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/audit-assurance"
                                        className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                                    >
                                        Audit & Assurance
                                    </Link>
                                    {location.pathname !== "/audit-assurance" && (
                                        <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    )}
                                </li>
                                {location.pathname === "/audit-assurance/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/audit-assurance\/[^\/]+$/) && location.pathname !== "/audit-assurance/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Client Details
                                    </li>
                                )}
                            </>
                        )}
                        {location.pathname.startsWith("/internal-audit") && (
                            <>
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/internal-audit"
                                        className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                                    >
                                        Internal Audit
                                    </Link>
                                    {location.pathname !== "/internal-audit" && (
                                        <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    )}
                                </li>
                                {location.pathname === "/internal-audit/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/internal-audit\/[^\/]+$/) && location.pathname !== "/internal-audit/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Client Details
                                    </li>
                                )}
                            </>
                        )}
                        {location.pathname.startsWith("/forensic-audit") && (
                            <>
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/forensic-audit"
                                        className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                                    >
                                        Forensic Audit
                                    </Link>
                                    {location.pathname !== "/forensic-audit" && (
                                        <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    )}
                                </li>
                                {location.pathname === "/forensic-audit/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/forensic-audit\/[^\/]+$/) && location.pathname !== "/forensic-audit/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Client Details
                                    </li>
                                )}
                            </>
                        )}
                        {location.pathname.startsWith("/management-account") && (
                            <>
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/management-account"
                                        className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                                    >
                                        Management Account
                                    </Link>
                                    {location.pathname !== "/management-account" && (
                                        <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    )}
                                </li>
                                {location.pathname === "/management-account/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/management-account\/[^\/]+$/) && location.pathname !== "/management-account/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Client Details
                                    </li>
                                )}
                            </>
                        )}
                        {location.pathname.startsWith("/tax-account") && (
                            <>
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/tax-account"
                                        className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                                    >
                                        Tax Account
                                    </Link>
                                    {location.pathname !== "/tax-account" && (
                                        <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    )}
                                </li>
                                {location.pathname === "/tax-account/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/tax-account\/[^\/]+$/) && location.pathname !== "/tax-account/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Client Details
                                    </li>
                                )}
                            </>
                        )}
                        {location.pathname.startsWith("/internal-control-outsourcing") && (
                            <>
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/internal-control-outsourcing"
                                        className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                                    >
                                        Internal Control
                                    </Link>
                                    {location.pathname !== "/internal-control-outsourcing" && (
                                        <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    )}
                                </li>
                                {location.pathname === "/internal-control-outsourcing/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/internal-control-outsourcing\/[^\/]+$/) && location.pathname !== "/internal-control-outsourcing/new" && (
                                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                                        Client Details
                                    </li>
                                )}
                            </>
                        )}
                    </ol>
                    <div className="ml-auto flex items-center gap-2">
                        <div className="relative hidden lg:block w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search here..."
                                className="pl-9 bg-muted/50 border-none h-9 focus-visible:ring-1 focus-visible:ring-primary/20"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full relative text-muted-foreground hover:text-primary">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden p-0 border border-slate-200 dark:border-slate-800">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="./1.png"
                                        alt="Avatar"
                                    />
                                    <span className="sr-only">User menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    <span>Edit Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-background">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
