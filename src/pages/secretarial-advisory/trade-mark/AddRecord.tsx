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
    const [code, setCode] = useState("")

    // --- Document Upload ---
    const [documents, setDocuments] = useState<{ name: string; type: string; description: string; date: string }[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    // --- Description & Payment State ---
    const [description, setDescription] = useState("")
    const [subTotal, setSubTotal] = useState<number>(0)
    const [paymentOption, setPaymentOption] = useState("cash")
    const [paymentStatus, setPaymentStatus] = useState("unpaid")
    const [partialAmount, setPartialAmount] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)

    // Derived Logic
    const totalPayment = subTotal - discount
    const balance = paymentStatus === "partial" ? totalPayment - partialAmount : (paymentStatus === "paid" ? 0 : totalPayment)

    // --- Document Handlers ---
    const handleFileSelect = (file: File) => {
        if (file) {
            setDocuments([...documents, {
                name: file.name,
                type: "",
                description: "",
                date: new Date().toISOString().split('T')[0]
            }])
        }
    }
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFileSelect(file)
    }
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files[0]
        if (file) handleFileSelect(file)
    }
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const updateDocument = (index: number, field: "type" | "description", value: string) => {
        const newDocs = [...documents]
        newDocs[index][field] = value
        setDocuments(newDocs)
    }

    const handleSave = () => {
        navigate("/secretarial-advisory/trade-mark")
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20 p-4 md:p-6">
            <div className="flex items-center gap-4">
                <div><h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Add Trade Mark Record</h1></div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" onClick={() => setDiscardConfirmation(true)}>Cancel</Button>
                    <Button onClick={handleSave} className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01]"><Save className="mr-2 h-4 w-4" /> Save Record</Button>
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
                            <div className="space-y-2">
                                <Label htmlFor="client">Client Name</Label>
                                <Input id="client" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input id="company" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Company Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="code">Code</Label>
                                <Input id="code" value={code} onChange={e => setCode(e.target.value)} placeholder="Trade Mark Code" />
                            </div>
                        </div>
                    </fieldset>

                    {/* Documents Section */}
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground">Documents</legend>
                        <div className="space-y-3">
                            {documents.length === 0 ? (
                                <>
                                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileInputChange} />
                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()} onDragOver={handleDragOver} onDrop={handleDrop}>
                                        <UploadCloud className="h-10 w-10 mb-2" />
                                        <p className="text-sm">Drag & drop or click to upload</p>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-3">
                                    {documents.map((doc, idx) => (
                                        <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-900/50 relative space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="bg-primary/10 p-2 rounded"><FileText className="h-4 w-4 text-primary" /></div>
                                                    <div>
                                                        <p className="font-medium text-sm truncate max-w-[200px]">{doc.name}</p>
                                                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-destructive hover:text-white" onClick={() => setDocuments(documents.filter((_, i) => i !== idx))}><X className="h-3 w-3" /></Button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Select value={doc.type} onValueChange={(val) => updateDocument(idx, "type", val)}>
                                                    <SelectTrigger className="h-8"><SelectValue placeholder="Select Type" /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="NIC">NIC</SelectItem>
                                                        <SelectItem value="BR">BR</SelectItem>
                                                        <SelectItem value="F1">F1</SelectItem>
                                                        <SelectItem value="ART">ART</SelectItem>
                                                        <SelectItem value="Logo/TM">Logo/TM</SelectItem>
                                                        <SelectItem value="No">No</SelectItem>
                                                        <SelectItem value="Category">Category</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input placeholder="Description" className="h-8" value={doc.description} onChange={e => updateDocument(idx, "description", e.target.value)} />
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="w-full"><Plus className="h-3 w-3 mr-2" /> Add Another Document</Button>
                                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileInputChange} />
                                </div>
                            )}
                        </div>
                    </fieldset>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Description */}
                    <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                        <legend className="px-2 text-sm font-medium text-foreground">Description</legend>
                        <Textarea placeholder="Add detailed description here..." className="min-h-[120px] resize-none" value={description} onChange={e => setDescription(e.target.value)} />
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
                            <div className="space-y-3">
                                <Label>Payment Option</Label>
                                <RadioGroup className="flex gap-4" value={paymentOption} onValueChange={setPaymentOption}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="cash" id="tm-cash" /><Label htmlFor="tm-cash">Cash</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="online" id="tm-online" /><Label htmlFor="tm-online">Online</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="cheque" id="tm-cheque" /><Label htmlFor="tm-cheque">Cheque</Label></div>
                                </RadioGroup>
                            </div>
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
                            <div className="space-y-3">
                                <Label>Payment Status</Label>
                                <RadioGroup className="flex gap-4" value={paymentStatus} onValueChange={setPaymentStatus}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="paid" id="tm-paid" /><Label htmlFor="tm-paid">Paid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="unpaid" id="tm-unpaid" /><Label htmlFor="tm-unpaid">Unpaid</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="partial" id="tm-partial" /><Label htmlFor="tm-partial">Partial</Label></div>
                                </RadioGroup>
                            </div>
                            {paymentStatus === "partial" && (
                                <div className="border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-md p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label>Paid Amount</Label><Input type="number" value={partialAmount || ""} onChange={e => setPartialAmount(Number(e.target.value))} className="bg-white dark:bg-slate-950" /></div>
                                        <div className="space-y-2"><Label>Balance Due</Label><Input value={balance.toFixed(2)} disabled className="bg-white/50 dark:bg-slate-950 font-semibold text-red-600" /></div>
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2"><Label>Discount</Label><Input type="number" value={discount || ""} onChange={e => setDiscount(Number(e.target.value))} /></div>
                            <div className="rounded-lg bg-slate-100 dark:bg-slate-900 p-4 flex justify-between items-center"><span className="font-semibold">Total Payment:</span><span className="text-xl font-bold tracking-tight">LKR {totalPayment.toFixed(2)}</span></div>
                        </div>
                    </fieldset>
                </div>
            </div>

            <Dialog open={discardConfirmation} onOpenChange={setDiscardConfirmation}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader><DialogTitle>Discard Changes?</DialogTitle><DialogDescription>Unsaved changes will be lost.</DialogDescription></DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setDiscardConfirmation(false)}>Keep Editing</Button>
                        <Button variant="destructive" onClick={() => navigate("/secretarial-advisory/trade-mark")}>Discard</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="mt-6 flex items-center justify-between">
                <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors" onClick={() => setLearnMoreOpen(true)}>
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Learn more about Trade Mark
                </button>
            </div>
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Trade Mark Help</DialogTitle><DialogDescription>Guide on how to fill Trade Mark details.</DialogDescription></DialogHeader>
                    <div className="py-4 space-y-2 text-sm">
                        <p><strong>Documents:</strong> Upload necessary files (NIC, BR, F1, etc.) and specify their type and description.</p>
                    </div>
                    <DialogFooter><Button onClick={() => setLearnMoreOpen(false)}>Got it</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
