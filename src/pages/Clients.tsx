import { useState } from 'react';
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
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Phone,
    UserPlus,
    Mail,
    User,
    Trash2,
    Briefcase,
    HelpCircle,
    X
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { mockClients, type Client } from "@/data/clients";

export default function Clients() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<Client | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [learnMoreOpen, setLearnMoreOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // Delete Confirmation State
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        id: string | null;
    }>({
        isOpen: false,
        id: null,
    });

    const [customers, setCustomers] = useState<Client[]>(mockClients);

    // --- Handlers ---
    const handleViewHistory = (customer: Client) => {
        setSelectedCustomer(customer);
        setIsDrawerOpen(true);
    };

    const handleSaveCustomer = () => {
        if (!newCustomer.name || !newCustomer.email) return;

        const newId = `CLT-${String(customers.length + 1).padStart(3, '0')}`;
        const customerToAdd: Client = {
            id: newId,
            clientName: newCustomer.name,
            email: newCustomer.email,
            phone: newCustomer.phone,
            category: "SME", // Default for new
            status: "Active",
            lastActive: new Date().toISOString().split('T')[0],
            totalRevenue: 0,
            outstandingBalance: 0
        };

        setCustomers([...customers, customerToAdd]);
        setIsAddCustomerOpen(false);
        setNewCustomer({ name: "", email: "", phone: "" }); // Reset form
    };

    const handleDeleteCustomer = (id: string) => {
        setDeleteConfirmation({ isOpen: true, id });
    };

    const confirmDelete = () => {
        if (deleteConfirmation.id !== null) {
            // Single Delete
            setCustomers(customers.filter(c => c.id !== deleteConfirmation.id));
            setIsDrawerOpen(false); // Close drawer if deleted from there
            setSelectedCustomer(null);
        } else if (selectedRows.length > 0) {
            // Bulk Delete
            setCustomers(customers.filter(c => !selectedRows.includes(c.id)));
            setSelectedRows([]);
        }
        setDeleteConfirmation({ isOpen: false, id: null });
    };

    const filteredCustomers = customers.filter(c =>
        c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleSelectAll = () => {
        if (selectedRows.length === filteredCustomers.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filteredCustomers.map(c => c.id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    // --- Pagination Logic (Main Table) ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

    return (
        <div className="space-y-6 p-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Client 360°</h2>
                </div>
                <Button onClick={() => setIsAddCustomerOpen(true)} className="shadow-lg shadow-primary/20 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01]">
                    <UserPlus className="mr-2 h-4 w-4" /> Add New Client
                </Button>
            </div>

            {/* SEARCH */}
            {/* SEARCH */}
            <div className="flex items-center p-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="flex items-center gap-2 w-full">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search clients by name or email..."
                            className="pl-10 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary h-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Selection Actions (Inline with Search) */}
                    {selectedRows.length > 0 && (
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-md whitespace-nowrap animate-in slide-in-from-right-2 fade-in border border-slate-200 dark:border-slate-700">
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{selectedRows.length} selected</span>
                            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                                onClick={() => setDeleteConfirmation({ isOpen: true, id: null })}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-slate-500 hover:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800"
                                onClick={() => setSelectedRows([])}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* CUSTOMERS TABLE */}
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 bg-slate-50 dark:bg-slate-950/50">
                                <TableHead className="w-[50px] pl-6">
                                    <Checkbox
                                        checked={selectedRows.length === filteredCustomers.length && filteredCustomers.length > 0}
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                                <TableHead className="text-slate-500 dark:text-slate-400">ID</TableHead>
                                <TableHead className="text-slate-500 dark:text-slate-400">Client</TableHead>
                                <TableHead className="text-slate-500 dark:text-slate-400">Contact</TableHead>
                                <TableHead className="text-slate-500 dark:text-slate-400">Category</TableHead>
                                <TableHead className="text-slate-500 dark:text-slate-400">Total Revenue</TableHead>
                                <TableHead className="text-slate-500 dark:text-slate-400">Status</TableHead>
                                <TableHead className="text-right text-slate-500 dark:text-slate-400 pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentCustomers.length > 0 ? (
                                currentCustomers.map((customer) => (
                                    <TableRow
                                        key={customer.id}
                                        className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                                        onClick={() => handleViewHistory(customer)}
                                    >
                                        <TableCell className="pl-6" onClick={(e) => e.stopPropagation()}>
                                            <Checkbox
                                                checked={selectedRows.includes(customer.id)}
                                                onCheckedChange={() => toggleSelect(customer.id)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-slate-500">{customer.id}</TableCell>

                                        {/* Client Name */}
                                        <TableCell className="font-medium text-slate-900 dark:text-white">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 text-xs">
                                                    {customer.clientName.charAt(0)}
                                                </div>
                                                <span>{customer.clientName}</span>
                                            </div>
                                        </TableCell>

                                        {/* Contact */}
                                        <TableCell className="text-slate-600 dark:text-slate-300">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Mail className="w-3 h-3 text-slate-400" />
                                                    {customer.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Phone className="w-3 h-3 text-slate-400" />
                                                    {customer.phone}
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Category */}
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-3 h-3 text-slate-400" />
                                                <span className="text-sm text-slate-700 dark:text-slate-300">{customer.category}</span>
                                            </div>
                                        </TableCell>

                                        {/* Revenue */}
                                        <TableCell>
                                            <span className="font-semibold text-slate-900 dark:text-white">
                                                Rs. {customer.totalRevenue.toLocaleString()}
                                            </span>
                                            {customer.outstandingBalance > 0 && (
                                                <div className="text-xs text-amber-600 dark:text-amber-500 font-medium mt-1">
                                                    Due: Rs. {customer.outstandingBalance.toLocaleString()}
                                                </div>
                                            )}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'} className={customer.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100' : ''}>
                                                {customer.status}
                                            </Badge>
                                        </TableCell>

                                        {/* Action */}
                                        <TableCell className="text-right pr-6">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-slate-400 hover:text-primary hover:bg-primary/10"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewHistory(customer);
                                                }}
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-slate-500">No clients found.</TableCell>
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
                    onClick={() => setLearnMoreOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Learn more about Clients
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

            {/* ADD NEW CUSTOMER DIALOG */}
            <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
                <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Add New Client</DialogTitle>
                        <DialogDescription>
                            Create a new client profile.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-5 py-4">

                        {/* Name Input */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-500 dark:text-slate-400 font-medium">
                                Client Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="name"
                                    placeholder="Business Name"
                                    value={newCustomer.name}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                    className="pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary h-11"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-500 dark:text-slate-400 font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="contact@business.com"
                                    value={newCustomer.email}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                    className="pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary h-11"
                                />
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-slate-500 dark:text-slate-400 font-medium">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="phone"
                                    placeholder="+94 ..."
                                    value={newCustomer.phone}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                    className="pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary h-11"
                                />
                            </div>
                        </div>

                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsAddCustomerOpen(false)} className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveCustomer} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                            Save Client
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* SIDE DRAWER (SHEET) FOR HISTORY */}
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetContent className="w-full sm:max-w-[600px] bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 overflow-y-auto">
                    {selectedCustomer && (
                        <div className="space-y-6">
                            {/* Drawer Header */}
                            <SheetHeader className="text-left mb-6">
                                <SheetTitle className="text-2xl font-bold flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 text-xl">
                                        {selectedCustomer.clientName.charAt(0)}
                                    </div>
                                    <div>
                                        <div>{selectedCustomer.clientName}</div>
                                        <div className="text-sm font-normal text-slate-500">{selectedCustomer.id}</div>
                                    </div>
                                </SheetTitle>
                            </SheetHeader>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 gap-4">
                                <Card className="bg-slate-900 dark:bg-slate-900 border-slate-800 text-white shadow-xl">
                                    <CardContent className="p-6">
                                        <div className="text-slate-400 text-sm font-medium mb-1">Total Lifetime Revenue</div>
                                        <div className="text-4xl font-bold tracking-tight">
                                            Rs. {selectedCustomer.totalRevenue.toLocaleString()}
                                        </div>

                                        {/* Remaining/Pending Amount Display */}
                                        {selectedCustomer.outstandingBalance > 0 ? (
                                            <div className="mt-2 inline-flex items-center px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                                                Due: Rs. {selectedCustomer.outstandingBalance.toLocaleString()}
                                            </div>
                                        ) : null}

                                    </CardContent>
                                </Card>

                                {/* Contact Info Card */}
                                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm relative">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 h-8 w-8"
                                        onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300 break-all" title={selectedCustomer.email}>{selectedCustomer.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{selectedCustomer.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <User className="w-4 h-4 text-primary shrink-0" />
                                            <Badge variant="secondary" className="text-xs">
                                                {selectedCustomer.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{selectedCustomer.category}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="text-center text-sm text-muted-foreground mt-8">
                                <p>Transaction history integration coming soon.</p>
                            </div>

                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* DELETE CONFIRMATION DIALOG */}
            <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && setDeleteConfirmation({ isOpen: false, id: null })}>
                <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-slate-900 dark:text-white">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-slate-500 dark:text-slate-400">
                            {deleteConfirmation.id
                                ? "Are you sure you want to delete this client? This action cannot be undone."
                                : `Are you sure you want to delete ${selectedRows.length} selected clients? This action cannot be undone.`
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="ghost"
                            onClick={() => setDeleteConfirmation({ isOpen: false, id: null })}
                            className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Help Dialog */}
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent className="max-w-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl text-slate-900 dark:text-white">
                            <HelpCircle className="h-6 w-6 text-primary" />
                            Guide: Client 360° Management
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 dark:text-slate-400">
                            Master the tools for managing your client relationships.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 space-y-2 border border-slate-200 dark:border-slate-800">
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-slate-900 dark:text-white">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">1</div>
                                    Client Profile
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    View detailed client profiles including contact info, revenue stats, and category by clicking on any row.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 space-y-2 border border-slate-200 dark:border-slate-800">
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-slate-900 dark:text-white">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">2</div>
                                    Bulk Actions
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Select multiple records using the checkboxes to perform bulk deletion (coming soon) and management tasks.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 space-y-2 border border-slate-200 dark:border-slate-800">
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-slate-900 dark:text-white">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">3</div>
                                    Transaction History
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Access full transaction history and outstanding balances directly from the side drawer.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 space-y-2 border border-slate-200 dark:border-slate-800">
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-slate-900 dark:text-white">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">4</div>
                                    Quick Search
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Instantly find any client by name or email using the search bar at the top of the list.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Pro Tip</h5>
                            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                Keeping client contact information up to date ensures seamless communication and invoice delivery.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)}>Got it, thanks!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
