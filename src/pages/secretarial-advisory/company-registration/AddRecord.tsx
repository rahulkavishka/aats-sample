import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, X, UploadCloud, FileText, HelpCircle, Save, Calendar as CalendarIcon, Banknote } from "lucide-react"
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
import { cn } from "@/lib/utils"

export default function AddRecord() {
    const navigate = useNavigate()
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [discardConfirmation, setDiscardConfirmation] = useState(false)

    // --- General Details ---
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [id, setId] = useState("")
    const [clientName, setClientName] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [objective, setObjective] = useState("")

    // --- Dynamic Characters ---
    const [directors, setDirectors] = useState<{ name: string }[]>([{ name: "" }])
    const [secretaries, setSecretaries] = useState<{ name: string }[]>([{ name: "" }])
    const [shareholders, setShareholders] = useState<{ name: string; share: string }[]>([{ name: "", share: "" }])
    const [others, setOthers] = useState<{ name: string; role: string }[]>([{ name: "", role: "" }])

    // --- Document Upload (NIC) ---
    const [nicDocs, setNicDocs] = useState<{ name: string, description: string, date: string }[]>([])
    const nicInputRef = useRef<HTMLInputElement>(null)

    // --- Description ---
    const [description, setDescription] = useState("")

    // --- Payment State ---
    const [subTotal, setSubTotal] = useState<number>(0)
    const [paymentOption, setPaymentOption] = useState("cash") // cash, online, cheque
    const [paymentStatus, setPaymentStatus] = useState("unpaid") // paid, unpaid, partial
    const [partialAmount, setPartialAmount] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)

    // Derived Logic
    const totalPayment = subTotal - discount
    const balance = paymentStatus === "partial" ? totalPayment - partialAmount : (paymentStatus === "paid" ? 0 : totalPayment)

    // --- Handlers: Characters ---
    const updateDirector = (index: number, value: string) => {
        const newArr = [...directors]
        newArr[index].name = value
        setDirectors(newArr)
    }
    const updateSecretary = (index: number, value: string) => {
        const newArr = [...secretaries]
        newArr[index].name = value
        setSecretaries(newArr)
    }
    const updateShareholder = (index: number, field: "name" | "share", value: string) => {
        const newArr = [...shareholders]
        newArr[index][field] = value
        setShareholders(newArr)
    }
    const updateOther = (index: number, field: "name" | "role", value: string) => {
        const newArr = [...others]
        newArr[index][field] = value
        setOthers(newArr)
    }

    // --- Handlers: NIC Upload ---
    const handleNicSelect = (file: File) => {
        if (file) {
            setNicDocs([...nicDocs, {
                name: file.name,
                description: "",
                date: new Date().toISOString().split('T')[0]
            }])
        }
    }
    const handleNicInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleNicSelect(file)
    }
    const handleNicDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files[0]
        if (file) handleNicSelect(file)
    }
    const updateNicDescription = (index: number, value: string) => {
        const newNicDocs = [...nicDocs]
        newNicDocs[index].description = value
        setNicDocs(newNicDocs)
    }
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleSave = () => {
        navigate("/secretarial-advisory/company-registration")
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20 p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Add Company Registration</h1>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" onClick={() => setDiscardConfirmation(true)}>Cancel</Button>
                    <Button onClick={handleSave} className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01]">
                        <Save className="mr-2 h-4 w-4" />
                        Save Record
                    </Button>
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* General Details */}
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground">General Details</legend>
                        <div className="space-y-4">
                            <div className="grid grid-cols-[1fr_auto] gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="id">ID</Label>
                                    <Input id="id" value={id} onChange={e => setId(e.target.value)} placeholder="Enter ID" className="bg-slate-50 dark:bg-slate-900" />
                                </div>
                                <div className="space-y-2 w-[200px]">
                                    <Label>Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
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
                                    <Label htmlFor="client">Client Name</Label>
                                    <Input id="client" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client Name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company Name</Label>
                                    <Input id="company" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Company Name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Company Address" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone No</Label>
                                    <Input id="phone" value={phoneNo} onChange={e => setPhoneNo(e.target.value)} placeholder="Phone Number" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="objective">Objective</Label>
                                <Textarea id="objective" value={objective} onChange={e => setObjective(e.target.value)} placeholder="Company Objectives..." className="min-h-[80px] resize-none" />
                            </div>
                        </div>
                    </fieldset>

                    {/* Characters Section */}
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground">Characters</legend>
                        <div className="space-y-6">
                            {/* Directors */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Directors</Label>
                                    <Button variant="ghost" size="sm" onClick={() => setDirectors([...directors, { name: "" }])} className="h-6 w-6 p-0 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800"><Plus className="h-3 w-3" /></Button>
                                </div>
                                {directors.map((d, i) => (
                                    <div key={i} className="flex gap-2">
                                        <Input placeholder="Name" value={d.name} onChange={e => updateDirector(i, e.target.value)} />
                                        {directors.length > 1 && (
                                            <Button variant="ghost" size="icon" onClick={() => setDirectors(directors.filter((_, idx) => idx !== i))} className="text-destructive hover:bg-destructive/10"><X className="h-4 w-4" /></Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            {/* Secretaries */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Secretaries</Label>
                                    <Button variant="ghost" size="sm" onClick={() => setSecretaries([...secretaries, { name: "" }])} className="h-6 w-6 p-0 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800"><Plus className="h-3 w-3" /></Button>
                                </div>
                                {secretaries.map((s, i) => (
                                    <div key={i} className="flex gap-2">
                                        <Input placeholder="Name" value={s.name} onChange={e => updateSecretary(i, e.target.value)} />
                                        {secretaries.length > 1 && (
                                            <Button variant="ghost" size="icon" onClick={() => setSecretaries(secretaries.filter((_, idx) => idx !== i))} className="text-destructive hover:bg-destructive/10"><X className="h-4 w-4" /></Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            {/* Shareholders */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Shareholders</Label>
                                    <Button variant="ghost" size="sm" onClick={() => setShareholders([...shareholders, { name: "", share: "" }])} className="h-6 w-6 p-0 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800"><Plus className="h-3 w-3" /></Button>
                                </div>
                                {shareholders.map((s, i) => (
                                    <div key={i} className="flex gap-2">
                                        <Input placeholder="Name" value={s.name} onChange={e => updateShareholder(i, "name", e.target.value)} />
                                        <Input placeholder="Share %" className="w-24" value={s.share} onChange={e => updateShareholder(i, "share", e.target.value)} />
                                        {shareholders.length > 1 && (
                                            <Button variant="ghost" size="icon" onClick={() => setShareholders(shareholders.filter((_, idx) => idx !== i))} className="text-destructive hover:bg-destructive/10"><X className="h-4 w-4" /></Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            {/* Others */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Others</Label>
                                    <Button variant="ghost" size="sm" onClick={() => setOthers([...others, { name: "", role: "" }])} className="h-6 w-6 p-0 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800"><Plus className="h-3 w-3" /></Button>
                                </div>
                                {others.map((o, i) => (
                                    <div key={i} className="flex gap-2">
                                        <Input placeholder="Name/Detail" value={o.name} onChange={e => updateOther(i, "name", e.target.value)} />
                                        <Input placeholder="Role/Note" className="w-1/3" value={o.role} onChange={e => updateOther(i, "role", e.target.value)} />
                                        {others.length > 1 && (
                                            <Button variant="ghost" size="icon" onClick={() => setOthers(others.filter((_, idx) => idx !== i))} className="text-destructive hover:bg-destructive/10"><X className="h-4 w-4" /></Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </fieldset>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* NIC Upload */}
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground">NIC Upload</legend>
                        <div className="space-y-3">
                            {nicDocs.length === 0 ? (
                                <>
                                    <input ref={nicInputRef} type="file" className="hidden" onChange={handleNicInputChange} accept=".pdf,.jpg,.png" />
                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => nicInputRef.current?.click()} onDragOver={handleDragOver} onDrop={handleNicDrop}>
                                        <UploadCloud className="h-10 w-10 mb-2" />
                                        <p className="text-sm">Drag & drop or click to upload</p>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-3">
                                    {nicDocs.map((doc, idx) => (
                                        <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-900/50 relative">
                                            <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-slate-200 hover:bg-destructive hover:text-white" onClick={() => setNicDocs(nicDocs.filter((_, i) => i !== idx))}><X className="h-3 w-3" /></Button>
                                            <div className="flex items-start gap-3 mb-2">
                                                <div className="bg-primary/10 p-2 rounded"><FileText className="h-4 w-4 text-primary" /></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm truncate">{doc.name}</p>
                                                    <p className="text-xs text-muted-foreground">{doc.date}</p>
                                                </div>
                                            </div>
                                            <Input
                                                placeholder="Add description..."
                                                value={doc.description}
                                                onChange={(e) => updateNicDescription(idx, e.target.value)}
                                                className="text-sm bg-background"
                                            />
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={() => nicInputRef.current?.click()} className="w-full"><Plus className="h-3 w-3 mr-2" /> Add Another NIC</Button>
                                    <input ref={nicInputRef} type="file" className="hidden" onChange={handleNicInputChange} accept=".pdf,.jpg,.png" />
                                </div>
                            )}
                        </div>
                    </fieldset>

                    {/* Description */}
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground">Description</legend>
                        <Textarea placeholder="Add detailed description here..." className="min-h-[150px] resize-none" value={description} onChange={e => setDescription(e.target.value)} />
                    </fieldset>

                    {/* Payment Summary */}
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground">Payment Summary</legend>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label>Sub Total</Label>
                                <div className="relative">
                                    <span className="absolute left-3 inset-y-0 flex items-center text-muted-foreground text-sm font-bold">LKR</span>
                                    <Input type="number" className="pl-12 font-semibold" placeholder="0.00" value={subTotal || ""} onChange={e => setSubTotal(Number(e.target.value))} />
                                </div>
                            </div>
                            {/* Payment Option */}
                            <div className="space-y-3">
                                <Label>Payment Option</Label>
                                <RadioGroup className="flex gap-4" value={paymentOption} onValueChange={setPaymentOption}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="cash" id="opt-cash" /><Label htmlFor="opt-cash">Cash</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="online" id="opt-online" /><Label htmlFor="opt-online">Online</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="cheque" id="opt-cheque" /><Label htmlFor="opt-cheque">Cheque</Label></div>
                                </RadioGroup>
                            </div>
                            {/* Cheque Details (if selected) */}
                            {paymentOption === "cheque" && (
                                <div className="border border-blue-100 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-900 rounded-md p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2"><Banknote className="h-5 w-5" /><h4 className="font-medium text-sm">Issue Cheque Details</h4></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label>Cheque No</Label><Input placeholder="Cheque Number" className="bg-white dark:bg-slate-950" /></div>
                                        <div className="space-y-2"><Label>Date</Label><Input type="date" className="bg-white dark:bg-slate-950" /></div>
                                        <div className="space-y-2"><Label>Amount</Label><Input type="number" className="bg-white dark:bg-slate-950" /></div>
                                        <div className="space-y-2"><Label>Status</Label><Select><SelectTrigger className="bg-white dark:bg-slate-950"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="cleared">Cleared</SelectItem><SelectItem value="return">Return</SelectItem></SelectContent></Select></div>
                                    </div>
                                </div>
                            )}
                            <Separator />
                            {/* Payment Status */}
                            <div className="space-y-3">
                                <Label>Payment Status</Label>
                                <RadioGroup className="flex gap-4" value={paymentStatus} onValueChange={setPaymentStatus}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="paid" id="st-paid" /><Label htmlFor="st-paid">Paid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="unpaid" id="st-unpaid" /><Label htmlFor="st-unpaid">Unpaid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="partial" id="st-partial" /><Label htmlFor="st-partial">Partial</Label></div>
                                </RadioGroup>
                            </div>
                            {/* Partial Logic */}
                            {paymentStatus === "partial" && (
                                <div className="border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-md p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label>Paid Amount</Label><Input type="number" value={partialAmount || ""} onChange={e => setPartialAmount(Number(e.target.value))} className="bg-white dark:bg-slate-950" /></div>
                                        <div className="space-y-2"><Label>Balance Due</Label><Input value={balance.toFixed(2)} disabled className="bg-white/50 dark:bg-slate-950 font-semibold text-red-600" /></div>
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label>Discount</Label>
                                <Input type="number" value={discount || ""} onChange={e => setDiscount(Number(e.target.value))} />
                            </div>
                            <div className="rounded-lg bg-slate-100 dark:bg-slate-900 p-4 flex justify-between items-center">
                                <span className="font-semibold">Total Payment:</span>
                                <span className="text-xl font-bold tracking-tight">LKR {totalPayment.toFixed(2)}</span>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors" onClick={() => setLearnMoreOpen(true)}>
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Learn more about Company Registration
                </button>
            </div>

            {/* Help Dialog */}
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Company Registration Help</DialogTitle>
                        <DialogDescription>Guide on how to fill Company Registration details.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2 text-sm">
                        <p><strong>Characters:</strong> Add Directors, Secretaries, and Shareholders ensuring total share percentage is accurate.</p>
                        <p><strong>NIC Upload:</strong> Valid PDF or Image formats required for National Identity Cards.</p>
                    </div>
                    <DialogFooter><Button onClick={() => setLearnMoreOpen(false)}>Got it</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Discard Dialog */}
            <Dialog open={discardConfirmation} onOpenChange={setDiscardConfirmation}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader><DialogTitle>Discard Changes?</DialogTitle><DialogDescription>Unsaved changes will be lost.</DialogDescription></DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setDiscardConfirmation(false)}>Keep Editing</Button>
                        <Button variant="destructive" onClick={() => navigate("/secretarial-advisory/company-registration")}>Discard</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
