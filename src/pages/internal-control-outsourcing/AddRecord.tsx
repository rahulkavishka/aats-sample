import { useState, useRef, useEffect } from "react"
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
                            <div className="grid grid-cols-2 gap-4">
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
                                    <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                                    <Input id="subtotal" type="number" className="pl-7 font-semibold h-10" value={subTotal || ""} onChange={(e) => setSubTotal(Number(e.target.value))} />
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

                            {paymentOption === "Cheque" && (
                                <Card className="bg-muted/30 p-4 space-y-4 border shadow-none animate-in fade-in slide-in-from-top-2 duration-300">
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">Issue Cheque</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label className="text-[11px] font-bold">Cheque Number</Label><Input placeholder="000123" className="h-9" /></div>
                                        <div className="space-y-2"><Label className="text-[11px] font-bold">Date</Label><Input type="date" className="h-9" /></div>
                                        <div className="space-y-2"><Label className="text-[11px] font-bold">Amount</Label><Input type="number" className="h-9" /></div>
                                        <div className="space-y-2">
                                            <Label className="text-[11px] font-bold">Status</Label>
                                            <Select defaultValue="Pending">
                                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                    <SelectItem value="Cleared">Cleared</SelectItem>
                                                    <SelectItem value="Return">Return</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            <div className="space-y-3">
                                <Label>Payment Status</Label>
                                <RadioGroup className="flex gap-4" value={paymentStatus} onValueChange={setPaymentStatus}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Paid" id="st-paid" /><Label htmlFor="st-paid">Paid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Unpaid" id="st-unpaid" /><Label htmlFor="st-unpaid">Unpaid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Partial" id="st-partial" /><Label htmlFor="st-partial">Partial</Label></div>
                                </RadioGroup>
                            </div>

                            {paymentStatus === "Partial" && (
                                <Card className="bg-amber-50 dark:bg-amber-900/10 p-4 border shadow-none animate-in fade-in slide-in-from-top-2 duration-300">
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500 mb-3">Partial Payment</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label className="text-[11px] font-bold">Paid Amount</Label><Input type="number" value={partialAmount || ""} onChange={(e) => setPartialAmount(Number(e.target.value))} className="h-9 bg-background" /></div>
                                        <div className="space-y-2"><Label className="text-[11px] font-bold">Remaining Amount</Label><Input value={`$${balance.toFixed(2)}`} disabled className="h-9 font-bold bg-muted/50" /></div>
                                    </div>
                                </Card>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="discount">Discount</Label>
                                <div className="relative">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground">$</span>
                                    <Input id="discount" type="number" className="pl-7 h-10" value={discount || ""} onChange={(e) => setDiscount(Number(e.target.value))} />
                                </div>
                            </div>

                            <Separator />

                            <div className="p-4 bg-slate-900 dark:bg-slate-100 rounded-lg flex justify-between items-center text-white dark:text-slate-900 shadow-inner">
                                <span className="font-bold text-sm tracking-wide">TOTAL PAYMENT</span>
                                <span className="text-2xl font-black italic tracking-tighter">${totalPayment.toFixed(2)}</span>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t flex items-center justify-between">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors italic"
                    onClick={() => setLearnMoreOpen(true)}
                >
                    <HelpCircle className="size-4 group-hover:text-primary transition-colors" /> Learn more about Add Record
                </button>
            </div>

            {/* Dialogs */}
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 italic text-primary"><HelpCircle className="h-5 w-5" /> User Guide: Add Record</DialogTitle>
                        <DialogDescription>Instructions for Internal Control Systems & Outsourcing Form</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4 text-sm text-muted-foreground">
                        <div className="bg-muted/30 p-3 rounded-lg border border-dashed">
                            <h4 className="font-bold text-foreground mb-2">General Details</h4>
                            <p>Fill in the assignment details and specify the period (Date, Month, or Year) associated with this record.</p>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg border border-dashed">
                            <h4 className="font-bold text-foreground mb-2">Payment Summery</h4>
                            <p>Select the payment option. If 'Cheque' is selected, provide the necessary details. For 'Partial' payments, the balance is auto-calculated based on the sub-total.</p>
                        </div>
                    </div>
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
