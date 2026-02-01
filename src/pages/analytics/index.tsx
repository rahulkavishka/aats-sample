import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function AnalyticsPage() {
    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231.89",
            change: "+20.1%",
            trend: "up",
            icon: DollarSign,
        },
        {
            title: "Active Clients",
            value: "+2350",
            change: "+180.1%",
            trend: "up",
            icon: Users,
        },
        {
            title: "Sales",
            value: "+12,234",
            change: "+19%",
            trend: "up",
            icon: BarChart3,
        },
        {
            title: "Active Now",
            value: "+573",
            change: "-201",
            trend: "down",
            icon: TrendingUp,
        },
    ]

    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Analytics Dashboard</h1>
                <p className="text-muted-foreground">Real-time insights and business performance metrics.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200/60 dark:border-slate-800/60">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                                ) : (
                                    <ArrowDownRight className="h-3 w-3 text-rose-500" />
                                )}
                                <span className={stat.trend === "up" ? "text-emerald-500 font-medium" : "text-rose-500 font-medium"}>
                                    {stat.change}
                                </span>
                                vs. last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Revenue Overview</CardTitle>
                        <Button variant="outline" size="sm" className="text-[10px] h-7 px-2">Download Data</Button>
                    </CardHeader>
                    <CardContent className="h-[350px] flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 border-2 border-dashed rounded-xl m-4 border-slate-200 dark:border-slate-800">
                        <div className="text-muted-foreground text-sm flex flex-col items-center gap-3">
                            <div className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-sm">
                                <BarChart3 className="h-8 w-8 text-primary opacity-40" />
                            </div>
                            <span className="font-medium">Interactive Chart Integration Pending</span>
                            <p className="text-xs max-w-[200px] text-center opacity-60">Revenue trends across Audit, Tax, and Forensic departments.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                    <CardHeader>
                        <CardTitle>Security Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { title: "Admin Login", time: "12 mins ago", user: "alex.admin", type: "success" },
                                { title: "Report Exported", time: "45 mins ago", user: "sarah.staff", type: "info" },
                                { title: "New Team Member", time: "2 hours ago", user: "system", type: "success" },
                                { title: "Password Reset", time: "5 hours ago", user: "mike.finance", type: "warning" },
                                { title: "Backup Completed", time: "Yesterday", user: "system", type: "info" }
                            ].map((event, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <div className={cn(
                                        "size-2 rounded-full",
                                        event.type === "success" ? "bg-emerald-500" :
                                            event.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                                    )} />
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">{event.title}</p>
                                        <p className="text-xs text-muted-foreground">by {event.user} • {event.time}</p>
                                    </div>
                                    <ArrowUpRight className="ml-auto h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-6 text-xs text-muted-foreground hover:text-primary">View Full Audit Log</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
