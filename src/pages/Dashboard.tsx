import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users,
    DollarSign,
    FileText,
    Building2,
    UserPlus,
    Plus,
    ArrowUpRight,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    AlertCircle,
    Receipt,
    Briefcase
} from "lucide-react"
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"

// Import actual data from the system
import { mockClients } from "@/data/clients"
import { mockRecords } from "@/data/audit-assurance/records"
import { secretarialRecords } from "@/data/secretarialData"

// Calculate metrics from actual data
const totalClients = mockClients.length
const activeClients = mockClients.filter(c => c.status === "Active").length
const totalRevenue = mockClients.reduce((sum, c) => sum + c.totalRevenue, 0)
const outstandingBalance = mockClients.reduce((sum, c) => sum + c.outstandingBalance, 0)

// Client category breakdown
const corporateClients = mockClients.filter(c => c.category === "Corporate").length
const smeClients = mockClients.filter(c => c.category === "SME").length
const individualClients = mockClients.filter(c => c.category === "Individual").length

// Audit records stats
const totalAuditRecords = mockRecords.length
const paidAudits = mockRecords.filter(r => r.paymentStatus === "Paid").length
const unpaidAudits = mockRecords.filter(r => r.paymentStatus === "Unpaid").length
const partialAudits = mockRecords.filter(r => r.paymentStatus === "Partial").length

// Secretarial records stats
const totalSecretarialRecords = secretarialRecords.length
const paidSecretarial = secretarialRecords.filter(r => r.paymentStatus === "Paid").length
const unpaidSecretarial = secretarialRecords.filter(r => r.paymentStatus === "Unpaid").length

// Branch distribution from audit records
const branchData = [
    { name: "South", audits: mockRecords.filter(r => r.branch === "South").length },
    { name: "West", audits: mockRecords.filter(r => r.branch === "West").length },
    { name: "Central", audits: mockRecords.filter(r => r.branch === "Central").length },
    { name: "Northeast", audits: mockRecords.filter(r => r.branch === "Northeast").length },
]

// Payment status chart data
const paymentStatusData = [
    { name: "Paid", value: paidAudits + paidSecretarial, color: "#22c55e" },
    { name: "Partial", value: partialAudits + secretarialRecords.filter(r => r.paymentStatus === "Partial").length, color: "#f59e0b" },
    { name: "Unpaid", value: unpaidAudits + unpaidSecretarial, color: "#ef4444" },
]

// Client category chart data
const clientCategoryData = [
    { name: "Corporate", value: corporateClients, color: "#3b82f6" },
    { name: "SME", value: smeClients, color: "#8b5cf6" },
    { name: "Individual", value: individualClients, color: "#06b6d4" },
]

// Mock recent activity (based on system actions)
const recentActivity = [
    { id: 1, action: "New audit record created", module: "Audit & Assurance", client: "Omega Energy", time: "2 hours ago", type: "create" },
    { id: 2, action: "Payment received", module: "Clients", client: "Solar Systems", time: "4 hours ago", type: "payment" },
    { id: 3, action: "Company registered", module: "Secretarial", client: "METRO SOLUTIONS PVT LTD", time: "Yesterday", type: "create" },
    { id: 4, action: "CIT filing submitted", module: "Tax Filing", client: "Acme Corp", time: "Yesterday", type: "submit" },
    { id: 5, action: "Team member added", module: "Team", client: "Chaminda Herath", time: "2 days ago", type: "team" },
    { id: 6, action: "Trade license renewed", module: "Secretarial", client: "CITY RETAIL STORES", time: "3 days ago", type: "update" },
]

// Format currency
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value)
}

