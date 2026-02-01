import { useState, useEffect, useRef } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { ChevronDown, ChevronRight, ChevronLeft, LogOut, UserIcon, Settings, Bell, Search, Sun, Moon, FileText, Globe, Camera, BarChart3 } from "lucide-react"
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
    // Theme state
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const [userAvatar, setUserAvatar] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const location = useLocation()

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setUserAvatar(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
        if (storedTheme) {
            setTheme(storedTheme)
            document.documentElement.classList.toggle("dark", storedTheme === "dark")
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
            document.documentElement.classList.add("dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.classList.toggle("dark", newTheme === "dark")
        localStorage.setItem("theme", newTheme)
    }

    const toggleExpand = (key: string) => {
        setExpanded(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        )
    }

    // Helper to determine styling for sidebar links
    const getLinkClasses = (isActive: boolean) => {
        return cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
            isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm" // Active: Soft Blue BG, Navy Text
                : "text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-primary/10" // Inactive: Muted White, Hover Blue
        )
    }

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
            {/* Sidebar - Uses Deep Navy (#0A1931) */}
            <aside className="w-60 border-r border-sidebar-border bg-sidebar hidden md:block flex-shrink-0">
                <div className="flex h-14 items-center justify-center border-sidebar-border/50 lg:h-[60px]">
                    <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-tight">
                        <img src="/logo.png" alt="AATS Logo" className="h-8 w-8 object-contain" />
                        <span className="text-sidebar-primary text-2xl">AATS</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {/* Main Function: Accounts & Audit */}
                        <div>
                            <button
                                onClick={() => toggleExpand("accounts-audit")}
                                className="flex items-center justify-between w-full px-3 py-2 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors hover:bg-sidebar-primary/10 rounded-md"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4" />
                                    <span>Accounts & Audit</span>
                                </div>
                                {expanded.includes("accounts-audit") ? (
                                    <ChevronDown className="h-4 w-4 opacity-70" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 opacity-70" />
                                )}
                            </button>
                            {expanded.includes("accounts-audit") && (
                                <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border/50 pl-2">
                                    <Link
                                        to="/audit-assurance"
                                        className={getLinkClasses(location.pathname.startsWith("/audit-assurance") || location.pathname === "/")}
                                    >
                                        Audit & Assurance
                                    </Link>
                                    <Link
                                        to="/internal-audit"
                                        className={getLinkClasses(location.pathname.startsWith("/internal-audit"))}
                                    >
                                        Internal Audit
                                    </Link>
                                    <Link
                                        to="/forensic-audit"
                                        className={getLinkClasses(location.pathname.startsWith("/forensic-audit"))}
                                    >
                                        Forensic Audit
                                    </Link>
                                    <Link
                                        to="/management-account"
                                        className={getLinkClasses(location.pathname.startsWith("/management-account"))}
                                    >
                                        Management Account
                                    </Link>
                                    <Link
                                        to="/tax-account"
                                        className={getLinkClasses(location.pathname.startsWith("/tax-account"))}
                                    >
                                        Tax Account
                                    </Link>
                                    <Link
                                        to="/internal-control-outsourcing"
                                        className={getLinkClasses(location.pathname.startsWith("/internal-control-outsourcing"))}
                                    >
                                        Internal Control Systems & Outsourcing
                                    </Link>
                                </div>
                            )}
                        </div>


                        {/* Main Function: Team & Employee Management */}
                        <div className="mt-2 space-y-1">
                            <Link
                                to="/team"
                                className={getLinkClasses(location.pathname === "/team")}
                            >
                                <div className="flex items-center gap-3">
                                    <UserIcon className="h-4 w-4" />
                                    <span>Team Management</span>
                                </div>
                            </Link>
                            <Link
                                to="/employee-management"
                                className={getLinkClasses(location.pathname === "/employee-management")}
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4" />
                                    <span>Employee Management</span>
                                </div>
                            </Link>
                        </div>

                        {/* Main Function: Client Portal */}
                        <div className="mt-2">
                            <button
                                onClick={() => toggleExpand("client-portal")}
                                className="flex items-center justify-between w-full px-3 py-2 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors hover:bg-sidebar-primary/10 rounded-md"
                            >
                                <div className="flex items-center gap-3">
                                    <Globe className="h-4 w-4" />
                                    <span>Client Portal</span>
                                </div>
                                {expanded.includes("client-portal") ? (
                                    <ChevronDown className="h-4 w-4 opacity-70" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 opacity-70" />
                                )}
                            </button>
                            {expanded.includes("client-portal") && (
                                <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border/50 pl-2">
                                    <Link
                                        to="/client-portal"
                                        className={getLinkClasses(location.pathname.startsWith("/client-portal"))}
                                    >
                                        Access Portal
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Additional Pages */}
                        <div className="mt-2 space-y-1">
                            <Link
                                to="/analytics"
                                className={getLinkClasses(location.pathname === "/analytics")}
                            >
                                <div className="flex items-center gap-3">
                                    <BarChart3 className="h-4 w-4" />
                                    <span>Analytics</span>
                                </div>
                            </Link>
                            <Link
                                to="/reports"
                                className={getLinkClasses(location.pathname === "/reports")}
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4" />
                                    <span>Reports</span>
                                </div>
                            </Link>
                            <Link
                                to="/settings"
                                className={getLinkClasses(location.pathname === "/settings")}
                            >
                                <div className="flex items-center gap-3">
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header - Also Deep Navy to match "Premium/Secure" requirement */}
                <header className="flex h-14 items-center gap-4 bg-sidebar px-6 border-b border-sidebar-border z-10 text-sidebar-foreground shadow-lg">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.history.back()}
                            className="bg-white/5 hover:bg-white/10 hover:text-sidebar-primary rounded-full p-2 transition-colors disabled:opacity-50 border border-transparent hover:border-sidebar-primary/20"
                            title="Go Back"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => window.history.forward()}
                            className="bg-white/5 hover:bg-white/10 hover:text-sidebar-primary rounded-full p-2 transition-colors disabled:opacity-50 border border-transparent hover:border-sidebar-primary/20"
                            title="Go Forward"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Breadcrumb - Adjusted for Dark Background */}
                    <ol className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
                        <li className="inline-flex items-center">
                            <Link
                                to="/"
                                className="flex items-center text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                            >
                                Home
                            </Link>
                            {location.pathname !== "/" && (
                                <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                            )}
                        </li>

                        {/* Dynamic Breadcrumbs based on path */}
                        {location.pathname.startsWith("/audit-assurance") && (
                            <>
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/audit-assurance"
                                        className={cn(
                                            "flex items-center text-sm transition-colors",
                                            location.pathname === "/audit-assurance" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                        )}
                                    >
                                        Audit & Assurance
                                    </Link>
                                    {location.pathname !== "/audit-assurance" && (
                                        <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                    )}
                                </li>
                                {location.pathname === "/audit-assurance/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/audit-assurance\/[^\/]+$/) && location.pathname !== "/audit-assurance/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
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
                                        className={cn(
                                            "flex items-center text-sm transition-colors",
                                            location.pathname === "/internal-audit" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                        )}
                                    >
                                        Internal Audit
                                    </Link>
                                    {location.pathname !== "/internal-audit" && (
                                        <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                    )}
                                </li>
                                {location.pathname === "/internal-audit/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/internal-audit\/[^\/]+$/) && location.pathname !== "/internal-audit/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
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
                                        className={cn(
                                            "flex items-center text-sm transition-colors",
                                            location.pathname === "/forensic-audit" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                        )}
                                    >
                                        Forensic Audit
                                    </Link>
                                    {location.pathname !== "/forensic-audit" && (
                                        <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                    )}
                                </li>
                                {location.pathname === "/forensic-audit/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/forensic-audit\/[^\/]+$/) && location.pathname !== "/forensic-audit/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
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
                                        className={cn(
                                            "flex items-center text-sm transition-colors",
                                            location.pathname === "/management-account" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                        )}
                                    >
                                        Management Account
                                    </Link>
                                    {location.pathname !== "/management-account" && (
                                        <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                    )}
                                </li>
                                {location.pathname === "/management-account/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/management-account\/[^\/]+$/) && location.pathname !== "/management-account/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
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
                                        className={cn(
                                            "flex items-center text-sm transition-colors",
                                            location.pathname === "/tax-account" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                        )}
                                    >
                                        Tax Account
                                    </Link>
                                    {location.pathname !== "/tax-account" && (
                                        <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                    )}
                                </li>
                                {location.pathname === "/tax-account/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/tax-account\/[^\/]+$/) && location.pathname !== "/tax-account/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
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
                                        className={cn(
                                            "flex items-center text-sm transition-colors",
                                            location.pathname === "/internal-control-outsourcing" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                        )}
                                    >
                                        Internal Control Systems & Outsourcing
                                    </Link>
                                    {location.pathname !== "/internal-control-outsourcing" && (
                                        <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                    )}
                                </li>
                                {location.pathname === "/internal-control-outsourcing/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                        Add Record
                                    </li>
                                )}
                                {location.pathname.match(/^\/internal-control-outsourcing\/[^\/]+$/) && location.pathname !== "/internal-control-outsourcing/new" && (
                                    <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                        Client Details
                                    </li>
                                )}
                            </>
                        )}
                        {/* Simplified fallback for unknown routes */}
                        {!location.pathname.startsWith("/audit-assurance") &&
                            !location.pathname.startsWith("/internal-audit") &&
                            !location.pathname.startsWith("/forensic-audit") &&
                            !location.pathname.startsWith("/management-account") &&
                            !location.pathname.startsWith("/tax-account") &&
                            !location.pathname.startsWith("/internal-control-outsourcing") &&
                            location.pathname !== "/" && (
                                <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate capitalize" aria-current="page">
                                    {location.pathname.split('/')[1]?.replace('-', ' ')}
                                </li>
                            )}
                    </ol>

                    <div className="ml-auto flex items-center gap-2">
                        {/* Search - Translucent on Dark BG */}
                        <div className="relative hidden lg:block w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-sidebar-foreground/50" />
                            <Input
                                type="search"
                                placeholder="Search here..."
                                className="pl-9 bg-white/10 border-transparent text-sidebar-foreground placeholder:text-sidebar-foreground/40 h-9 focus-visible:ring-1 focus-visible:ring-sidebar-primary focus-visible:bg-white/20 transition-all"
                            />
                        </div>

                        {/* Theme Toggle Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="rounded-full text-sidebar-foreground/70 hover:text-yellow-300 hover:bg-white/10 transition-all"
                            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                        >
                            {theme === "light" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* Bell Icon */}
                        <Button variant="ghost" size="icon" className="rounded-full relative text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-white/10">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                            </span>
                            <span className="sr-only">Notifications</span>
                        </Button>

                        {/* User Menu */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden p-0 border border-sidebar-foreground/20 hover:border-sidebar-primary/50 transition-colors">
                                    {userAvatar ? (
                                        <img
                                            className="h-full w-full object-cover"
                                            src={userAvatar}
                                            alt="User Avatar"
                                        />
                                    ) : (
                                        <img
                                            className="h-full w-full object-cover"
                                            src="./1.png"
                                            alt="Avatar"
                                        />
                                    )}
                                    <span className="sr-only">User menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 text-white bg-slate-900 border-slate-800">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-slate-800" />
                                <DropdownMenuItem className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                    <Camera className="mr-2 h-4 w-4" />
                                    <span>Upload Photo</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    <span>Edit Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-rose-500 focus:text-rose-400 focus:bg-rose-950/30 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Content Area - Ice Blue Background (#F6FAFD) */}
                <main className="flex-1 overflow-y-auto bg-background">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}