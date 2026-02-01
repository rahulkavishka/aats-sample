import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, HelpCircle, FileText, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const ClientPortal = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State for form data
    const [formData, setFormData] = useState({
        clientName: '',
        companyName: '',
        phone: '',
        date: '',
        serviceType: '',
        notes: ''
    });

    // State for recent activities (dummy data initially)
    const [activities, setActivities] = useState([
        {
            id: '#1001',
            date: '2024-05-20',
            clientName: 'Alice Smith',
            company: 'Tech Solutions',
            phone: '077 123 4567',
            serviceType: 'accounting',
            notes: 'Initial consultation',
            file: null as File | null
        }
    ]);


    const [selectedActivity, setSelectedActivity] = useState<any>(null);

    const [learnMoreOpen, setLearnMoreOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const totalPages = Math.ceil(activities.length / itemsPerPage);

    // File selection state
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        // Construct keys mapping from IDs
        // ID: 'client-name' -> key: 'clientName'
        // ID: 'company-name' -> key: 'companyName'
        // ID: 'phone' -> key: 'phone'
        // ID: 'date' -> key: 'date'
        // ID: 'notes' -> key: 'notes'
        let key = id;
        if (id === 'client-name') key = 'clientName';
        if (id === 'company-name') key = 'companyName';

        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            serviceType: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation check (basic)
        if (!formData.clientName || !formData.companyName) return;

        // Phone Validation: Must have exactly 10 digits if provided
        if (formData.phone) {
            const phoneDigits = formData.phone.replace(/\D/g, '');
            if (phoneDigits.length !== 10) {
                alert("Phone number must contain exactly 10 digits (e.g., 077 123 4567).");
                return;
            }
        }

        // Create new activity
        const newActivity = {
            id: `#${1000 + activities.length + 1}`,
            date: formData.date || new Date().toISOString().split('T')[0],
            clientName: formData.clientName,
            company: formData.companyName,
            phone: formData.phone || '-',
            serviceType: formData.serviceType,
            notes: formData.notes,
            file: selectedFile
        };
        setActivities([newActivity, ...activities]);

        // Reset form
        setFormData({
            clientName: '',
            companyName: '',
            phone: '',
            date: '',
            serviceType: '',
            notes: ''
        });
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleRowClick = (activity: any) => {
        setSelectedActivity(activity);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleClearForm = () => {
        setFormData({ clientName: '', companyName: '', phone: '', date: '', serviceType: '', notes: '' });
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        // setEditingId(null); // Removed

    };

    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        Client Portal
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full max-w-5xl mx-auto space-y-8">

                {/* Form Section */}
                <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                    <CardContent className="p-8">
                        <h2 className="mb-6 text-2xl font-bold text-foreground pl-4 border-l-4 border-primary">
                            Submit a Request
                        </h2>

                        <form id="requestForm" onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="client-name">Client Name</Label>
                                    <Input
                                        id="client-name"
                                        value={formData.clientName}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        required
                                        className="bg-slate-50 dark:bg-slate-900 focus-brand"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-name">Company Name</Label>
                                    <Input
                                        id="company-name"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        placeholder="Acme Corp"
                                        required
                                        className="bg-slate-50 dark:bg-slate-900 focus-brand"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        type="tel"
                                        placeholder="077 123 4567"
                                        className="bg-slate-50 dark:bg-slate-900 focus-brand"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Preferred Date</Label>
                                    <Input
                                        id="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        type="date"
                                        className="bg-slate-50 dark:bg-slate-900 focus-brand"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="service-type">Service Type</Label>
                                <Select value={formData.serviceType} onValueChange={handleSelectChange}>
                                    <SelectTrigger className="bg-slate-50 dark:bg-slate-900 focus-brand">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="accounting">Accounting Software</SelectItem>
                                        <SelectItem value="payroll">Payroll Management</SelectItem>
                                        <SelectItem value="kot">KOT System</SelectItem>
                                        <SelectItem value="websites">Websites</SelectItem>
                                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Optional Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Tell us more about your needs..."
                                    className="bg-slate-50 dark:bg-slate-900 focus-brand"
                                />
                            </div>



                            {!selectedFile ? (
                                <div
                                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer transition-colors hover:bg-muted/50"
                                    onClick={handleBrowseClick}
                                >
                                    <p className="text-muted-foreground">
                                        Drag & Drop files here or <span className="underline font-semibold text-primary">Browse</span>
                                    </p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </div>
                            ) : (
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                                    <div className="p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold leading-none tracking-tight">Source</h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedFile(null);
                                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md border text-sm">
                                            <div className="p-2 bg-background rounded-md border shadow-sm">
                                                <FileText className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="font-medium truncate">{selectedFile.name}</span>
                                            <span className="text-xs text-muted-foreground ml-auto">
                                                {(selectedFile.size / 1024).toFixed(1)} KB
                                            </span>
                                        </div>
                                    </div>
                                    {/* Keep hidden input for re-selection if needed logic changes */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="submit"
                                    className="flex-2 w-2/3 font-bold"
                                >
                                    Submit Request
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleClearForm}
                                    variant="outline"
                                    className="flex-1 w-1/3"
                                >
                                    Clear Form
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Table Section */}
                <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                    <CardContent className="p-8">
                        <h2 className="mb-6 text-2xl font-bold text-foreground pl-4 border-l-4 border-primary">
                            Recent Activities
                        </h2>
                        <div className="rounded-md border bg-card shadow-sm flex flex-col">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-bold text-[15px] text-foreground">ID</TableHead>
                                        <TableHead className="font-bold text-[15px] text-foreground">Date</TableHead>
                                        <TableHead className="font-bold text-[15px] text-foreground">Client Name</TableHead>
                                        <TableHead className="font-bold text-[15px] text-foreground">Company</TableHead>
                                        <TableHead className="font-bold text-[15px] text-foreground">Phone</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activities.map((activity) => (
                                        <TableRow
                                            key={activity.id}
                                            className={`cursor-pointer transition-colors ${selectedActivity?.id === activity.id ? 'bg-muted border-l-4 border-primary' : 'hover:bg-muted/50'}`}
                                            onClick={() => handleRowClick(activity)}
                                        >
                                            <TableCell className="font-medium text-xs text-muted-foreground py-3">{activity.id}</TableCell>
                                            <TableCell className="whitespace-nowrap py-3">{activity.date}</TableCell>
                                            <TableCell className="font-medium py-3">
                                                <span className="font-semibold text-foreground hover:text-primary transition-colors">
                                                    {activity.clientName}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-3">{activity.company}</TableCell>
                                            <TableCell className="py-3">{activity.phone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Section */}
                <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                    <CardContent className="p-8">
                        <h2 className="mb-6 text-2xl font-bold text-foreground pl-4 border-l-4 border-primary">
                            Get in Touch
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Card className="bg-muted/50 border shadow-none">
                                <CardContent className="p-6">
                                    <strong className="block text-lg mb-1 text-foreground">WhatsApp</strong>
                                    <p className="text-muted-foreground">077 123 4567</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/50 border shadow-none">
                                <CardContent className="p-6">
                                    <strong className="block text-lg mb-1 text-foreground">Email</strong>
                                    <p className="text-muted-foreground">nexora280@gmail.com</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer / Pagination */}
            <div className="flex items-center justify-between pt-2">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors"
                    onClick={() => setLearnMoreOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Learn more about Client Portal
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-primary" />
                            Guide: Client Portal
                        </DialogTitle>
                        <DialogDescription>
                            Easily submit requests and track your service activities.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">1</div>
                                    Submit Requests
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Use the request form to submit new service requirements directly to our team.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">2</div>
                                    Track Activities
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    View your recent activity history in the table below the form.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Pro Tip</h5>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Upload detailed documents with your request to speed up the process.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)}>Got it, thanks!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Footer */}
            {/* Footer - Removed custom footer */}
            {/* Sidebar / Sheet for Details */}
            {selectedActivity && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-all duration-100 ease-out"
                        onClick={() => setSelectedActivity(null)}
                    />

                    {/* Sidebar Panel */}
                    <div className="relative w-full max-w-md h-full bg-card border-l shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h2 className="text-xl font-bold">Request Details</h2>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedActivity(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-6 flex-1 overflow-auto print-content">
                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Reference ID</span>
                                <span className="text-base font-semibold">{selectedActivity.id}</span>
                            </div>

                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Client Name</span>
                                <span className="text-base">{selectedActivity.clientName}</span>
                            </div>

                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Company Name</span>
                                <span className="text-base">{selectedActivity.company}</span>
                            </div>

                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Phone Number</span>
                                <span className="text-base">{selectedActivity.phone}</span>
                            </div>

                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Service Type</span>
                                <span className="text-base capitalize">{selectedActivity.serviceType || 'Not specified'}</span>
                            </div>

                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Submission Date</span>
                                <span className="text-base">{selectedActivity.date}</span>
                            </div>

                            <div className="grid gap-1">
                                <span className="text-sm font-medium text-muted-foreground">Notes</span>
                                <p className="text-sm text-foreground/90 whitespace-pre-wrap rounded-md bg-muted/50 p-3">
                                    {selectedActivity.notes || 'No notes provided.'}
                                </p>
                            </div>

                            {selectedActivity.file && (
                                <div className="grid gap-1">
                                    <span className="text-sm font-medium text-muted-foreground">Attached File</span>
                                    <div className="flex items-center gap-2 text-sm p-3 bg-muted/50 rounded-md">
                                        <FileText className="h-4 w-4 text-primary" />
                                        <span className="truncate">{selectedActivity.file.name}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-t pt-4">
                            <Button className="w-full gap-2" onClick={handlePrint}>
                                Print Report
                            </Button>
                        </div>
                    </div>

                    {/* Print Styles */}
                    <style>{`
                        @media print {
                            body * {
                                visibility: hidden;
                            }
                            .print-content, .print-content * {
                                visibility: visible;
                            }
                            .print-content {
                                position: fixed;
                                left: 0;
                                top: 0;
                                width: 100%;
                                padding: 20px;
                            }
                        }
                    `}</style>
                </div>
            )}
        </div >
    );
};

export default ClientPortal;
