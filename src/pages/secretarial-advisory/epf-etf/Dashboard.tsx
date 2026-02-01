import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Trash2, ChevronLeft, ChevronRight, Plus, HelpCircle, X, Calendar as CalendarIcon, Building2, Users } from "lucide-react"
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
import { epfEtfRecords, type EpfEtfRecord } from "@/data/secretarial-advisory/records"

const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5) + i).map(String);
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Sample names for realistic data
const sampleNames = [
    "John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "Chris Brown",
    "Patricia Wilson", "Matthew Miller", "Jennifer Moore", "Joshua Taylor", "Amanda Anderson",
    "David Thomas", "Sarah Jackson", "James White", "Jessica Harris", "Robert Martin",
    "Mary Thompson", "Daniel Garcia", "Lisa Martinez", "Paul Robinson", "Kimberly Clark",
    "Mark Rodriguez", "Elizabeth Lewis", "Donald Lee", "Nancy Walker", "George Hall",
    "Karen Allen", "Kenneth Young", "Betty Hernandez", "Steven King", "Margaret Wright"
];

// Helper to generate mock staff data with realistic names
const generateMockStaff = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `STF-${String(i + 1).padStart(3, '0')}`,
        name: sampleNames[i % sampleNames.length] + (i >= sampleNames.length ? ` ${Math.floor(i / sampleNames.length) + 1}` : "")
    }))
}