export default function Dashboard() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's an overview of AATS.</p>
            </div>

            {/* Key Metrics Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Clients */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalClients}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="text-green-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-0.5" />
                                {activeClients} active
                            </span>
                            <span className="text-slate-400">•</span>
                            <span>{totalClients - activeClients} inactive</span>
                        </p>
                    </CardContent>
                </Card>

                {/* Total Revenue */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="text-green-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-0.5" />
                                +12.5%
                            </span>
                            from last month
                        </p>
                    </CardContent>
                </Card>

                {/* Outstanding Balance */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">{formatCurrency(outstandingBalance)}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="text-red-500 flex items-center">
                                <TrendingDown className="h-3 w-3 mr-0.5" />
                                3 clients
                            </span>
                            have pending dues
                        </p>
                    </CardContent>
                </Card>

                {/* Audit Records */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Audit Records</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAuditRecords}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="text-green-600">{paidAudits} paid</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-amber-500">{partialAudits} partial</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-red-500">{unpaidAudits} unpaid</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Frequently used shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/audit-assurance/new">
                            <Button variant="outline" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Plus className="h-4 w-4" />
                                New Audit Record
                            </Button>
                        </Link>
                        <Link to="/secretarial-advisory/company-registration/new">
                            <Button variant="outline" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Building2 className="h-4 w-4" />
                                Register Company
                            </Button>
                        </Link>
                        <Link to="/team" state={{ openAddMember: true }}>
                            <Button variant="outline" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                <UserPlus className="h-4 w-4" />
                                Add Team Member
                            </Button>
                        </Link>
                        <Link to="/tax-filing/cit">
                            <Button variant="outline" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Receipt className="h-4 w-4" />
                                File CIT
                            </Button>
                        </Link>
                        <Link to="/clients">
                            <Button variant="outline" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Users className="h-4 w-4" />
                                View Clients
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Payment Status Distribution */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg">Payment Status</CardTitle>
                        <CardDescription>All modules combined</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[180px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={paymentStatusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {paymentStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px',
                                        }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Custom Legend */}
                        <div className="flex items-center justify-center gap-4 mt-2">
                            {paymentStatusData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full shadow-sm"
                                        style={{ backgroundColor: item.color, boxShadow: `0 0 0 2px ${item.color}20` }}
                                    />
                                    <span className="text-xs font-semibold text-muted-foreground">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Client Categories */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg">Client Categories</CardTitle>
                        <CardDescription>Distribution by type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[180px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={clientCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {clientCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px',
                                        }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Custom Legend */}
                        <div className="flex items-center justify-center gap-4 mt-2">
                            {clientCategoryData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full shadow-sm"
                                        style={{ backgroundColor: item.color, boxShadow: `0 0 0 2px ${item.color}20` }}
                                    />
                                    <span className="text-xs font-semibold text-muted-foreground">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Branch Performance */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg">Branch Activity</CardTitle>
                        <CardDescription>Audits by branch</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={branchData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px',
                                            color: 'hsl(var(--foreground))'
                                        }}
                                    />
                                    <Bar dataKey="audits" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row: Module Summary + Recent Activity */}
            <div className="grid gap-4 lg:grid-cols-2">
                {/* Module Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Module Summary</CardTitle>
                        <CardDescription>Overview of all modules</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Accounts & Audit */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30">
                                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Accounts & Audit</p>
                                    <p className="text-xs text-muted-foreground">{totalAuditRecords} records</p>
                                </div>
                            </div>
                            <Link to="/audit-assurance">
                                <Button variant="ghost" size="sm" className="gap-1">
                                    View <ArrowUpRight className="h-3 w-3" />
                                </Button>
                            </Link>
                        </div>

                        {/* Secretarial & Advisory */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-900/30">
                                    <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Secretarial & Advisory</p>
                                    <p className="text-xs text-muted-foreground">{totalSecretarialRecords} records</p>
                                </div>
                            </div>
                            <Link to="/secretarial-advisory/company-registration">
                                <Button variant="ghost" size="sm" className="gap-1">
                                    View <ArrowUpRight className="h-3 w-3" />
                                </Button>
                            </Link>
                        </div>

                        {/* Tax Filing */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-green-100 dark:bg-green-900/30">
                                    <Receipt className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Tax Filing</p>
                                    <p className="text-xs text-muted-foreground">CIT, IIT, VAT, SSCL, WHT</p>
                                </div>
                            </div>
                            <Link to="/tax-filing/cit">
                                <Button variant="ghost" size="sm" className="gap-1">
                                    View <ArrowUpRight className="h-3 w-3" />
                                </Button>
                            </Link>
                        </div>

                        {/* Team */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-orange-100 dark:bg-orange-900/30">
                                    <Briefcase className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Team Management</p>
                                    <p className="text-xs text-muted-foreground">12 members across 4 branches</p>
                                </div>
                            </div>
                            <Link to="/team">
                                <Button variant="ghost" size="sm" className="gap-1">
                                    View <ArrowUpRight className="h-3 w-3" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                        <CardDescription>Latest actions in the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3">
                                    <div className={`p-1.5 rounded-full mt-0.5 ${activity.type === "create" ? "bg-green-100 dark:bg-green-900/30" :
                                        activity.type === "payment" ? "bg-blue-100 dark:bg-blue-900/30" :
                                            activity.type === "submit" ? "bg-purple-100 dark:bg-purple-900/30" :
                                                activity.type === "team" ? "bg-orange-100 dark:bg-orange-900/30" :
                                                    "bg-slate-100 dark:bg-slate-800"
                                        }`}>
                                        {activity.type === "create" && <Plus className="h-3 w-3 text-green-600 dark:text-green-400" />}
                                        {activity.type === "payment" && <CheckCircle2 className="h-3 w-3 text-blue-600 dark:text-blue-400" />}
                                        {activity.type === "submit" && <FileText className="h-3 w-3 text-purple-600 dark:text-purple-400" />}
                                        {activity.type === "team" && <UserPlus className="h-3 w-3 text-orange-600 dark:text-orange-400" />}
                                        {activity.type === "update" && <CheckCircle2 className="h-3 w-3 text-slate-600 dark:text-slate-400" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{activity.action}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{activity.module}</Badge>
                                            <span className="truncate">{activity.client}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                        <Clock className="h-3 w-3" />
                                        {activity.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
