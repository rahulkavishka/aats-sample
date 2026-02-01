import { useState, useEffect } from "react"
import { Search, Calendar as CalendarIcon, Filter, X, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, isSameDay, isSameMonth, isSameYear, isWithinInterval, startOfDay, endOfDay } from "date-fns"
import type { DateRange } from "react-day-picker"

// --- Constants for Date Filtering ---
const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5) + i).map(String);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Mock Data
const MOCK_LOGS = [
  { id: 1, timestamp: "2026-01-27 10:30 PM", branch: "Central", user: "Mr. John", action: "Create", module: "CIT", description: "Created new invoice #INV-2026-001" },
  { id: 2, timestamp: "2026-01-27 08:30 AM", branch: "West", user: "Mr. Suresh", action: "Update", module: "Registration", description: "Updated attachment for record #TSC-50" },
  { id: 3, timestamp: "2026-01-26 07:12 PM", branch: "North East", user: "Mr. Saman", action: "Delete", module: "Audit & Assurance", description: "Removed inactive client profile ..." },
  { id: 4, timestamp: "2026-01-26 11:24 AM", branch: "Central", user: "Mr. John", action: "Create", module: "Registration", description: "Added new business account 'Tech World'" },
  { id: 5, timestamp: "2026-01-24 05:11 PM", branch: "Central", user: "Mr. John", action: "Update", module: "Team", description: "Changed role for user 'Nimali Silva' to Staff" },
  { id: 6, timestamp: "2026-01-24 01:26 PM", branch: "South", user: "Mr. Suresh", action: "Create", module: "Audit & Assurance", description: "Generated monthly profit report" },
  { id: 7, timestamp: "2026-01-23 04:30 PM", branch: "North East", user: "Mr. Saman", action: "Update", module: "CIT", description: "Modified Invoice #INV-2026-003" },
  { id: 8, timestamp: "2026-01-23 10:30 AM", branch: "West", user: "Mr. Suresh", action: "Create", module: "Registration", description: "Added client 'Rhino Roofing'" },
  { id: 9, timestamp: "2026-01-22 11:45 AM", branch: "North East", user: "Mr. Saman", action: "Delete", module: "CIT", description: "Voided incorrect invoice #INV-2026-005" },
  { id: 10, timestamp: "2026-01-21 03:30 PM", branch: "Central", user: "Mr. John", action: "Login", module: "Auth", description: "User logged in from new device" },
  { id: 11, timestamp: "2026-01-20 02:00 PM", branch: "South", user: "Mr. Suresh", action: "Update", module: "Tax", description: "Updated tax record #TAX-001" },
  { id: 12, timestamp: "2026-01-19 09:15 AM", branch: "Central", user: "Mr. John", action: "Create", module: "Audit", description: "Initiated audit for 'ABC Corp'" },
  { id: 13, timestamp: "2026-01-18 04:45 PM", branch: "West", user: "Mr. Suresh", action: "Delete", module: "Registration", description: "Deleted duplicate registration #REG-992" },
  { id: 14, timestamp: "2026-01-18 10:00 AM", branch: "North East", user: "Mr. Saman", action: "Login", module: "Auth", description: "User logged in" },
  { id: 15, timestamp: "2026-01-17 02:20 PM", branch: "Central", user: "Mr. John", action: "Update", module: "CIT", description: "Corrected amount in Invoice #INV-2026-002" },
  { id: 16, timestamp: "2026-01-16 11:10 AM", branch: "South", user: "Mr. Suresh", action: "Create", module: "Team", description: "Added new user 'Kamal Perera'" },
  { id: 17, timestamp: "2026-01-15 09:30 AM", branch: "West", user: "Mr. Suresh", action: "Update", module: "Audit & Assurance", description: "Updated audit status to 'Completed'" },
  { id: 18, timestamp: "2026-01-14 03:55 PM", branch: "North East", user: "Mr. Saman", action: "Create", module: "Tax", description: "Created new tax filing for Q4" },
  { id: 19, timestamp: "2026-01-13 01:15 PM", branch: "Central", user: "Mr. John", action: "Login", module: "Auth", description: "User logged in after password reset" },
  { id: 20, timestamp: "2026-01-12 10:45 AM", branch: "South", user: "Mr. Suresh", action: "Delete", module: "Team", description: "Removed temporary access for consultant" },
  { id: 21, timestamp: "2026-01-11 08:20 AM", branch: "Central", user: "Mr. John", action: "Update", module: "Registration", description: "Updated contact details for 'Tech World'" },
  { id: 22, timestamp: "2026-01-10 05:00 PM", branch: "West", user: "Mr. Suresh", action: "Create", module: "CIT", description: "Generated end-of-week summary" },
  { id: 23, timestamp: "2026-01-09 11:30 AM", branch: "North East", user: "Mr. Saman", action: "Update", module: "Auth", description: "Updated security policy settings" },
  { id: 24, timestamp: "2026-01-08 09:15 AM", branch: "Central", user: "Mr. John", action: "Create", module: "Audit & Assurance", description: "Started new compliance check" },
]

