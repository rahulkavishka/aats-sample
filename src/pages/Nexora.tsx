
import { useState, useRef } from "react"
import {
    Plus, Search, Filter, Phone, Mail, Globe,
    FileText, UploadCloud, X, ChevronRight,
    Calendar as CalendarIcon
} from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// Custom Color Palette:
// #01efac (Bright Cyan) - Highlights, Active States
// #01cbae (Teal) - Primary Buttons, Accents
// #2082a6 (Blue) - Secondary Text, Borders
// #524096 (Deep Purple) - Headers, Dark Accents
// #5f2a84 (Purple) - Gradients, Backgrounds

export default function Nexora() {
    // --- State ---
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [sourceDocs, setSourceDocs] = useState<{ name: string }[]>([])
    const [selectedRow, setSelectedRow] = useState<any>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Filter State
    const [searchQuery, setSearchQuery] = useState("")

    // Mock Data for Table
    const [records] = useState([
        { id: "NEX-001", company: "TechNova Solutions", client: "John Doe", service: "Accounting Software", phone: "+94 77 XXX XXXX" },
        { id: "NEX-002", company: "GreenLeaf Estates", client: "Jane Smith", service: "Website", phone: "+94 71 XXX XXXX" },
        { id: "NEX-003", company: "Urban Cafe", client: "Mike Ross", service: "POS System", phone: "+94 76 XXX XXXX" },
        { id: "NEX-004", company: "LogiTrans Pvt Ltd", client: "Sarah Cole", service: "Payroll Management", phone: "+94 70 XXX XXXX" },
    ])

    // Mock Services
    const services = [
        "Accounting Software", "Payroll Management", "KOT System",
        "POS System", "Website", "Marketing & Digital Marketing", "Other"
    ]

    // --- Handlers ---
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setSourceDocs([...sourceDocs, { name: e.target.files[0].name }])
        }
    }

    const handleRowClick = (record: any) => {
        setSelectedRow(record)
        setIsSheetOpen(true)
    }

    // --- Render Helpers ---

    return (
        <div className="min-h-screen p-6 space-y-8 pb-20 animate-in fade-in duration-500 bg-slate-50/50 dark:bg-[#0f0718] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-[#2d1b4e]/30 dark:via-[#0f0718] dark:to-[#0f0718]">
            {/* Header */}
            {/* Header */}
            <div>
                <h1
                    className="text-3xl font-bold tracking-tight bg-clip-text text-transparent pb-1"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, #524096 0%, #5f2a84 30%, #2082a6 60%, #01cbae 100%)'
                    }}
                >
                    Nexora Dashboard
                </h1>
                <p className="text-muted-foreground mt-1 text-lg">Manage digital services and client records.</p>

            </div>

            {/* MAIN FORM SECTION */}
            <Card className="shadow-md overflow-hidden border-0 ring-1 ring-slate-200 dark:ring-[#2d1b4e] dark:bg-[#1a103c]/40 backdrop-blur-sm">
                <div
                    className="h-1.5 w-full"
                    style={{ background: 'linear-gradient(90deg, #01efac 0%, #01cbae 100%)' }}
                />
                <CardHeader className="bg-slate-50/50 dark:bg-[#2d1b4e]/20">
                    <CardTitle className="text-xl flex items-center gap-2" style={{ color: '#5f2a84' }}>
                        <div className="p-1.5 rounded-full bg-[#5f2a84]/10">
                            <Plus className="h-5 w-5" style={{ color: '#5f2a84' }} />
                        </div>
                        <span className="dark:text-[#d8b4fe]">New Request</span>
                    </CardTitle>
                    <CardDescription className="dark:text-slate-400">Enter details for a new service request.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* ID (Auto) */}
                        <div className="space-y-2">
                            <Label style={{ color: '#2082a6' }} className="dark:text-[#01cbae]">Request ID</Label>
                            <Input
                                value="NEX-AUTO-005"
                                disabled
                                className="bg-slate-100 dark:bg-[#130b29] font-mono text-muted-foreground border-slate-200 dark:border-[#2d1b4e]"
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <Label style={{ color: '#2082a6' }} className="dark:text-[#01cbae]">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal border-slate-200 dark:border-[#2d1b4e] dark:bg-[#130b29] dark:text-slate-200 focus:border-[#01cbae] transition-colors",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" style={{ color: '#01cbae' }} />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 dark:bg-[#1a103c] dark:border-[#2d1b4e]">
                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="dark:bg-[#1a103c]" />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Client Name */}
                        <div className="space-y-2">
                            <Label style={{ color: '#2082a6' }} className="dark:text-[#01cbae]">Client Name</Label>
                            <Input placeholder="Enter client name" className="focus-visible:ring-[#01cbae] dark:bg-[#130b29] dark:border-[#2d1b4e] dark:text-slate-200 dark:placeholder:text-slate-500" />
                        </div>

                        {/* Company Name */}
                        <div className="space-y-2">
                            <Label style={{ color: '#2082a6' }} className="dark:text-[#01cbae]">Company Name</Label>
                            <Input placeholder="Enter company name" className="focus-visible:ring-[#01cbae] dark:bg-[#130b29] dark:border-[#2d1b4e] dark:text-slate-200 dark:placeholder:text-slate-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Service Dropdown */}
                        <div className="space-y-2">
                            <Label style={{ color: '#2082a6' }} className="dark:text-[#01cbae]">Service Required</Label>
                            <Select>
                                <SelectTrigger className="focus:ring-[#01cbae] dark:bg-[#130b29] dark:border-[#2d1b4e] dark:text-slate-200">
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#1a103c] dark:border-[#2d1b4e]">
                                    {services.map(service => (
                                        <SelectItem key={service} value={service} className="dark:focus:bg-[#2d1b4e] dark:text-slate-200">{service}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Source Docs */}
                        <div className="space-y-2">
                            <Label style={{ color: '#2082a6' }} className="dark:text-[#01cbae]">Source Documents</Label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex-1 border-2 border-dashed rounded-md h-10 flex items-center px-3 gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-[#2d1b4e]/30 transition-colors group dark:bg-[#130b29] dark:border-[#2d1b4e]"
                                    style={{ borderColor: '#2082a6' }}
                                >
                                    <UploadCloud className="h-4 w-4 text-[#2082a6] group-hover:text-[#01cbae] transition-colors" />
                                    <span className="text-sm text-muted-foreground group-hover:text-[#2082a6] dark:group-hover:text-[#01cbae]">Upload file...</span>
                                </div>
                            </div>
                            {/* File List */}
                            {sourceDocs.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {sourceDocs.map((doc, i) => (
                                        <Badge
                                            key={i}
                                            variant="secondary"
                                            className="gap-1 pl-2 pr-1 py-1 border border-[#01cbae]/30 dark:border-[#01cbae]/50"
                                            style={{ backgroundColor: 'rgba(1, 239, 172, 0.1)', color: '#01cbae' }}
                                        >
                                            <FileText className="h-3 w-3" />
                                            {doc.name}
                                            <X
                                                className="h-3 w-3 ml-1 cursor-pointer hover:text-rose-500"
                                                onClick={() => setSourceDocs(docs => docs.filter((_, idx) => idx !== i))}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label style={{ color: '#2082a6' }} className="dark:text-[#01cbae]">Notes</Label>
                        <Textarea
                            placeholder="Add description or important notes..."
                            className="min-h-[80px] focus-visible:ring-[#01cbae] dark:bg-[#130b29] dark:border-[#2d1b4e] dark:text-slate-200 dark:placeholder:text-slate-500"
                        />
                    </div>
                </CardContent>
                <CardFooter className="bg-slate-50/50 dark:bg-[#2d1b4e]/20 p-4 flex justify-end gap-3 border-t dark:border-[#2d1b4e]">
                    <Button variant="ghost" className="hover:text-[#524096] hover:bg-[#524096]/10 dark:text-slate-300 dark:hover:text-[#d8b4fe] dark:hover:bg-[#524096]/20">Cancel</Button>
                    <Button
                        className="text-white shadow-lg hover:shadow-xl transition-all border-0"
                        style={{
                            background: 'linear-gradient(135deg, #01efac 0%, #01cbae 100%)'
                        }}
                    >
                        Submit Request
                    </Button>
                </CardFooter>
            </Card>

            {/* FILTER & TABLE SECTION */}
            <div className="space-y-4">
                {/* Filters */}
                <Card className="shadow-sm border-0 ring-1 ring-slate-200 dark:ring-[#2d1b4e] dark:bg-[#1a103c]/40 backdrop-blur-sm">
                    <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2 md:col-span-3">
                            <Label style={{ color: '#2082a6' }} className="dark:text-[#01cbae]">Search Records</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#2082a6] dark:text-[#01cbae]" />
                                <Input
                                    placeholder="Search by ID, Company or Client name..."
                                    className="pl-9 focus-visible:ring-[#01cbae] dark:bg-[#130b29] dark:border-[#2d1b4e] dark:text-slate-200 dark:placeholder:text-slate-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label style={{ color: '#2082a6' }} className="dark:text-[#01cbae]">Filter Service</Label>
                            <Select>
                                <SelectTrigger className="focus:ring-[#01cbae] dark:bg-[#130b29] dark:border-[#2d1b4e] dark:text-slate-200">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4 text-[#2082a6] dark:text-[#01cbae]" />
                                        <SelectValue placeholder="All Services" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#1a103c] dark:border-[#2d1b4e]">
                                    <SelectItem value="all" className="dark:focus:bg-[#2d1b4e] dark:text-slate-200">All Services</SelectItem>
                                    {services.map(s => <SelectItem key={s} value={s} className="dark:focus:bg-[#2d1b4e] dark:text-slate-200">{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card className="overflow-hidden border-0 shadow-md ring-1 ring-slate-200 dark:ring-[#2d1b4e] dark:bg-[#1a103c]/40 backdrop-blur-sm">
                    <div
                        className="h-1 w-full"
                        style={{ background: 'linear-gradient(90deg, #2082a6 0%, #524096 50%, #5f2a84 100%)' }}
                    />
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-[#2d1b4e]/20">
                            <TableRow>
                                <TableHead className="w-[50px] pl-6"><Checkbox /></TableHead>
                                <TableHead style={{ color: '#2082a6' }}>ID</TableHead>
                                <TableHead style={{ color: '#2082a6' }}>Company Name</TableHead>
                                <TableHead style={{ color: '#2082a6' }}>Service</TableHead>
                                <TableHead style={{ color: '#2082a6' }}>Phone</TableHead>
                                <TableHead className="text-right pr-6"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow
                                    key={record.id}
                                    className="cursor-pointer hover:bg-[#01efac]/5 dark:hover:bg-[#01efac]/10 transition-colors group dark:border-[#2d1b4e]"
                                    onClick={() => handleRowClick(record)}
                                >
                                    <TableCell className="pl-6"><Checkbox className="data-[state=checked]:bg-[#01cbae] border-slate-300 dark:border-slate-600" /></TableCell>
                                    <TableCell className="font-medium text-[#524096] dark:text-[#01efac] group-hover:text-[#5f2a84] dark:group-hover:text-[#01cbae] transition-colors">
                                        {record.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900 dark:text-slate-100">{record.company}</span>
                                            <span className="text-xs text-muted-foreground dark:text-slate-400">{record.client}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal border-[#01cbae] text-[#01cbae] bg-[#01cbae]/5 dark:bg-[#01cbae]/10">
                                            {record.service}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="dark:text-slate-300">{record.phone}</TableCell>
                                    <TableCell className="text-right pr-6">
                                        <ChevronRight className="h-4 w-4 text-muted-foreground inline-block group-hover:text-[#01cbae] transition-colors" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* CONTACT CARDS */}
            <div className="space-y-4 pt-8 border-t">
                <h3 className="text-lg font-semibold" style={{ color: '#524096' }}>Contact Us</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* WhatsApp */}
                    <Card className="hover:shadow-lg transition-all cursor-pointer group border-0 ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
                        <div className="h-1 w-full bg-[#25D366]" />
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 rounded-full bg-green-100 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-medium text-lg group-hover:text-[#25D366] transition-colors">WhatsApp</p>
                                <p className="text-sm text-muted-foreground">+94 70 XXX XXXX</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Email */}
                    <Card className="hover:shadow-lg transition-all cursor-pointer group border-0 ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
                        <div className="h-1 w-full bg-[#EA4335]" />
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 rounded-full bg-red-100 text-[#EA4335] group-hover:bg-[#EA4335] group-hover:text-white transition-colors">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-medium text-lg group-hover:text-[#EA4335] transition-colors">Email</p>
                                <p className="text-sm text-muted-foreground">nexoraswsolutions@gmail.com</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Website */}
                    <Card className="hover:shadow-lg transition-all cursor-pointer group border-0 ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
                        <div
                            className="h-1 w-full"
                            style={{ background: 'linear-gradient(90deg, #01efac 0%, #01cbae 100%)' }}
                        />
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 rounded-full bg-cyan-100 text-[#01cbae] group-hover:bg-[#01cbae] group-hover:text-white transition-colors">
                                <Globe className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-medium text-lg group-hover:text-[#01cbae] transition-colors">Website</p>
                                <p className="text-sm text-muted-foreground">www.nexorasoftwaresolutions.lk</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* SIDE DRAWER (SHEET) */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="sm:max-w-md border-l-4 dark:bg-[#1a103c] dark:border-l-[#01cbae]" style={{ borderLeftColor: '#01cbae' }}>
                    <SheetHeader>
                        <SheetTitle className="text-xl dark:text-[#d8b4fe]" style={{ color: '#524096' }}>Request Details</SheetTitle>
                        <SheetDescription className="dark:text-slate-400">
                            View full details for {selectedRow?.id}
                        </SheetDescription>
                    </SheetHeader>
                    {selectedRow && (
                        <div className="py-6 space-y-6">
                            {/* Status Badge */}


                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs text-[#2082a6] dark:text-[#01cbae]">Client Name</Label>
                                        <p className="font-medium dark:text-slate-200">{selectedRow.client}</p>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-[#2082a6] dark:text-[#01cbae]">Company</Label>
                                        <p className="font-medium dark:text-slate-200">{selectedRow.company}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs text-[#2082a6] dark:text-[#01cbae]">Service Type</Label>
                                        <div className="mt-1">
                                            <Badge variant="outline" className="font-normal border-[#01cbae] text-[#01cbae] bg-[#01cbae]/5 dark:bg-[#01cbae]/10">
                                                {selectedRow.service}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-[#2082a6] dark:text-[#01cbae]">Contact</Label>
                                        <p className="font-medium dark:text-slate-200">{selectedRow.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-xs text-[#2082a6] dark:text-[#01cbae]">Description / Notes</Label>
                                    <p className="text-sm mt-1 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#130b29] p-3 rounded-md border border-slate-100 dark:border-[#2d1b4e]">
                                        Client requested specific customization for the {selectedRow.service}. Awaiting initial deposit to proceed with the development.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}
