import { Link, useLocation, useNavigate } from "react-router-dom"
import { ChevronRight, ChevronLeft, LogOut, UserIcon, Bell, Search, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Briefcase, MapPin, Phone, Mail, Lock, User } from "lucide-react"

// Mock Current User
const currentUser = {
    username: "Kasun Perera",
    email: "kasun@aats.com",
    role: "Admin",
    branch: "Central",
    phone: "+94 77 123 4567"
}

export function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
    const [formData, setFormData] = useState({ ...currentUser, currentPassword: "", password: "", confirmPassword: "" })

    const handleOpenEditProfile = () => {
        setFormData({ ...currentUser, currentPassword: "", password: "", confirmPassword: "" })
        setIsEditProfileOpen(true)
    }

    const handleSaveProfile = () => {
        // Mock save - just close for now
        setIsEditProfileOpen(false)
    }

    return (
        <>
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

                {/* Breadcrumb */}
                <ol className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
                    <li className="inline-flex items-center">
                        <Link
                            to="/dashboard"
                            className="flex items-center text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                        >
                            Home
                        </Link>
                        {location.pathname !== "/dashboard" && (
                            <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                        )}
                    </li>

                    {/* Dynamic Breadcrumbs based on path */}
                    {location.pathname.startsWith("/tax-filing") && (
                        <>
                            <li className="inline-flex items-center">
                                <span className="flex items-center text-sm text-sidebar-foreground/60">
                                    Tax Filing
                                </span>
                                <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                            </li>
                            {location.pathname.includes("/cit") && (
                                <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                    CIT
                                </li>
                            )}
                            {location.pathname.includes("/iit") && (
                                <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                    IIT
                                </li>
                            )}
                            {location.pathname.includes("/vat") && (
                                <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                    VAT
                                </li>
                            )}
                            {location.pathname.includes("/sscl") && (
                                <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                    SSCL
                                </li>
                            )}
                            {location.pathname.includes("/wht") && (
                                <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                    WHT
                                </li>
                            )}
                        </>
                    )}

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
                    {/* ... Add other modules similarly as needed, checking prefixes ... */}
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
                    {location.pathname === "/clients" && (
                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                            Clients
                        </li>
                    )}
                    {location.pathname === "/team" && (
                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                            Team
                        </li>
                    )}
                    {location.pathname === "/activity-log" && (
                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                            Activity Log
                        </li>
                    )}
                    {location.pathname.startsWith("/secretarial-advisory") && (
                        <>
                            <li className="inline-flex items-center">
                                <span className="flex items-center text-sm text-sidebar-foreground/60">
                                    Secretarial & Advisory
                                </span>
                                <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                            </li>
                            {location.pathname.includes("/company-registration") && (
                                <>
                                    <li className="inline-flex items-center">
                                        <Link
                                            to="/secretarial-advisory/company-registration"
                                            className={cn(
                                                "flex items-center text-sm transition-colors",
                                                location.pathname === "/secretarial-advisory/company-registration" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                            )}
                                        >
                                            Company Registration
                                        </Link>
                                        {location.pathname !== "/secretarial-advisory/company-registration" && (
                                            <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                        )}
                                    </li>
                                    {location.pathname === "/secretarial-advisory/company-registration/new" && (
                                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                            Add Record
                                        </li>
                                    )}
                                    {location.pathname.match(/^\/secretarial-advisory\/company-registration\/[^\/]+$/) && location.pathname !== "/secretarial-advisory/company-registration/new" && (
                                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                            Client Details
                                        </li>
                                    )}
                                </>
                            )}
                            {location.pathname.includes("/epf-etf") && (
                                <>
                                    <li className="inline-flex items-center">
                                        <Link
                                            to="/secretarial-advisory/epf-etf"
                                            className={cn(
                                                "flex items-center text-sm transition-colors",
                                                location.pathname === "/secretarial-advisory/epf-etf" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                            )}
                                        >
                                            EPF / ETF
                                        </Link>
                                        {location.pathname !== "/secretarial-advisory/epf-etf" && (
                                            <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                        )}
                                    </li>
                                    {location.pathname === "/secretarial-advisory/epf-etf/new" && (
                                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                            Add Record
                                        </li>
                                    )}
                                    {location.pathname.match(/^\/secretarial-advisory\/epf-etf\/[^\/]+$/) && location.pathname !== "/secretarial-advisory/epf-etf/new" && (
                                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                            Client Details
                                        </li>
                                    )}
                                </>
                            )}
                            {location.pathname.includes("/trade-license") && (
                                <>
                                    <li className="inline-flex items-center">
                                        <Link
                                            to="/secretarial-advisory/trade-license"
                                            className={cn(
                                                "flex items-center text-sm transition-colors",
                                                location.pathname === "/secretarial-advisory/trade-license" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                            )}
                                        >
                                            Trade License
                                        </Link>
                                        {location.pathname !== "/secretarial-advisory/trade-license" && (
                                            <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                        )}
                                    </li>
                                    {location.pathname === "/secretarial-advisory/trade-license/new" && (
                                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                            Add Record
                                        </li>
                                    )}
                                    {location.pathname.match(/^\/secretarial-advisory\/trade-license\/[^\/]+$/) && location.pathname !== "/secretarial-advisory/trade-license/new" && (
                                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                            Client Details
                                        </li>
                                    )}
                                </>
                            )}
                            {location.pathname.includes("/trade-mark") && (
                                <>
                                    <li className="inline-flex items-center">
                                        <Link
                                            to="/secretarial-advisory/trade-mark"
                                            className={cn(
                                                "flex items-center text-sm transition-colors",
                                                location.pathname === "/secretarial-advisory/trade-mark" ? "text-sidebar-primary font-medium" : "text-sidebar-foreground/60 hover:text-sidebar-primary"
                                            )}
                                        >
                                            Trade Mark
                                        </Link>
                                        {location.pathname !== "/secretarial-advisory/trade-mark" && (
                                            <ChevronRight className="shrink-0 mx-2 h-4 w-4 text-sidebar-foreground/30" />
                                        )}
                                    </li>
                                    {location.pathname === "/secretarial-advisory/trade-mark/new" && (
                                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                            Add Record
                                        </li>
                                    )}
                                    {location.pathname.match(/^\/secretarial-advisory\/trade-mark\/[^\/]+$/) && location.pathname !== "/secretarial-advisory/trade-mark/new" && (
                                        <li className="inline-flex items-center text-sm font-medium text-sidebar-primary truncate" aria-current="page">
                                            Client Details
                                        </li>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </ol>

                <div className="ml-auto flex items-center gap-2">
                    <div className="relative hidden lg:block w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-sidebar-foreground/50" />
                        <Input
                            type="search"
                            placeholder="Search here..."
                            className="pl-9 bg-white/10 border-transparent text-sidebar-foreground placeholder:text-sidebar-foreground/40 h-9 focus-visible:ring-1 focus-visible:ring-sidebar-primary focus-visible:bg-white/20 transition-all"
                        />
                    </div>

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

                    <Button variant="ghost" size="icon" className="rounded-full relative text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-white/10">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                        </span>
                        <span className="sr-only">Notifications</span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full overflow-hidden p-0 border border-sidebar-foreground/20 hover:border-sidebar-primary/50 transition-colors">
                                <img
                                    className="h-full w-full object-cover"
                                    src="/1.png"
                                    alt="Avatar"
                                />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{currentUser.username}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400 border-transparent">
                                        {currentUser.role}
                                    </Badge>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={handleOpenEditProfile}>
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>Edit Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-rose-500 focus:text-rose-400 focus:bg-rose-950/30 cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* EDIT PROFILE DIALOG */}
            <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Update your personal details. Role and Branch are managed by system administrators.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Role & Branch (Read Only) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <Select value={formData.role} disabled>
                                    <SelectTrigger className="pl-3 bg-muted text-muted-foreground opacity-100">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-slate-400" />
                                            <SelectValue />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Staff">Staff</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Branch</label>
                                <Select value={formData.branch} disabled>
                                    <SelectTrigger className="pl-3 bg-muted text-muted-foreground opacity-100">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <SelectValue />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="South">South</SelectItem>
                                        <SelectItem value="West">West</SelectItem>
                                        <SelectItem value="Central">Central</SelectItem>
                                        <SelectItem value="Northeast">Northeast</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div className="space-y-4 pt-2 border-t">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Current Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="password"
                                        placeholder="Enter current password"
                                        value={formData.currentPassword}
                                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            type="password"
                                            placeholder="New Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Confirm</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            type="password"
                                            placeholder="Confirm New"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsEditProfileOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveProfile} className="shadow-lg shadow-primary/20">
                            Update Profile
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