export default function ActivityLog() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter States
  const [searchQuery, setSearchQuery] = useState("")
  // Advanced Date Filter States
  const [filterType, setFilterType] = useState<"none" | "date" | "month" | "year" | "period">("none")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString())
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const [actionFilter, setActionFilter] = useState("all")
  const [moduleFilter, setModuleFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")

  const [filteredLogs, setFilteredLogs] = useState(MOCK_LOGS)

  // Filtering Logic
  useEffect(() => {
    let result = MOCK_LOGS

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(log =>
        log.id.toString().includes(query) ||
        log.user.toLowerCase().includes(query) ||
        log.description.toLowerCase().includes(query) ||
        log.branch.toLowerCase().includes(query)
      )
    }

    // Advanced Date Filter
    if (filterType !== "none") {
      result = result.filter(log => {
        const recordDate = new Date(log.timestamp)
        let matchesDate = true

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
        return matchesDate
      })
    }

    // Action Filter
    if (actionFilter !== "all") {
      result = result.filter(log => log.action.toLowerCase() === actionFilter.toLowerCase())
    }

    // Module Filter
    if (moduleFilter !== "all") {
      result = result.filter(log => {
        if (moduleFilter === "audit") return log.module === "Audit & Assurance" || log.module === "Audit"
        if (moduleFilter === "cit") return log.module === "CIT"
        if (moduleFilter === "registration") return log.module === "Registration"
        if (moduleFilter === "team") return log.module === "Team"
        if (moduleFilter === "auth") return log.module === "Auth"
        return true
      })
    }

    // Branch Filter
    if (branchFilter !== "all") {
      result = result.filter(log => log.branch.toLowerCase().replace(" ", "") === branchFilter.toLowerCase().replace(" ", ""))
    }

    setFilteredLogs(result)
    setCurrentPage(1) // Reset to first page on filter change
  }, [searchQuery, filterType, selectedDate, selectedMonth, selectedYear, dateRange, actionFilter, moduleFilter, branchFilter])


  const totalItems = filteredLogs.length

  // Styles for Action Badges based on Audit Dashboard "StatusBadge" logic
  // "Create" -> Paid (Green), "Update" -> Secondary (Std), "Delete" -> Destructive (Red)
  const getActionValues = (action: string) => {
    switch (action.toLowerCase()) {
      case "create": return { variant: "paid" as const, label: action }
      case "update": return { variant: "secondary" as const, label: action }
      case "delete": return { variant: "destructive" as const, label: action }
      case "login": return { variant: "outline" as const, label: action }
      default: return { variant: "secondary" as const, label: action }
    }
  }

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  return (
    <div className="flex flex-col space-y-6 p-4 md:p-6 animate-in fade-in duration-500 pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Activity Logs</h1>
        </div>
      </div>

      {/* Filters & Search Section in Card */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800">
        <CardContent className="p-4 flex flex-wrap items-center gap-4">

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ID, Client, Period..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Advanced Date Filter */}
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
                  <Button variant={"outline"} className={cn("w-[200px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
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
                  <Button id="date" variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}>
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

          {/* Action Filter */}
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4 opacity-50" />
              <SelectValue placeholder="All Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="login">Login</SelectItem>
            </SelectContent>
          </Select>

          {/* Module Filter */}
          <Select value={moduleFilter} onValueChange={setModuleFilter}>
            <SelectTrigger className="w-[150px]">
              <div className="mr-2 h-4 w-4 opacity-50 flex items-center justify-center border rounded-full text-[10px]">M</div>
              <SelectValue placeholder="All Modules" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              <SelectItem value="audit">Audit & Assurance</SelectItem>
              <SelectItem value="cit">CIT</SelectItem>
              <SelectItem value="registration">Registration</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="auth">Auth</SelectItem>
            </SelectContent>
          </Select>

          {/* Branch Filter */}
          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-[150px]">
              <div className="mr-2 h-4 w-4 opacity-50 flex items-center justify-center border rounded-full text-[10px]">B</div>
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="central">Central</SelectItem>
              <SelectItem value="northeast">North East</SelectItem>
              <SelectItem value="west">West</SelectItem>
              <SelectItem value="south">South</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="rounded-md border bg-card shadow-sm flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-[15px] text-foreground">TimeStamp</TableHead>
              <TableHead className="font-bold text-[15px] text-foreground">Branch</TableHead>
              <TableHead className="font-bold text-[15px] text-foreground">User</TableHead>
              <TableHead className="font-bold text-[15px] text-foreground text-center">Action</TableHead>
              <TableHead className="font-bold text-[15px] text-foreground">Modules</TableHead>
              <TableHead className="font-bold text-[15px] text-foreground">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((log) => {
                const { variant } = getActionValues(log.action)
                return (
                  <TableRow key={log.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-xs text-muted-foreground">{log.timestamp}</TableCell>
                    <TableCell className="font-medium text-foreground">{log.branch}</TableCell>
                    <TableCell className="font-medium text-foreground">{log.user}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={variant} className="capitalize">
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground/70">{log.module}</TableCell>
                    <TableCell className="text-muted-foreground">{log.description}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No records found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & Footer */}
      <div className="flex items-center justify-between pt-2">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors">
              <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
              Learn more about Activity log
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Activity Log Guide</DialogTitle>
              <DialogDescription className="space-y-3 pt-4">
                <p>The Activity Log tracks all significant actions performed within the system.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Advanced Filters:</strong> Filter by Specific Date, Month, Year, or Period using the new date controls.</li>
                  <li><strong>Search:</strong> Use the search bar to find logs by User ID, Name, or Description.</li>
                  <li><strong>Colors:</strong> Actions are color-coded: Green (Create), Red (Delete), Gray (Update).</li>
                </ul>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Showing {totalItems > 0 ? Math.min(indexOfFirstItem + 1, totalItems) : 0}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
          </span>
          <div className="flex items-center gap-2">
            {/* Simple Pagination Buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "h-8 w-8 p-0" : "h-8 w-8 p-0 text-muted-foreground"}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
