import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Save, HelpCircle, Banknote, X, UploadCloud, Calendar as CalendarIcon } from "lucide-react"
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

export default function InternalControlAddRecord() {
    const navigate = useNavigate()
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [discardConfirmation, setDiscardConfirmation] = useState(false)

    // Form State
    const [id, setId] = useState("")
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [clientName, setClientName] = useState("")
    const [assignment, setAssignment] = useState("")
    const [periodNumber, setPeriodNumber] = useState("")
    const [periodType, setPeriodType] = useState("Month")
    const [notes, setNotes] = useState("")
    const [clientLogo, setClientLogo] = useState<string | null>(null)

    // Refs
    const logoInputRef = useRef<HTMLInputElement>(null)

    // Payment State
    const [subTotal, setSubTotal] = useState<number>(0)
    const [paymentOption, setPaymentOption] = useState("Cash")
    const [paymentStatus, setPaymentStatus] = useState("Unpaid")
    const [partialAmount, setPartialAmount] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)

    // Derived State
    const totalPayment = Math.max(0, subTotal - discount)
    const balance = paymentStatus === "Partial" ? Math.max(0, totalPayment - partialAmount) : (paymentStatus === "Paid" ? 0 : totalPayment)

    // Handlers
    const handleSave = () => navigate("/internal-control-outsourcing")
    const handleCancel = () => setDiscardConfirmation(true)

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

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
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
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Add Record</h1>
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
                        <legend className="px-2 text-sm font-medium">General</legend>
                        <div className="space-y-4">
                            <div className="grid grid-cols-[1fr_200px] gap-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="id">ID</Label>
                                        <Input id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="IC-XXX" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start text-left font-normal h-10">
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
                                <Input id="client" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="assignment">Assignment</Label>
                                <Textarea id="assignment" value={assignment} onChange={(e) => setAssignment(e.target.value)} placeholder="Assignment details..." className="min-h-[100px]" rows={4} />
                            </div>
                            <div className="space-y-2">
                                <Label>Period</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        className="flex-1"
                                        value={periodNumber}
                                        onChange={(e) => setPeriodNumber(e.target.value)}
                                        placeholder="Number"
                                    />
                                    <Select value={periodType} onValueChange={setPeriodType}>
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Date">Date</SelectItem>
                                            <SelectItem value="Month">Month</SelectItem>
                                            <SelectItem value="Year">Year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium">Notes (Optional)</legend>
                        <Textarea
                            placeholder="Add notes..."
                            className="min-h-[120px]"
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </fieldset>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground">Payment Summery</legend>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="subtotal">Sub Total</Label>
                                <div className="relative">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground text-sm font-bold">LKR</span>
                                    <Input id="subtotal" type="number" className="pl-12 font-semibold h-10" value={subTotal || ""} onChange={(e) => setSubTotal(Number(e.target.value))} placeholder="0.00" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label>Payment Option</Label>
                                <RadioGroup className="flex gap-4" value={paymentOption} onValueChange={setPaymentOption}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Cash" id="opt-cash" /><Label htmlFor="opt-cash">Cash</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Online" id="opt-online" /><Label htmlFor="opt-online">Online</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Cheque" id="opt-cheque" /><Label htmlFor="opt-cheque">Cheque</Label></div>
                                </RadioGroup>
                            </div>

                            {/* Issue Cheque Sub-form */}
                            {paymentOption === "Cheque" && (
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
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Paid" id="st-paid" /><Label htmlFor="st-paid">Paid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Unpaid" id="st-unpaid" /><Label htmlFor="st-unpaid">Unpaid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Partial" id="st-partial" /><Label htmlFor="st-partial">Partial</Label></div>
                                </RadioGroup>
                            </div>

                            {/* Partial Payment Logic */}
                            {paymentStatus === "Partial" && (
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

                            <div className="space-y-2">
                                <Label htmlFor="discount">Discount</Label>
                                <div className="relative">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground text-sm font-bold"></span>
                                    <Input id="discount" type="number" className="pl-12 h-10" value={discount || ""} onChange={(e) => setDiscount(Number(e.target.value))} />
                                </div>
                            </div>

                            <Separator />

                            <div className="rounded-lg bg-slate-100 dark:bg-slate-900 p-4 flex justify-between items-center">
                                <span className="font-semibold">Total Payment:</span>
                                <span className="text-xl font-bold tracking-tight">LKR {totalPayment.toFixed(2)}</span>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t flex items-center justify-between">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors"
                    onClick={() => setLearnMoreOpen(true)}
                >
                    <HelpCircle className="size-4 group-hover:text-primary transition-colors" /> Learn more about Add Record
                </button>
            </div>

            {/* Dialogs */}
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-primary" />
                            Guide: Add Internal Control Record
                        </DialogTitle>
                        <DialogDescription>
                            Follow these steps to ensure all control audit data is captured accurately.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">1</div>
                                    General Details
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Capture client identity and basic assignment details. Specify the period associated with this record.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">2</div>
                                    Assignment Specs
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Define the assignment name and process requirements for the internal control audit or outsourcing project.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">3</div>
                                    Payment Summary
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Select payment options. For cheque or partial payments, the system provides real-time balance tracking and bank detail entry.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">4</div>
                                    Review & Save
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Once all fields are verified, save the record to initialize the 'Reporting' stage of the internal control process.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Pro Tip</h5>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Use the "Partial" payment status to auto-calculate the balance due based on the sub-total and paid amount entered.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)}>Got it, thanks!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={discardConfirmation} onOpenChange={setDiscardConfirmation}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Discard Changes?</DialogTitle><DialogDescription>Are you sure you want to discard your changes? All unsaved data will be lost.</DialogDescription></DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDiscardConfirmation(false)}>Keep Editing</Button>
                        <Button variant="destructive" onClick={() => navigate("/internal-control-outsourcing")}>Discard</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
