import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Pencil,
    Trash2,
    MoreHorizontal,
    UserPlus,
    Filter,
    Shield,
    User,
    Mail,
    Phone,
    Briefcase,
    Lock,
    MapPin,
    Calendar as CalendarIcon,
    HelpCircle,
    X,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay, isSameMonth, isSameYear, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";


interface TeamMember {
    id: number;
    username: string;
    email: string;
    phone: string;
    role: "Admin" | "Staff";
    branch: "South" | "West" | "Central" | "Northeast";
    createdDate: string;
}

const branches = ["South", "West", "Central", "Northeast"] as const;
const roles = ["Admin", "Staff"] as const;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => (currentYear - 5 + i).toString());

const mockMembers: TeamMember[] = [
    { id: 1, username: "Kasun Perera", email: "kasun@aats.com", role: "Admin", phone: "+94 77 123 4567", branch: "Central", createdDate: "2024-01-15" },
    { id: 2, username: "Nimali Silva", email: "nimali@aats.com", role: "Staff", phone: "+94 71 234 5678", branch: "South", createdDate: "2024-02-20" },
    { id: 3, username: "Amila Bandara", email: "amila@aats.com", role: "Staff", phone: "+94 70 345 6789", branch: "West", createdDate: "2024-03-10" },
    { id: 4, username: "Suresh Fernando", email: "suresh@aats.com", role: "Staff", phone: "+94 76 456 7890", branch: "Northeast", createdDate: "2024-04-05" },
    { id: 5, username: "Dilshan Jayasuriya", email: "dilshan@aats.com", role: "Staff", phone: "+94 78 567 8901", branch: "Central", createdDate: "2024-05-12" },
    { id: 6, username: "Chathurika De Silva", email: "chathurika@aats.com", role: "Admin", phone: "+94 71 678 9012", branch: "South", createdDate: "2024-06-18" },
    { id: 7, username: "Ruwan Kumara", email: "ruwan@aats.com", role: "Staff", phone: "+94 75 789 0123", branch: "West", createdDate: "2024-07-22" },
    { id: 8, username: "Tharindu Gamage", email: "tharindu@aats.com", role: "Staff", phone: "+94 72 890 1234", branch: "Northeast", createdDate: "2024-08-30" },
    { id: 9, username: "Nadeeka Wijesinghe", email: "nadeeka@aats.com", role: "Staff", phone: "+94 77 901 2345", branch: "Central", createdDate: "2024-09-14" },
];