export default function EpfEtfDashboard() {
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: string | null; isBulk?: boolean }>({ isOpen: false, id: null })
    const [searchTerm, setSearchTerm] = useState("")
    const [processFilter, setProcessFilter] = useState("all")
    const [filterType, setFilterType] = useState<"none" | "date" | "month" | "year" | "period">("none")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString())
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

    // Side Panel States
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [activeRecord, setActiveRecord] = useState<EpfEtfRecord | null>(null)
    const [staffData, setStaffData] = useState<{ id: string, name: string }[]>([])
    const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([])

    // Panel Search & Pagination States
    const [staffSearchTerm, setStaffSearchTerm] = useState("")
    const [staffPage, setStaffPage] = useState(1)
    const staffItemsPerPage = 15

    const toggleSelect = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        if (selectedRows.length === epfEtfRecords.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(epfEtfRecords.map(r => r.id))
        }
    }

    const handleDeleteSelected = () => {
        setDeleteConfirmation({ isOpen: true, id: null, isBulk: true })
    }

    const filteredRecords = epfEtfRecords.filter(record => {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
            record.clientName.toLowerCase().includes(searchLower) ||
            record.companyName.toLowerCase().includes(searchLower) ||
            record.id.toLowerCase().includes(searchLower)

        const matchesProcess = processFilter === "all" || record.process.toLowerCase() === processFilter.toLowerCase()

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

        return matchesSearch && matchesProcess && matchesDate
    })

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, processFilter, filterType, selectedDate, selectedMonth, selectedYear, dateRange])

    // Side Panel Logic
    const openPanel = (record: EpfEtfRecord, e: React.MouseEvent) => {
        e.stopPropagation() // Prevent row click
        setActiveRecord(record)
        setStaffData(generateMockStaff(record.noOfStaffs))
        setSelectedStaffIds([])
        setStaffSearchTerm("")
        setStaffPage(1)
        setIsPanelOpen(true)
    }

    const closePanel = () => {
        setIsPanelOpen(false)
        setActiveRecord(null)
    }

    const toggleStaffSelect = (id: string) => {
        setSelectedStaffIds(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        )
    }

    const toggleAllStaff = () => {
        // Toggle only visible items on current page
        const visibleIds = currentStaffRecords.map(s => s.id)
        const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(id => selectedStaffIds.includes(id))

        if (allVisibleSelected) {
            setSelectedStaffIds(prev => prev.filter(id => !visibleIds.includes(id)))
        } else {
            // Add missing visible IDs
            const newIds = [...selectedStaffIds]
            visibleIds.forEach(id => {
                if (!newIds.includes(id)) newIds.push(id)
            })
            setSelectedStaffIds(newIds)
        }
    }

    // Filter and Sort Staff Data
    const filteredStaff = staffData.filter(s =>
        s.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(staffSearchTerm.toLowerCase())
    )

    // Pagination for Staff Data
    const totalStaffPages = Math.ceil(filteredStaff.length / staffItemsPerPage)
    const staffStartIndex = (staffPage - 1) * staffItemsPerPage
    const currentStaffRecords = filteredStaff.slice(staffStartIndex, staffStartIndex + staffItemsPerPage)

    // Reset page on search
    useEffect(() => {
        setStaffPage(1)
    }, [staffSearchTerm])

    const deleteSelectedStaff = () => {
        // Mock deletion
        setStaffData(prev => prev.filter(s => !selectedStaffIds.includes(s.id)))
        setSelectedStaffIds([])
    }

    const cancelSelection = () => {
        setSelectedStaffIds([])
    }

    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6 animate-in fade-in duration-500 pb-10 relative overflow-hidden">
            <div className={`transition-all duration-300 ${isPanelOpen ? "w-[75%]" : "w-full"}`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">EPF / ETF</h1>
                    </div>
                    <Button onClick={() => navigate("/secretarial-advisory/epf-etf/new")} className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01]">
                        <Plus className="h-4 w-4" />
                        Add Record
                    </Button>
                </div>

                <Card className="shadow-sm border-slate-200 dark:border-slate-800 mt-6">
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
                                <Button variant="ghost" size="icon" onClick={() => {
                                    setFilterType("none");
                                    setSelectedDate(undefined);
                                    setDateRange(undefined);
                                }}>
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="rounded-md border bg-card shadow-sm flex flex-col mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] pl-6 pr-4">
                                    <Checkbox
                                        checked={epfEtfRecords.length > 0 && selectedRows.length === epfEtfRecords.length}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
                                <TableHead className="font-bold text-[15px] text-foreground">ID</TableHead>
                                <TableHead className="font-bold text-[15px] text-foreground">Date</TableHead>
                                <TableHead className="font-bold text-[15px] text-foreground">Client Name</TableHead>
                                <TableHead className="font-bold text-[15px] text-foreground">Company Name</TableHead>
                                <TableHead className="font-bold text-[15px] text-foreground">No of Staffs</TableHead>
                                <TableHead className="font-bold text-[15px] text-foreground">Process</TableHead>
                                <TableHead className="w-[50px]"></TableHead> {/* Chevron Column */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentRecords.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                                        No records found matching your filters.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentRecords.map((record) => (
                                    <TableRow
                                        key={record.id}
                                        data-state={selectedRows.includes(record.id) ? "selected" : undefined}
                                        className="hover:bg-muted/50 transition-colors"
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
                                        <TableCell>{record.noOfStaffs}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono text-[13px] px-3 py-1 uppercase tracking-wider font-bold">{record.process}</Badge>
                                        </TableCell>
                                        <TableCell onClick={(e) => e.stopPropagation()}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 hover:text-primary transition-colors"
                                                onClick={(e) => openPanel(record, e)}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between pt-2 mt-4">
                    <button
                        className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors"
                        onClick={() => setLearnMoreOpen(true)}
                    >
                        <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                        Learn more about EPF/ETF
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
            </div>

            {/* Slide-out Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-[#020617] border-l border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isPanelOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {activeRecord && (
                    <div className="flex flex-col h-full bg-[#020617] text-slate-200">
                        {/* Header */}
                        <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-900/50">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20 text-white shrink-0">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="text-lg font-bold text-white leading-none truncate" title={activeRecord.companyName}>{activeRecord.companyName}</h3>
                                    <p className="text-slate-400 text-xs mt-1">EPF/ETF Registration</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={closePanel} className="text-slate-400 hover:text-white hover:bg-slate-800">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-6 space-y-4">
                            <Card className="bg-[#0f172a] border-slate-800 shadow-md text-slate-200">
                                <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-white">Staff Details ({staffData.length})</span>
                                </div>

                                {/* Staff Search */}
                                <div className="p-4 border-b border-slate-800 bg-slate-900/30">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                                        <Input
                                            placeholder="Search Staff ID or Name..."
                                            className="pl-9 h-9 text-xs bg-slate-800 border-slate-700 text-white focus-visible:ring-blue-500 placeholder:text-slate-500"
                                            value={staffSearchTerm}
                                            onChange={(e) => setStaffSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {selectedStaffIds.length > 0 && (
                                    <div className="p-2 bg-blue-900/20 border-b border-slate-800 flex items-center justify-between px-4 animate-in slide-in-from-top-2">
                                        <span className="text-xs font-medium text-blue-400">
                                            {selectedStaffIds.length} staff selected
                                        </span>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400 hover:text-white hover:bg-slate-800" onClick={cancelSelection}>
                                                Cancel
                                            </Button>
                                            <Button variant="destructive" size="sm" className="h-7 text-xs" onClick={deleteSelectedStaff}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex-1 overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-slate-900/50">
                                            <TableRow className="border-slate-800 hover:bg-transparent">
                                                <TableHead className="w-[40px] border-slate-800">
                                                    <Checkbox
                                                        className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                        checked={currentStaffRecords.length > 0 && currentStaffRecords.every(s => selectedStaffIds.includes(s.id))}
                                                        onCheckedChange={toggleAllStaff}
                                                    />
                                                </TableHead>
                                                <TableHead className="font-bold text-[10px] uppercase text-slate-500 border-slate-800">Staff ID</TableHead>
                                                <TableHead className="font-bold text-[10px] uppercase text-slate-500 border-slate-800">Name</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentStaffRecords.length === 0 ? (
                                                <TableRow className="border-slate-800 hover:bg-transparent">
                                                    <TableCell colSpan={3} className="text-center text-slate-500 py-8 text-xs italic">
                                                        No staff records match your search.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                currentStaffRecords.map((staff) => (
                                                    <TableRow
                                                        key={staff.id}
                                                        className="cursor-pointer border-slate-800 hover:bg-slate-800/50 transition-colors"
                                                        onClick={() => navigate(`/secretarial-advisory/epf-etf/${activeRecord!.id}/staff/${staff.id}`, { state: { staff } })}
                                                    >
                                                        <TableCell className="py-3 border-slate-800" onClick={(e) => e.stopPropagation()}>
                                                            <Checkbox
                                                                className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                                checked={selectedStaffIds.includes(staff.id)}
                                                                onCheckedChange={() => toggleStaffSelect(staff.id)}
                                                            />
                                                        </TableCell>
                                                        <TableCell className="font-mono text-xs text-blue-400 py-3 border-slate-800">{staff.id}</TableCell>
                                                        <TableCell className="text-sm text-slate-300 py-3 border-slate-800">{staff.name}</TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Staff Pagination */}
                                {totalStaffPages > 1 && (
                                    <div className="p-4 border-t border-slate-800 bg-slate-900/30 flex items-center justify-between">
                                        <span className="text-xs text-slate-500">
                                            Page {staffPage} of {totalStaffPages}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7 bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white"
                                                disabled={staffPage === 1}
                                                onClick={() => setStaffPage(p => p - 1)}
                                            >
                                                <ChevronLeft className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7 bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white"
                                                disabled={staffPage >= totalStaffPages}
                                                onClick={() => setStaffPage(p => p + 1)}
                                            >
                                                <ChevronRight className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay */}
            {isPanelOpen && (
                <div className="fixed inset-0 bg-black/20 z-40" onClick={closePanel} />
            )}

            {/* Learn More Dialog */}
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>EPF / ETF Help</DialogTitle>
                        <DialogDescription>
                            Manage EPF/ETF registrations and staff details here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-sm text-slate-500">
                        <p>Use this dashboard to track EPF/ETF registrations and manage staff members associated with each record.</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)}>Got it</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && setDeleteConfirmation({ isOpen: false, id: null })}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            Are you sure?
                        </DialogDescription>
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
