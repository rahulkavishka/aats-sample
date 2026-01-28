import React, { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Search, Calendar as CalendarIcon, MoreHorizontal, Trash2, X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { format, isSameMonth, isSameYear, isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import type { SSCLRecord, SSCLStatus, Branch } from './SSCLPage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface SSCLTableProps {
    data: SSCLRecord[];
    selectedRows: Set<string>;
    onSelectionChange: (selectedIds: Set<string>) => void;
    onDelete: (id: string) => void;
    onBulkDelete?: () => void;
    onRowClick?: (record: SSCLRecord) => void;
}

type DateFilterType = 'All' | 'Specific' | 'Month' | 'Year' | 'Period';

const SSCLTable: React.FC<SSCLTableProps> = ({ data, selectedRows, onSelectionChange, onDelete, onBulkDelete, onRowClick }) => {
    // --- State ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filters State
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<SSCLStatus | 'All'>('All');
    const [branchFilter, setBranchFilter] = useState<Branch | 'All'>('All');

    // Date Filter State
    const [dateFilterType, setDateFilterType] = useState<DateFilterType>('All');
    const [specificDate, setSpecificDate] = useState<Date | undefined>(new Date());
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString());
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
    const [periodStart, setPeriodStart] = useState<Date | undefined>();
    const [periodEnd, setPeriodEnd] = useState<Date | undefined>();
    const [learnMoreOpen, setLearnMoreOpen] = useState(false);


    // --- Filtering Logic ---
    const filteredData = useMemo(() => {
        return data.filter((record) => {
            // 1. Search
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                record.clientName.toLowerCase().includes(searchLower) ||
                record.clientId.toLowerCase().includes(searchLower) ||
                record.ssclNo.toLowerCase().includes(searchLower);

            if (!matchesSearch) return false;

            // 2. Status
            if (statusFilter !== 'All' && record.status.toLowerCase() !== statusFilter.toLowerCase()) return false;

            // 3. Branch
            if (branchFilter !== 'All' && record.branch.toLowerCase() !== branchFilter.toLowerCase()) return false;

            // 4. Date
            const recordDate = new Date(record.date);
            if (dateFilterType === 'Specific' && specificDate) {
                if (!isSameDay(recordDate, specificDate)) return false;
            } else if (dateFilterType === 'Month') {
                // Create a date object for the selected month/year
                const filterDate = new Date(parseInt(selectedYear), parseInt(selectedMonth));
                if (!isSameMonth(recordDate, filterDate) || !isSameYear(recordDate, filterDate)) return false;
            } else if (dateFilterType === 'Year') {
                if (recordDate.getFullYear().toString() !== selectedYear) return false;
            } else if (dateFilterType === 'Period' && periodStart && periodEnd) {
                if (!isWithinInterval(recordDate, {
                    start: startOfDay(periodStart),
                    end: endOfDay(periodEnd)
                })) return false;
            }

            return true;
        });
    }, [data, searchQuery, statusFilter, branchFilter, dateFilterType, specificDate, selectedMonth, selectedYear, periodStart, periodEnd]);

    // --- Pagination Logic ---
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // --- Selection Logic ---
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = new Set(paginatedData.map((r) => r.id));
            onSelectionChange(allIds);
        } else {
            onSelectionChange(new Set());
        }
    };

    const handleSelectRow = (id: string, checked: boolean) => {
        const newSelected = new Set(selectedRows);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        onSelectionChange(newSelected);
    };

    // --- Render Helpers ---
    const StatusBadge = ({ status }: { status: string }) => {
        const s = status.toLowerCase();
        let variant: "paid" | "destructive" | "pending" | "partial" | "secondary" = "secondary";

        if (s === "paid") variant = "paid";
        else if (s === "pending") variant = "pending";
        else if (s === "ird paid" || s === "ird") variant = "partial";

        return <Badge variant={variant} className="capitalize">{status}</Badge>;
    };

    return (
        <div className="space-y-4">
            {/* --- Filter Controls --- */}
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                <CardContent className="p-4 grid gap-4 grid-cols-1 xl:grid-cols-[1fr_auto_auto]">

                    {/* 1. Search & Selection Actions Container */}
                    <div className="flex items-center gap-2 w-full">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by Name, SSCL No, or Client ID"
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Selection Actions (Inline with Search) */}
                        {selectedRows.size > 0 && (
                            <div className="flex items-center gap-2 bg-muted px-2 py-1.5 rounded-md whitespace-nowrap animate-in slide-in-from-right-2 fade-in">
                                <span className="text-xs font-medium">{selectedRows.size} selected</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/20" onClick={onBulkDelete}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onSelectionChange(new Set())}><X className="h-3 w-3" /></Button>
                            </div>
                        )}
                    </div>

                    {/* 2. Advanced Date Filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Date Filter Type Select */}
                        <Select value={dateFilterType} onValueChange={(v: DateFilterType) => {
                            setDateFilterType(v);
                            if (v === 'All') {
                                setSpecificDate(undefined);
                                setPeriodStart(undefined);
                                setPeriodEnd(undefined);
                            }
                        }}>
                            <SelectTrigger className="w-[140px]">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                    <SelectValue placeholder="Date Filter" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Dates</SelectItem>
                                <SelectItem value="Specific">Specific Date</SelectItem>
                                <SelectItem value="Month">Month</SelectItem>
                                <SelectItem value="Year">Year</SelectItem>
                                <SelectItem value="Period">Period</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Specific Date */}
                        {dateFilterType === 'Specific' && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={cn("w-[180px] justify-start text-left font-normal", !specificDate && "text-muted-foreground")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {specificDate ? format(specificDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar mode="single" selected={specificDate} onSelect={setSpecificDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        )}

                        {/* Month/Year */}
                        {dateFilterType === 'Month' && (
                            <div className="flex gap-2">
                                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <SelectItem key={i} value={i.toString()}>{format(new Date(0, i), 'MMMM')}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={selectedYear} onValueChange={setSelectedYear}>
                                    <SelectTrigger className="w-[90px]">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[2023, 2024, 2025, 2026].map(y => (
                                            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Year Only */}
                        {dateFilterType === 'Year' && (
                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Select Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[2023, 2024, 2025, 2026].map(y => (
                                        <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {/* Period Range */}
                        {dateFilterType === 'Period' && (
                            <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", (!periodStart || !periodEnd) && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {periodStart && periodEnd ? (
                                                <>{format(periodStart, "LLL dd, y")} - {format(periodEnd, "LLL dd, y")}</>
                                            ) : (
                                                <span>Pick a date range</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <div className="p-3 space-y-3">
                                            <div className="flex gap-2">
                                                <div className="space-y-1">
                                                    <span className="text-xs font-medium">Start Date</span>
                                                    <Calendar mode="single" selected={periodStart} onSelect={setPeriodStart} initialFocus />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-xs font-medium">End Date</span>
                                                    <Calendar mode="single" selected={periodEnd} onSelect={setPeriodEnd} />
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}

                        {/* Clear Button */}
                        {dateFilterType !== 'All' && (
                            <Button variant="ghost" size="icon" onClick={() => {
                                setDateFilterType('All');
                                setSpecificDate(undefined);
                                setPeriodStart(undefined);
                                setPeriodEnd(undefined);
                            }}>
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* 3. Other Filters */}
                    <div className="flex gap-2 w-full xl:w-auto overflow-x-auto p-1">
                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={(val: SSCLStatus | 'All') => setStatusFilter(val)}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="IRD Paid">IRD Paid</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Branch Filter */}
                        <Select value={branchFilter} onValueChange={(val: Branch | 'All') => setBranchFilter(val)}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Branch" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Branches</SelectItem>
                                <SelectItem value="South">South</SelectItem>
                                <SelectItem value="West">West</SelectItem>
                                <SelectItem value="Central">Central</SelectItem>
                                <SelectItem value="Northeast">Northeast</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* --- Table --- */}
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                                    onCheckedChange={(c) => handleSelectAll(!!c)}
                                />
                            </TableHead>
                            <TableHead className="font-bold text-[15px] text-foreground">ID</TableHead>
                            <TableHead className="font-bold text-[15px] text-foreground">Client Name</TableHead>
                            <TableHead className="font-bold text-[15px] text-foreground">SSCL No</TableHead>
                            <TableHead className="font-bold text-[15px] text-foreground">Tax Period</TableHead>
                            <TableHead className="font-bold text-[15px] text-foreground">Status</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                    No records found matching your filters.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((record) => (
                                <TableRow
                                    key={record.id}
                                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                                    onClick={(e) => {
                                        if ((e.target as HTMLElement).closest('button, [role="checkbox"]')) return;
                                        onRowClick?.(record);
                                    }}
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.has(record.id)}
                                            onCheckedChange={(c) => handleSelectRow(record.id, !!c)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-xs text-muted-foreground">{record.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground hover:text-primary transition-colors">{record.clientName}</span>
                                            <span className="text-xs text-muted-foreground">{record.clientId}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{record.ssclNo}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{record.taxPeriod}</span>
                                            <span className="text-xs text-muted-foreground">{format(new Date(record.date), 'MMM d, yyyy')}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell><StatusBadge status={record.status} /></TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(record.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* --- Pagination Footer --- */}
            <div className="flex items-center justify-between pt-2">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors"
                    onClick={() => setLearnMoreOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Learn more about SSCL
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Page {currentPage} of {Math.max(totalPages, 1)}</span>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Help Dialog */}
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-primary" />
                            Guide: SSCL Dashboard
                        </DialogTitle>
                        <DialogDescription>
                            Master the tools for tracking and managing Social Security Contribution Levy records.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">1</div>
                                    Advanced Filtering
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Filter by Specific Date, Month, Year, or Period. Combine with Status and Branch filters for precision.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">2</div>
                                    Bulk Actions
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Select multiple records using the checkboxes to perform bulk deletion and management tasks.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">3</div>
                                    Dynamic Records
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Quickly jump to client details or edit records directly from the table using the action menus.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">4</div>
                                    Real-time Search
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Instantly find any client by name, ID, or SSCL number using the global search bar updated in real-time.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Pro Tip</h5>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Use the "Specific Period" filter to generate custom reports for any date range required by your firm.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)}>Got it, thanks!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default SSCLTable;
