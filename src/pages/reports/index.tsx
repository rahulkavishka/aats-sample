import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Filter, ChevronLeft, ChevronRight } from "lucide-react"

export default function ReportsPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const [reports, setReports] = useState(() => {
        const saved = localStorage.getItem("aats_reports")
        return saved ? JSON.parse(saved) : [
            { id: "REP-001", name: "Monthly Sales Report", date: "2024-01-15", status: "Completed", type: "PDF" },
            { id: "REP-002", name: "Quarterly Audit Summary", date: "2024-01-10", status: "Pending", type: "XLSX" },
            { id: "REP-003", name: "Client Engagement Analysis", date: "2024-01-05", status: "Completed", type: "PDF" },
            { id: "REP-004", name: "Tax Compliance Review", date: "2023-12-28", status: "Completed", type: "DOCX" },
            { id: "REP-005", name: "Internal System Audit", date: "2023-12-20", status: "Archived", type: "PDF" },
            { id: "REP-006", name: "Budget vs Actual Q4", date: "2023-12-15", status: "Completed", type: "XLSX" },
            { id: "REP-007", name: "Employee Productivity", date: "2023-12-10", status: "Completed", type: "PDF" },
            { id: "REP-008", name: "Risk Assessment Report", date: "2023-12-05", status: "Pending", type: "PDF" },
            { id: "REP-009", name: "Website Traffic Analysis", date: "2023-12-01", status: "Completed", type: "CSV" },
            { id: "REP-010", name: "Inventory Audit Dec", date: "2023-11-28", status: "Completed", type: "PDF" },
            { id: "REP-011", name: "Annual Financial Statement", date: "2023-11-25", status: "Completed", type: "PDF" },
            { id: "REP-012", name: "Marketing Campaign ROI", date: "2023-11-20", status: "Archived", type: "XLSX" },
            { id: "REP-013", name: "Vendor Compliance Review", date: "2023-11-15", status: "Completed", type: "PDF" },
            { id: "REP-014", name: "Payroll Summary Nov", date: "2023-11-10", status: "Completed", type: "CSV" },
            { id: "REP-015", name: "Strategic Plan Update", date: "2023-11-05", status: "Pending", type: "PDF" },
        ]
    })

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("aats_reports", JSON.stringify(reports))
    }, [reports])

    const handleGenerateReport = () => {
        const newReport = {
            id: `REP-${Math.floor(100 + Math.random() * 900)}`,
            name: `New Generated Report ${reports.length + 1}`,
            date: new Date().toISOString().split('T')[0],
            status: "Completed",
            type: "PDF"
        }
        setReports((prev: any[]) => [newReport, ...prev])
        setCurrentPage(1)
    }

    const totalPages = Math.ceil(reports.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentReports = reports.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Reports</h1>
                    <p className="text-muted-foreground">Access and download generated business reports.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                    <Button size="sm" className="gap-2" onClick={handleGenerateReport}>
                        <FileText className="h-4 w-4" />
                        Generate New
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Available Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Report ID</TableHead>
                                    <TableHead>Report Name</TableHead>
                                    <TableHead>Generated Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentReports.map((report) => (
                                    <TableRow key={report.id}>
                                        <TableCell className="font-mono text-xs">{report.id}</TableCell>
                                        <TableCell className="font-medium">{report.name}</TableCell>
                                        <TableCell>{report.date}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                report.status === "Completed" ? "paid" :
                                                    report.status === "Pending" ? "pending" : "secondary"
                                            } className="text-[10px] uppercase font-bold px-2 py-0">
                                                {report.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{report.type}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination Controls */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-muted-foreground">
                                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                                <span className="font-medium">{Math.min(startIndex + itemsPerPage, reports.length)}</span> of{" "}
                                <span className="font-bold">{reports.length}</span> reports
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1"
                                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" /> Previous
                                </Button>
                                <div className="flex items-center gap-1.5 px-2">
                                    <span className="text-xs font-medium">Page {currentPage} of {totalPages}</span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1"
                                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
