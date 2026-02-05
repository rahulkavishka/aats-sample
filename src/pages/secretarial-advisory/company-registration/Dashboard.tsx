import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Trash2, ChevronLeft, ChevronRight, Plus, HelpCircle, X, Calendar as CalendarIcon } from "lucide-react"
import { format, isSameDay, isSameMonth, isSameYear, isWithinInterval, startOfDay, endOfDay } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { companyRegistrationRecords } from "@/data/secretarial-advisory/records"

// --- Constants for Date Filtering ---
const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5) + i).map(String);
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function CompanyRegistrationDashboard() {
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: string | null; isBulk?: boolean }>({ isOpen: false, id: null })

    // --- Search & Filter States ---
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [processFilter, setProcessFilter] = useState("all")

    // --- Advanced Date Filter States ---
    const [filterType, setFilterType] = useState<"none" | "date" | "month" | "year" | "period">("none")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString())
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

    // Toggle selection
    const toggleSelect = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        if (selectedRows.length === companyRegistrationRecords.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(companyRegistrationRecords.map(r => r.id))
        }
    }

    const handleDeleteSelected = () => {
        setDeleteConfirmation({ isOpen: true, id: null, isBulk: true })
    }

    // --- Filter Logic ---
    const filteredRecords = companyRegistrationRecords.filter(record => {
        // 1. Search
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
            record.clientName.toLowerCase().includes(searchLower) ||
            record.companyName.toLowerCase().includes(searchLower) ||
            record.id.toLowerCase().includes(searchLower)

        // 2. Status
        const matchesStatus = statusFilter === "all" || record.paymentStatus.toLowerCase() === statusFilter.toLowerCase()

        // 3. Process
        const matchesProcess = processFilter === "all" || record.process.toLowerCase() === processFilter.toLowerCase()

        // 4. Date Filters
        let matchesDate = true
        const recordDate = new Date(record.date)

        if (filterType === "date" && selectedDate) {
            matchesDate = isSameDay(recordDate, selectedDate)
        } else if (filterType === "month") {
            const filterDate = new Date(parseInt(selectedYear), parseInt(selectedMonth))
            matchesDate = isSameMonth(recordDate, filterDate) && isSameYear(recordDate, filterDate)
        } else if (filterType === "year") {
            matchesDate = recordDate.getFullYear().toString() === selectedYear
        } else if (filterType === "period" && dateRange?.from && dateRange?.to) {
            matchesDate = isWithinInterval(recordDate, {
                start: startOfDay(dateRange.from),
                end: endOfDay(dateRange.to)
            })
        }

        return matchesSearch && matchesStatus && matchesProcess && matchesDate
    })

    // --- Pagination Logic ---
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage)

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter, processFilter, filterType, selectedDate, selectedMonth, selectedYear, dateRange])


    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Company Registration</h1>
                </div>
                <Button onClick={() => navigate("/secretarial-advisory/company-registration/new")} className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01]">
                    <Plus className="h-4 w-4" />
                    Add Record
                </Button>
            </div>

            {/* Filters & Search Section */}
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                <CardContent className="p-4 grid gap-4 grid-cols-1 xl:grid-cols-[1fr_auto_auto]">
                    {/* 1. Search & Selection Actions Container */}
                    <div className="flex items-center gap-2 w-full">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search Client, Company, ID..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Selection Actions (Inline with Search) */}
                        {selectedRows.length > 0 && (
                            <div className="flex items-center gap-2 bg-muted px-2 py-1.5 rounded-md whitespace-nowrap animate-in slide-in-from-right-2 fade-in">
                                <span className="text-xs font-medium">{selectedRows.length} selected</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/20" onClick={handleDeleteSelected}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedRows([])}><X className="h-3 w-3" /></Button>
                            </div>
                        )}
                    </div>

                    {/* 2. Advanced Date Filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Select
                            value={filterType}
                            onValueChange={(val: any) => {
                                setFilterType(val)
                                if (val === "none") {
                                    setSelectedDate(undefined)
                                    setDateRange(undefined)
                                }
                            }}
                        >
                            <SelectTrigger className="w-[140px]">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                    <SelectValue placeholder="Date Filter" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">All Dates</SelectItem>
                                <SelectItem value="date">Specific Date</SelectItem>
                                <SelectItem value="month">Month</SelectItem>
                                <SelectItem value="year">Year</SelectItem>
                                <SelectItem value="period">Period</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Specific Date */}
                        {filterType === "date" && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={`w-[200px] justify-start text-left font-normal ${!selectedDate && "text-muted-foreground"}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        )}

                        {/* Month/Year */}
                        {filterType === "month" && (
                            <div className="flex gap-2">
                                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {months.map((m, i) => (
                                            <SelectItem key={m} value={i.toString()}>{m}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={selectedYear} onValueChange={setSelectedYear}>
                                    <SelectTrigger className="w-[90px]">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map(y => (
                                            <SelectItem key={y} value={y}>{y}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Year Only */}
                        {filterType === "year" && (
                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Select Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map(y => (
                                        <SelectItem key={y} value={y}>{y}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {/* Period Range */}
                        {filterType === "period" && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button id="date" variant={"outline"} className={`w-[240px] justify-start text-left font-normal ${!dateRange && "text-muted-foreground"}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateRange?.from ? (
                                            dateRange.to ? (
                                                <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</>
                                            ) : (
                                                format(dateRange.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={dateRange?.from}
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}

                        {/* Clear Button */}
                        {filterType !== "none" && (
                            <Button variant="ghost" size="icon" onClick={() => {
                                setFilterType("none");
                                setSelectedDate(undefined);
                                setDateRange(undefined);
                            }}>
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* 3. Other Filters */}
                    <div className="flex gap-2 w-full xl:w-auto overflow-x-auto p-1">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="unpaid">Unpaid</SelectItem>
                                <SelectItem value="partial">Partial</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={processFilter} onValueChange={setProcessFilter}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Process" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Process</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Table Section */}
            <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                            <TableHead className="pl-6">
                                <Checkbox
                                    checked={companyRegistrationRecords.length > 0 && selectedRows.length === companyRegistrationRecords.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            {/* Columns: ID, Date, Client Name, Company Name, Payment status, Process */}
                            <TableHead>ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Client Name</TableHead>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Process</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentRecords.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    No records found matching your filters.
                                </TableCell>
                            </TableRow>
                        ) : (
                            currentRecords.map((record) => (
                                <TableRow
                                    key={record.id}
                                    data-state={selectedRows.includes(record.id) ? "selected" : undefined}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => navigate(`/secretarial-advisory/company-registration/${record.id}`)}
                                >
                                    <TableCell className="pl-6 pr-4" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selectedRows.includes(record.id)}
                                            onCheckedChange={() => toggleSelect(record.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-xs text-muted-foreground">{record.id}</TableCell>
                                    <TableCell className="whitespace-nowrap">{format(new Date(record.date), "dd/MM/yyyy")}</TableCell>
                                    <TableCell className="font-medium">
                                        <span className="font-semibold text-foreground hover:text-primary transition-colors">
                                            {record.clientName}
                                        </span>
                                    </TableCell>
                                    <TableCell className="font-medium text-foreground">{record.companyName}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={record.paymentStatus} />
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono text-[13px] px-3 py-1 uppercase tracking-wider font-bold">{record.process}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>

            {/* Footer / Pagination */}
            <div className="flex items-center justify-between pt-2">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors"
                    onClick={() => setLearnMoreOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Learn more about Company Registration
                </button>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages || 1}</span>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Help Dialog */}
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Company Registration Help</DialogTitle>
                        <DialogDescription>
                            Helper information for Company Registration module.
                        </DialogDescription>
                    </DialogHeader>
                    {/* Simplified help content */}
                    <div className="py-4">
                        <p className="text-sm text-muted-foreground">This module tracks company registrations.</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* DELETE CONFIRMATION DIALOG */}
            <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && setDeleteConfirmation({ isOpen: false, id: null })}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            {deleteConfirmation.isBulk
                                ? `Are you sure you want to delete ${selectedRows.length} selected records? This action cannot be undone.`
                                : "Are you sure you want to delete this record? This action cannot be undone."
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteConfirmation({ isOpen: false, id: null })}
                            className="w-full sm:w-32"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                setSelectedRows([])
                                setDeleteConfirmation({ isOpen: false, id: null });
                            }}
                            className="w-full sm:w-32"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

const StatusBadge = ({ status }: { status: string }) => {
    const s = status.toLowerCase()
    let variant: "paid" | "destructive" | "pending" | "partial" | "secondary" = "secondary"

    if (s === "paid") variant = "paid"
    else if (s === "unpaid") variant = "destructive"
    else if (s === "partial") variant = "partial"
    else if (s === "pending") variant = "pending"

    return <Badge variant={variant} className="capitalize">{status}</Badge>
}
