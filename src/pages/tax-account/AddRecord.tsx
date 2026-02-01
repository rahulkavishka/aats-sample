import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, X, UploadCloud, FileText, HelpCircle, Save, Banknote, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"


export default function TaxAccountAddRecord() {
    const navigate = useNavigate()
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [addDocOpen, setAddDocOpen] = useState(false)
    const [discardConfirmation, setDiscardConfirmation] = useState(false)

    // Form State
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [sourceDocs, setSourceDocs] = useState<{ name: string, description: string, date: string }[]>([])
    const [clientLogo, setClientLogo] = useState<string | null>(null)
    const [tempDocName, setTempDocName] = useState("")
    const [tempDocNotes, setTempDocNotes] = useState("")

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dialogFileInputRef = useRef<HTMLInputElement>(null)
    const logoInputRef = useRef<HTMLInputElement>(null)

    // Payment State
    const [subTotal, setSubTotal] = useState<number>(0)
    const [paymentOption, setPaymentOption] = useState("cash")
    const [paymentStatus, setPaymentStatus] = useState("unpaid")
    const [partialAmount, setPartialAmount] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)

    // Derived State
    const totalPayment = Math.max(0, subTotal - discount)
    const balance = paymentStatus === "partial" ? totalPayment - partialAmount : (paymentStatus === "paid" ? 0 : totalPayment)

    // Handlers
    const handleSave = () => navigate("/tax-account")
    const handleCancel = () => setDiscardConfirmation(true)

    const handleAddDoc = () => {
        if (tempDocName) {
            setSourceDocs([...sourceDocs, { name: tempDocName, description: tempDocNotes, date: new Date().toISOString().split('T')[0] }])
            setTempDocName("")
            setTempDocNotes("")
            setAddDocOpen(false)
        }
    }

    const handleUpdateDocDescription = (index: number, description: string) => {
        const updated = [...sourceDocs]
        updated[index].description = description
        setSourceDocs(updated)
    }

    const handleFileSelect = (file: File) => {
        if (file) {
            setSourceDocs([...sourceDocs, {
                name: file.name,
                description: "",
                date: new Date().toISOString().split('T')[0]
            }])
        }
    }

    const handleDialogFileSelect = (file: File) => {
        if (file) setTempDocName(file.name)
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFileSelect(file)
    }

    const handleDialogFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleDialogFileSelect(file)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files[0]
        if (file) handleFileSelect(file)
    }

    const handleDialogDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files[0]
        if (file) handleDialogFileSelect(file)
    }

    // Logo Handlers
    const handleLogoSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setClientLogo(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleLogoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleLogoSelect(file)
    }

    const handleLogoDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files[0]
        if (file) handleLogoSelect(file)
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20 p-4 md:p-6">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Add Tax Record</h1>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave} className="gap-2 shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all duration-300">
                        <Save className="h-4 w-4" /> Save Record
                    </Button>
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium">General Details</legend>
                        <div className="space-y-4">
                            <div className="grid grid-cols-[1fr_200px] gap-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="id">ID</Label>
                                        <Input id="id" placeholder="TX-XXX" className="bg-slate-50 dark:bg-slate-900" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* Logo Upload Area */}
                                <div>
                                    <Label>Client Logo (Optional)</Label>
                                    <input
                                        ref={logoInputRef}
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleLogoInputChange}
                                    />
                                    <div
                                        className="mt-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors w-[200px] h-[120px] relative overflow-hidden"
                                        onClick={() => logoInputRef.current?.click()}
                                        onDragOver={handleDragOver}
                                        onDrop={handleLogoDrop}
                                    >
                                        {clientLogo ? (
                                            <>
                                                <img src={clientLogo} alt="Client logo" className="max-h-full max-w-full object-contain p-2" />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-destructive hover:text-destructive-foreground"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setClientLogo(null)
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </>
                                        ) : (
                                            <UploadCloud className="h-8 w-8 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="client">Client Name</Label>
                                <Input id="client" placeholder="Client Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="assignment">Assignment</Label>
                                <Textarea id="assignment" placeholder="Assigned to..." className="min-h-[100px]" rows={4} />
                            </div>
                        </div>
                    </fieldset>

                    {/* Source Documents Card */}
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground flex items-center gap-2">
                            Source Documents
                            {sourceDocs.length > 0 && (
                                <Button variant="ghost" size="sm" onClick={() => setAddDocOpen(true)} className="h-6 gap-1 px-2">
                                    <Plus className="h-3 w-3" /> Add
                                </Button>
                            )}
                        </legend>
                        <div className="space-y-3">
                            {sourceDocs.length === 0 ? (
                                <>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileInputChange}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    />
                                    <div
                                        className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                    >
                                        <UploadCloud className="h-10 w-10 mb-2" />
                                        <p className="text-sm">Drag & drop or select file</p>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-3">
                                    {sourceDocs.map((doc, idx) => (
                                        <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-900/50 relative">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-destructive hover:text-destructive-foreground"
                                                onClick={() => setSourceDocs(sourceDocs.filter((_, i) => i !== idx))}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                            <div className="flex items-start gap-3 mb-2">
                                                <div className="bg-primary/10 p-2 rounded">
                                                    <FileText className="h-4 w-4 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{doc.name}</p>
                                                    <p className="text-xs text-muted-foreground">{doc.date}</p>
                                                </div>
                                            </div>
                                            <Input
                                                placeholder="Add description..."
                                                value={doc.description}
                                                onChange={(e) => handleUpdateDocDescription(idx, e.target.value)}
                                                className="text-sm bg-background"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium">Notes (Optional)</legend>
                        <Textarea placeholder="Add overall notes..." className="min-h-[120px]" rows={4} />
                    </fieldset>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground">Payment Summary</legend>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="subtotal">Sub Total</Label>
                                <div className="relative">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground text-sm font-bold uppercase">LKR</span>
                                    <Input id="subtotal" type="number" className="pl-12 font-semibold" value={subTotal || ""} onChange={(e) => setSubTotal(Number(e.target.value))} placeholder="0.00" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label>Payment Option</Label>
                                <RadioGroup className="flex gap-4" value={paymentOption} onValueChange={setPaymentOption}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="cash" id="opt-cash" /><Label htmlFor="opt-cash">Cash</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="online" id="opt-online" /><Label htmlFor="opt-online">Online</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="cheque" id="opt-cheque" /><Label htmlFor="opt-cheque">Cheque</Label></div>
                                </RadioGroup>
                            </div>
                            {/* Issue Cheque Sub-form */}
                            {paymentOption === "cheque" && (
                                <div className="border border-blue-100 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-900 rounded-md p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
                                        <Banknote className="h-5 w-5" />
                                        <h4 className="font-medium text-sm">Issue Cheque Details</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cq-num">Cheque Number</Label>
                                            <Input id="cq-num" placeholder="Enter cheque number" className="bg-white dark:bg-slate-950" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cq-amount">Amount</Label>
                                            <Input id="cq-amount" type="number" className="bg-white dark:bg-slate-950" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cq-status">Status</Label>
                                            <Select>
                                                <SelectTrigger className="bg-white dark:bg-slate-950">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="cleared">Cleared</SelectItem>
                                                    <SelectItem value="return">Return</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="space-y-3">
                                <Label>Payment Status</Label>
                                <RadioGroup className="flex gap-4" value={paymentStatus} onValueChange={setPaymentStatus}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="paid" id="st-paid" /><Label htmlFor="st-paid">Paid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="unpaid" id="st-unpaid" /><Label htmlFor="st-unpaid">Unpaid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="partial" id="st-partial" /><Label htmlFor="st-partial">Partial</Label></div>
                                </RadioGroup>
                            </div>
                            {/* Partial Payment Logic */}
                            {paymentStatus === "partial" && (
                                <div className="border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-md p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="part-amount">Paid Amount</Label>
                                            <Input
                                                id="part-amount"
                                                type="number"
                                                value={partialAmount || ""}
                                                onChange={(e) => setPartialAmount(Number(e.target.value))}
                                                className="bg-white dark:bg-slate-950"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="balance">Balance Due</Label>
                                            <Input
                                                id="balance"
                                                value={balance.toFixed(2)}
                                                disabled
                                                className="bg-white/50 dark:bg-slate-950 font-semibold text-red-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2"><Label>Discount</Label><Input type="number" value={discount || ""} onChange={(e) => setDiscount(Number(e.target.value))} /></div>
                            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg flex justify-between items-center"><span className="font-semibold">Total Payment:</span><span className="text-xl font-bold">LKR {totalPayment.toFixed(2)}</span></div>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors" onClick={() => setLearnMoreOpen(true)}>
                    <HelpCircle className="size-4 group-hover:text-primary transition-colors" /> Learn more about Add Record
                </button>
            </div>

            {/* Add Document Popup */}
            <Dialog open={addDocOpen} onOpenChange={setAddDocOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader><DialogTitle>Add Source Document</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-4">
                        <input
                            ref={dialogFileInputRef}
                            type="file"
                            className="hidden"
                            onChange={handleDialogFileInputChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <div
                            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-12 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/30 transition-colors cursor-pointer"
                            onClick={() => dialogFileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDrop={handleDialogDrop}
                        >
                            <UploadCloud className="h-12 w-12 mb-2" />
                            <p className="text-sm">Drag & drop or select file</p>
                        </div>
                        <div className="space-y-2 text-foreground">
                            <Label htmlFor="doc-name-popup">Document Name</Label>
                            <Input id="doc-name-popup" value={tempDocName} onChange={(e) => setTempDocName(e.target.value)} placeholder="e.g. Tax Statement 2023" />
                        </div>
                        <div className="space-y-2 text-foreground">
                            <Label htmlFor="doc-notes-popup">Notes (Optional)</Label>
                            <Textarea
                                id="doc-notes-popup"
                                value={tempDocNotes}
                                onChange={(e) => setTempDocNotes(e.target.value)}
                                className="min-h-[100px] resize-none"
                                placeholder="Add notes..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAddDocOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddDoc}>Save Document</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-primary" />
                            Guide: Add Tax Record
                        </DialogTitle>
                        <DialogDescription>
                            Follow these steps to ensure all tax data is captured accurately.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">1</div>
                                    Client & Period
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Identify the client and specify the tax period (Monthly, Quarterly, or Annually) to initialize the record.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">2</div>
                                    Source Documents
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Upload all necessary tax statements, invoices, and supporting docs using the secure attachment tool.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">3</div>
                                    Payment Summary
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Define the billing details. The system supports full, partial, and cheque payments with automated balance tracking.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">4</div>
                                    Review & Save
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Verify all details are correct. Upon saving, the record will enter the 'Bookkeep' stage of the tax workflow.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Pro Tip</h5>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Ensure all uploaded documents are clearly labeled. This significantly speeds up the 'Tax Amount' calculation stage later.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)}>Got it, thanks!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={discardConfirmation} onOpenChange={setDiscardConfirmation}><DialogContent><DialogHeader><DialogTitle>Discard Changes?</DialogTitle><DialogDescription>Unsaved changes will be lost.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setDiscardConfirmation(false)}>Keep Editing</Button><Button variant="destructive" onClick={() => navigate("/tax-account")}>Discard</Button></DialogFooter></DialogContent></Dialog>
        </div>
    )
}
