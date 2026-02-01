import { Link, useLocation } from "react-router-dom"
import { ChevronDown, ChevronRight, FileText, Home, Users, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Sidebar() {
    const location = useLocation()
    const [expanded, setExpanded] = useState<string | null>("accounts-audit")

    const toggleExpand = (key: string) => {
        setExpanded(prev => prev === key ? null : key)
    }

    const getLinkClasses = (isActive: boolean) => {
        return cn(
            "flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-200",
            isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                : "text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-primary/10"
        )
    }

    return (
        <aside className="w-64 border-r border-sidebar-border bg-sidebar hidden md:block flex-shrink-0">
            <div className="flex h-14 items-center justify-center border-sidebar-border/50 lg:h-[60px]">
                <Link to="/dashboard" className="flex items-center gap-3 font-bold text-xl tracking-tight">
                    <img src="/logo.png" alt="AATS Logo" className="h-8 w-8 object-contain" />
                    <span className="text-sidebar-primary text-2xl">AATS</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-3">
                <nav className="grid items-start px-2 text-sm font-medium">
                    {/* Dashboard Link */}
                    <Link
                        to="/dashboard"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-200 mb-2",
                            location.pathname === "/dashboard"
                                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                                : "text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-primary/10"
                        )}
                    >
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>



                    {/* Main Function: Accounts & Audit */}
                    <div>
                        <button
                            onClick={() => toggleExpand("accounts-audit")}
                            className="flex items-center justify-between w-full px-2 py-1.5 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors hover:bg-sidebar-primary/10 rounded-md"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4" />
                                <span>Accounts & Audit</span>
                            </div>
                            {expanded === "accounts-audit" ? (
                                <ChevronDown className="h-4 w-4 opacity-70" />
                            ) : (
                                <ChevronRight className="h-4 w-4 opacity-70" />
                            )}
                        </button>
                        {expanded === "accounts-audit" && (
                            <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border/50 pl-2">
                                <Link
                                    to="/audit-assurance"
                                    className={getLinkClasses(location.pathname.startsWith("/audit-assurance"))}
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

                    {/* Main Function: Tax Filing */}
                    <div className="mt-4">
                        <button
                            onClick={() => toggleExpand("tax-filing")}
                            className="flex items-center justify-between w-full px-2 py-1.5 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors hover:bg-sidebar-primary/10 rounded-md"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4" />
                                <span>Tax Filing</span>
                            </div>
                            {expanded === "tax-filing" ? (
                                <ChevronDown className="h-4 w-4 opacity-70" />
                            ) : (
                                <ChevronRight className="h-4 w-4 opacity-70" />
                            )}
                        </button>
                        {expanded === "tax-filing" && (
                            <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border/50 pl-2">
                                <Link
                                    to="/tax-filing/cit"
                                    className={getLinkClasses(location.pathname.includes("/cit"))}
                                >
                                    CIT (Corporate)
                                </Link>
                                <Link
                                    to="/tax-filing/iit"
                                    className={getLinkClasses(location.pathname.includes("/iit"))}
                                >
                                    IIT (Individual)
                                </Link>
                                <Link
                                    to="/tax-filing/vat"
                                    className={getLinkClasses(location.pathname.includes("/vat"))}
                                >
                                    VAT
                                </Link>
                                <Link
                                    to="/tax-filing/sscl"
                                    className={getLinkClasses(location.pathname.includes("/sscl"))}
                                >
                                    SSCL
                                </Link>
                                <Link
                                    to="/tax-filing/wht"
                                    className={getLinkClasses(location.pathname.includes("/wht"))}
                                >
                                    WHT
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Main Function: Secretarial & Advisory */}
                    <div className="mt-4">
                        <button
                            onClick={() => toggleExpand("secretarial-advisory")}
                            className="flex items-center justify-between w-full px-2 py-1.5 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors hover:bg-sidebar-primary/10 rounded-md"
                        >
                            <div className="flex items-center gap-3">
                                <Building2 className="h-4 w-4" />
                                <span>Secretarial & Advisory</span>
                            </div>
                            {expanded === "secretarial-advisory" ? (
                                <ChevronDown className="h-4 w-4 opacity-70" />
                            ) : (
                                <ChevronRight className="h-4 w-4 opacity-70" />
                            )}
                        </button>
                        {expanded === "secretarial-advisory" && (
                            <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border/50 pl-2">
                                <Link
                                    to="/secretarial-advisory/company-registration"
                                    className={getLinkClasses(location.pathname.includes("/secretarial-advisory/company-registration"))}
                                >
                                    Company Registration
                                </Link>
                                <Link
                                    to="/secretarial-advisory/epf-etf"
                                    className={getLinkClasses(location.pathname.includes("/secretarial-advisory/epf-etf"))}
                                >
                                    EPF / ETF
                                </Link>
                                <Link
                                    to="/secretarial-advisory/trade-license"
                                    className={getLinkClasses(location.pathname.includes("/secretarial-advisory/trade-license"))}
                                >
                                    Trade License
                                </Link>
                                <Link
                                    to="/secretarial-advisory/trade-mark"
                                    className={getLinkClasses(location.pathname.includes("/secretarial-advisory/trade-mark"))}
                                >
                                    Trade Mark
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Clients Link */}
                    <Link
                        to="/clients"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-200 mt-4",
                            location.pathname === "/clients"
                                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                                : "text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-primary/10"
                        )}
                    >
                        <Users className="h-4 w-4" />
                        <span>Clients</span>
                    </Link>

                    {/* Team Link */}
                    <Link
                        to="/team"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-200 mt-2",
                            location.pathname === "/team"
                                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                                : "text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-primary/10"
                        )}
                    >
                        <Users className="h-4 w-4" />
                        <span>Team</span>
                    </Link>
                </nav>
            </div>
        </aside>
    )
}
