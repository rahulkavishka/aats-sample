import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HelpCircle, Save, Calendar as CalendarIcon } from "lucide-react"
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

export default function ForensicAuditAddRecord() {
    const navigate = useNavigate()
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [discardConfirmation, setDiscardConfirmation] = useState(false)

    // Form State
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [periodType, setPeriodType] = useState("Month")
    const [paymentOption, setPaymentOption] = useState("cash")
    const [paymentStatus, setPaymentStatus] = useState("unpaid")
    const [subTotal, setSubTotal] = useState<number>(0)
    const [partialAmount, setPartialAmount] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)

    // Derived State
    const totalPayment = Math.max(0, subTotal - discount)
    const balance = paymentStatus === "partial" ? totalPayment - partialAmount : (paymentStatus === "paid" ? 0 : totalPayment)

    const handleSave = () => {
        navigate("/forensic-audit")
    }

    const handleCancel = () => {
        setDiscardConfirmation(true)
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20 p-4 md:p-6">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Add Record</h1>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave} className="gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01]">
                        <Save className="mr-2 h-4 w-4" />
                        Save Record
                    </Button>
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: General */}
                <div className="space-y-6">
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium">General</legend>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="id">ID</Label>
                                    <Input id="id" placeholder="ID" />
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
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="client">Client Name</Label>
                                <Input id="client" placeholder="Client Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="assignment">Assignment</Label>
                                <Textarea id="assignment" placeholder="Assignment" className="min-h-[100px]" rows={4} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="period-num">Period Number</Label>
                                    <Input id="period-num" placeholder="Number" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Period Type</Label>
                                    <Select value={periodType} onValueChange={setPeriodType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Date">Date</SelectItem>
                                            <SelectItem value="Month">Month</SelectItem>
                                            <SelectItem value="Year">Year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Textarea id="notes" placeholder="Add notes..." className="min-h-[100px]" rows={4} />
                            </div>
                        </div>
                    </fieldset>
                </div>

                {/* Right Column: Payment Summary */}
                <div className="space-y-6">
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium">Payment Summary</legend>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="subtotal">Sub Total</Label>
                                <Input id="subtotal" type="number" value={subTotal || ""} onChange={(e) => setSubTotal(Number(e.target.value))} placeholder="0.00" />
                            </div>

                            <div className="space-y-3">
                                <Label>Payment Option</Label>
                                <RadioGroup className="flex gap-4" value={paymentOption} onValueChange={setPaymentOption}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cash" id="opt-cash" />
                                        <Label htmlFor="opt-cash">Cash</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="online" id="opt-online" />
                                        <Label htmlFor="opt-online">Online</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cheque" id="opt-cheque" />
                                        <Label htmlFor="opt-cheque">Cheque</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {paymentOption === "cheque" && (
                                <Card className="bg-muted/50 p-4 space-y-4">
                                    <h4 className="font-medium text-sm">Issue Cheque</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="Cheque Number" />
                                        <Input type="date" placeholder="Date" />
                                        <Input type="number" placeholder="Amount" />
                                        <Select defaultValue="Pending">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Cleared">Cleared</SelectItem>
                                                <SelectItem value="Return">Return</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </Card>
                            )}

                            <div className="space-y-3">
                                <Label>Payment Status</Label>
                                <RadioGroup className="flex gap-4" value={paymentStatus} onValueChange={setPaymentStatus}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="paid" id="st-paid" />
                                        <Label htmlFor="st-paid">Paid</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="unpaid" id="st-unpaid" />
                                        <Label htmlFor="st-unpaid">Unpaid</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="partial" id="st-partial" />
                                        <Label htmlFor="st-partial">Partial</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {paymentStatus === "partial" && (
                                <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 p-4 grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Paid Amount</Label>
                                        <Input type="number" value={partialAmount || ""} onChange={(e) => setPartialAmount(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Balance Due</Label>
                                        <Input value={balance.toFixed(2)} disabled className="text-red-500 font-bold" />
                                    </div>
                                </Card>
                            )}

                            <div className="space-y-2">
                                <Label>Discount</Label>
                                <Input type="number" value={discount || ""} onChange={(e) => setDiscount(Number(e.target.value))} />
                            </div>

                            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg flex justify-between items-center">
                                <span className="font-semibold">Total Payment:</span>
                                <span className="text-xl font-bold">${totalPayment.toFixed(2)}</span>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>

            {/* Sticky/Fixed Footer Bar for help and actions */}
            <div className="mt-6 flex items-center justify-between">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors"
                    onClick={() => setLearnMoreOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Learn more about Add Record
                </button>
            </div>

            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-primary" />
                            Guide: Add Forensic Audit Record
                        </DialogTitle>
                        <DialogDescription>
                            Complete this form to initiate a new forensic audit file.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Ensure all assignment details are specific to the investigative nature of the audit. Payment details must be captured accurately for audit trail purposes.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={discardConfirmation} onOpenChange={setDiscardConfirmation}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Discard Changes?</DialogTitle>
                        <DialogDescription>Any unsaved data in this forensic audit record will be lost.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setDiscardConfirmation(false)}>Keep Editing</Button>
                        <Button variant="destructive" onClick={() => navigate("/forensic-audit")}>Discard</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
