import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, X, UploadCloud, FileText, HelpCircle, Save, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

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
import { Card } from "@/components/ui/card"


export default function TaxAccountAddRecord() {
    const navigate = useNavigate()
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [addDocOpen, setAddDocOpen] = useState(false)
    const [discardConfirmation, setDiscardConfirmation] = useState(false)

    // Form State
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [sourceDocs, setSourceDocs] = useState<{ name: string, description: string, date: string }[]>([])
    const [tempDocName, setTempDocName] = useState("")
    const [tempDocNotes, setTempDocNotes] = useState("")

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dialogFileInputRef = useRef<HTMLInputElement>(null)

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
                            <div className="grid grid-cols-2 gap-4">
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
                                    <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                                    <Input id="subtotal" type="number" className="pl-7 font-semibold" value={subTotal || ""} onChange={(e) => setSubTotal(Number(e.target.value))} />
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
                            {paymentOption === "cheque" && (
                                <Card className="bg-muted/50 p-4 space-y-4 border-none shadow-none">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Issue Cheque</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2 group"><Label className="text-[11px] font-bold text-muted-foreground group-focus-within:text-primary transition-colors">Bank Name</Label><Input placeholder="e.g. HDFC Bank" className="h-9" /></div>
                                        <div className="space-y-2 group"><Label className="text-[11px] font-bold text-muted-foreground group-focus-within:text-primary transition-colors">Cheque Number</Label><Input placeholder="000123" className="h-9" /></div>
                                        <div className="space-y-2 group"><Label className="text-[11px] font-bold text-muted-foreground group-focus-within:text-primary transition-colors">Date</Label><Input type="date" className="h-9" /></div>
                                        <div className="space-y-2 group">
                                            <Label className="text-[11px] font-bold text-muted-foreground group-focus-within:text-primary transition-colors">Status</Label>
                                            <Select defaultValue="Pending"><SelectTrigger className="h-9"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Cleared">Cleared</SelectItem><SelectItem value="Return">Return</SelectItem></SelectContent></Select>
                                        </div>
                                    </div>
                                </Card>
                            )}
                            <div className="space-y-3">
                                <Label>Payment Status</Label>
                                <RadioGroup className="flex gap-4" value={paymentStatus} onValueChange={setPaymentStatus}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="paid" id="st-paid" /><Label htmlFor="st-paid">Paid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="unpaid" id="st-unpaid" /><Label htmlFor="st-unpaid">Unpaid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="partial" id="st-partial" /><Label htmlFor="st-partial">Partial</Label></div>
                                </RadioGroup>
                            </div>
                            {paymentStatus === "partial" && (
                                <Card className="bg-amber-50 dark:bg-amber-900/10 p-4 border-none shadow-none">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500 mb-4">Partial Payment Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label className="text-[11px] font-bold text-muted-foreground">Paid Amount</Label><Input type="number" value={partialAmount || ""} onChange={(e) => setPartialAmount(Number(e.target.value))} className="h-9" /></div>
                                        <div className="space-y-2"><Label className="text-[11px] font-bold text-muted-foreground">Remaining Balance</Label><Input value={`$${balance.toFixed(2)}`} disabled className="h-9 text-red-600 font-bold bg-white/50" /></div>
                                    </div>
                                </Card>
                            )}
                            <div className="space-y-2"><Label>Discount</Label><Input type="number" value={discount || ""} onChange={(e) => setDiscount(Number(e.target.value))} /></div>
                            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg flex justify-between items-center"><span className="font-semibold">Total Payment:</span><span className="text-xl font-bold">${totalPayment.toFixed(2)}</span></div>
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
                <DialogContent>
                    <DialogHeader><DialogTitle>Tax Account Guide</DialogTitle></DialogHeader>
                    <div className="py-2 text-sm text-muted-foreground">
                        <p>When adding a tax record, ensure you have all relevant tax documents ready. The process follows a strict 5-stage workflow from bookkeeping to final submission.</p>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={discardConfirmation} onOpenChange={setDiscardConfirmation}><DialogContent><DialogHeader><DialogTitle>Discard Changes?</DialogTitle><DialogDescription>Unsaved changes will be lost.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setDiscardConfirmation(false)}>Keep Editing</Button><Button variant="destructive" onClick={() => navigate("/tax-account")}>Discard</Button></DialogFooter></DialogContent></Dialog>
        </div>
    )
}