export default function Team() {
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [branchFilter, setBranchFilter] = useState("all");
    const [helpOpen, setHelpOpen] = useState(false);

    // Advanced date filter state
    const [filterType, setFilterType] = useState<"none" | "date" | "month" | "year" | "period">("none");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString());
    const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const [formData, setFormData] = useState({
        id: 0,
        username: "",
        email: "",
        phone: "",
        role: "" as "Admin" | "Staff" | "",
        branch: "" as "South" | "West" | "Central" | "Northeast" | "",
        currentPassword: "",
        password: "",
        confirmPassword: ""
    });

    const location = useLocation();

    useEffect(() => {
        if (location.state && (location.state as any).openAddMember) {
            handleOpenAdd();
            window.history.replaceState({}, '');
        }
    }, [location]);

    const [members, setMembers] = useState<TeamMember[]>(mockMembers);

    const handleOpenAdd = () => {
        setIsEditMode(false);
        setFormData({ id: 0, username: "", email: "", phone: "", role: "", branch: "", currentPassword: "", password: "", confirmPassword: "" });
        setIsAddMemberOpen(true);
    };

    const handleOpenEdit = (member: TeamMember) => {
        setIsEditMode(true);
        setFormData({ ...member, currentPassword: "", password: "", confirmPassword: "" });
        setIsAddMemberOpen(true);
    };

    const handleSaveMember = () => {
        if (!formData.username || !formData.email || !formData.role || !formData.branch) return;

        if (isEditMode) {
            setMembers(members.map(m => m.id === formData.id ? {
                ...m,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                role: formData.role as "Admin" | "Staff",
                branch: formData.branch as "South" | "West" | "Central" | "Northeast"
            } : m));
        } else {
            const newMember: TeamMember = {
                id: members.length + 1,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                role: formData.role as "Admin" | "Staff",
                branch: formData.branch as "South" | "West" | "Central" | "Northeast",
                createdDate: new Date().toISOString().split('T')[0]
            };
            setMembers([...members, newMember]);
        }
        setIsAddMemberOpen(false);
    };

    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: number | null }>({
        isOpen: false,
        id: null,
    });

    const confirmDelete = () => {
        if (deleteConfirmation.id !== null) {
            setMembers(members.filter(m => m.id !== deleteConfirmation.id));
        }
        setDeleteConfirmation({ isOpen: false, id: null });
    };

    const handleDeleteMember = (id: number) => {
        setDeleteConfirmation({ isOpen: true, id });
    };

    const filteredMembers = members.filter(m => {
        const matchesSearch = m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" ? true : m.role.toLowerCase() === roleFilter.toLowerCase();
        const matchesBranch = branchFilter === "all" ? true : m.branch.toLowerCase() === branchFilter.toLowerCase();

        // Advanced date filtering
        let matchesDate = true;
        const recordDate = new Date(m.createdDate);

        if (filterType === "date" && selectedDate) {
            matchesDate = isSameDay(recordDate, selectedDate);
        } else if (filterType === "month") {
            const filterDate = new Date(parseInt(selectedYear), parseInt(selectedMonth));
            matchesDate = isSameMonth(recordDate, filterDate) && isSameYear(recordDate, filterDate);
        } else if (filterType === "year") {
            matchesDate = recordDate.getFullYear().toString() === selectedYear;
        } else if (filterType === "period" && dateRange?.from && dateRange?.to) {
            matchesDate = isWithinInterval(recordDate, {
                start: startOfDay(dateRange.from),
                end: endOfDay(dateRange.to)
            });
        }

        return matchesSearch && matchesRole && matchesBranch && matchesDate;
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMembers = filteredMembers.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, roleFilter, branchFilter, filterType, selectedDate, selectedMonth, selectedYear, dateRange]);

    const clearFilters = () => {
        setRoleFilter("all");
        setBranchFilter("all");
        setFilterType("none");
        setSelectedDate(undefined);
        setDateRange(undefined);
        setSearchQuery("");
    };

    const hasActiveFilters = roleFilter !== "all" || branchFilter !== "all" || filterType !== "none" || searchQuery !== "";

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Team Management</h2>
                </div>
                <div className="flex gap-2">

                    <Button onClick={handleOpenAdd} className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                        <UserPlus className="h-4 w-4" /> Add New Member
                    </Button>
                </div>
            </div>

            {/* FILTERS & SEARCH */}
            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-3 flex-wrap">
                        {/* Search */}
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-10 h-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Advanced Date Filter */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Select
                                value={filterType}
                                onValueChange={(val: "none" | "date" | "month" | "year" | "period") => {
                                    setFilterType(val);
                                    if (val === "none") {
                                        setSelectedDate(undefined);
                                        setDateRange(undefined);
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
                                        <Button variant="outline" className={`w-[200px] justify-start text-left font-normal ${!selectedDate && "text-muted-foreground"}`}>
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
                                        <Button variant="outline" className={`w-[240px] justify-start text-left font-normal ${!dateRange && "text-muted-foreground"}`}>
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

                            {/* Clear Date Filter */}
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

                        {/* Role Filter */}
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[150px]">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3.5 w-3.5 text-slate-400" />
                                    <SelectValue placeholder="Role" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Branch Filter */}
                        <Select value={branchFilter} onValueChange={setBranchFilter}>
                            <SelectTrigger className="w-[160px]">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                    <SelectValue placeholder="Branch" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Branches</SelectItem>
                                {branches.map(branch => (
                                    <SelectItem key={branch} value={branch.toLowerCase()}>{branch}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Clear All Filters */}
                        {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
                                <X className="h-4 w-4 mr-1" /> Clear All
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* TEAM TABLE */}
            <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                <TableHead className="pl-6">Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentMembers.length > 0 ? (
                                currentMembers.map((member) => (
                                    <TableRow key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <TableCell className="font-medium pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                                                    {member.username.charAt(0)}
                                                </div>
                                                <span className="text-slate-900 dark:text-white">{member.username}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-600 dark:text-slate-300">{member.email}</TableCell>
                                        <TableCell className="text-slate-600 dark:text-slate-300">{member.phone}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {member.branch}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={
                                                member.role === 'Admin'
                                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                                                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                                            }>
                                                {member.role === 'Admin' ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                                                {member.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-500 dark:text-slate-400 text-sm">
                                            {format(new Date(member.createdDate), "MMM dd, yyyy")}
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleOpenEdit(member)} className="cursor-pointer">
                                                        <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteMember(member.id)} className="cursor-pointer text-red-600 dark:text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete Member
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                                        No team members found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Footer / Pagination */}
            <div className="flex items-center justify-between pt-2">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors"
                    onClick={() => setHelpOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Learn more about Team
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

            {/* ADD / EDIT MEMBER DIALOG */}
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? "Edit Member Profile" : "Add New Member"}</DialogTitle>
                        <DialogDescription>
                            {isEditMode ? "Update the details for this team member." : "Create a new access profile for your team."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="John Doe"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Role & Branch */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val as "Admin" | "Staff" })}>
                                    <SelectTrigger className="pl-3">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-slate-400" />
                                            <SelectValue placeholder="Select Role" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map(role => (
                                            <SelectItem key={role} value={role}>{role}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Branch</label>
                                <Select value={formData.branch} onValueChange={(val) => setFormData({ ...formData, branch: val as "South" | "West" | "Central" | "Northeast" })}>
                                    <SelectTrigger className="pl-3">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            <SelectValue placeholder="Select Branch" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branches.map(branch => (
                                            <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                                        ))}
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
                                    placeholder="+94 77 123 4567"
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
                                    placeholder="john@aats.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Password Fields */}
                        {isEditMode ? (
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
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            type="password"
                                            placeholder="Create Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsAddMemberOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveMember} className="shadow-lg shadow-primary/20">
                            {isEditMode ? "Update Member" : "Save Member"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* DELETE CONFIRMATION DIALOG */}
            <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && setDeleteConfirmation({ isOpen: false, id: null })}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this member? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setDeleteConfirmation({ isOpen: false, id: null })}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete} className="shadow-lg shadow-rose-500/20">
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* HELP DIALOG */}
            <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Team Management Help</DialogTitle>
                        <DialogDescription>
                            Manage your organization's team members and their access levels.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-sm text-slate-500 space-y-2">
                        <p><strong>Admin</strong> - Full access to all system features and settings.</p>
                        <p><strong>Staff</strong> - Limited access based on assigned responsibilities.</p>
                        <p>Use filters to quickly find team members by role, branch, or date.</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setHelpOpen(false)}>Got it</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
