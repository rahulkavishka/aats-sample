import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Trash2, ChevronLeft, ChevronRight, Plus, HelpCircle, X, Calendar as CalendarIcon } from "lucide-react"
import { format, isSameDay, isSameMonth, isSameYear, isWithinInterval, startOfDay, endOfDay } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { tradeLicenseRecords } from "@/data/secretarial-advisory/records"

const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5) + i).map(String);
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function TradeLicenseDashboard() {
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: string | null; isBulk?: boolean }>({ isOpen: false, id: null })
    const [searchTerm, setSearchTerm] = useState("")

    // --- Advanced Date Filter States ---
    const [filterType, setFilterType] = useState<"none" | "date" | "month" | "year" | "period">("none")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString())
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

    const toggleSelect = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        if (selectedRows.length === tradeLicenseRecords.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(tradeLicenseRecords.map(r => r.id))
        }
    }

    const handleDeleteSelected = () => {
        setDeleteConfirmation({ isOpen: true, id: null, isBulk: true })
    }

    const filteredRecords = tradeLicenseRecords.filter(record => {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
            record.clientName.toLowerCase().includes(searchLower) ||
            record.companyName.toLowerCase().includes(searchLower) ||
            record.id.toLowerCase().includes(searchLower)

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

        return matchesSearch && matchesDate
    })

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, filterType, selectedDate, selectedMonth, selectedYear, dateRange])

    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6 animate-in fade-in duration-500 pb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Trade License</h1>
                </div>
                <Button onClick={() => navigate("/secretarial-advisory/trade-license/new")} className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01]">
                    <Plus className="h-4 w-4" />
                    Add Record
                </Button>
            </div>

            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                <CardContent className="p-4 grid gap-4 grid-cols-1 xl:grid-cols-[1fr_auto_auto]">
                    <div className="flex items-center gap-2 w-full">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search here..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
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
                        {filterType !== "none" && (
                            <Button variant="ghost" size="icon" onClick={() => { setFilterType("none"); setSelectedDate(undefined); setDateRange(undefined); }}>
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="rounded-md border bg-card shadow-sm flex flex-col">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] pl-6 pr-4">
                                <Checkbox
                                    checked={tradeLicenseRecords.length > 0 && selectedRows.length === tradeLicenseRecords.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            {/* Columns: ID, Date, Client Name, Company Name */}
                            <TableHead className="font-bold text-[15px] text-foreground">ID</TableHead>
                            <TableHead className="font-bold text-[15px] text-foreground">Date</TableHead>
                            <TableHead className="font-bold text-[15px] text-foreground">Client Name</TableHead>
                            <TableHead className="font-bold text-[15px] text-foreground">Company Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentRecords.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                    No records found matching your filters.
                                </TableCell>
                            </TableRow>
                        ) : (
                            currentRecords.map((record) => (
                                <TableRow
                                    key={record.id}
                                    data-state={selectedRows.includes(record.id) ? "selected" : undefined}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => navigate(`/secretarial-advisory/trade-license/${record.id}`)}
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
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between pt-2">
                <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors" onClick={() => setLearnMoreOpen(true)}>
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" /> Learn more about Trade License
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages || 1}</span>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                </div>
            </div>

            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Trade License Help</DialogTitle>
                        <DialogDescription>
                            Helper information for Trade License module.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-sm text-slate-500">
                        <p>Track trade license registrations and renewals here.</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && setDeleteConfirmation({ isOpen: false, id: null })}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-center pt-2">Are you sure?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center gap-2 mt-4">
                        <Button variant="outline" onClick={() => setDeleteConfirmation({ isOpen: false, id: null })}>Cancel</Button>
                        <Button variant="destructive" onClick={() => { setSelectedRows([]); setDeleteConfirmation({ isOpen: false, id: null }); }}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
