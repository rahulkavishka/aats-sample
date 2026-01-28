import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Download, Printer, CheckCircle, AlertCircle, FileText, HelpCircle, AlertTriangle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const processes = ["Bookkeep", "Draft Account", "Finalize", "Handover", "Return", "Submit"]

export default function ClientDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentProcess, setCurrentProcess] = useState("Bookkeep")
    const [returnReason, setReturnReason] = useState("")
    const [isReturnMode, setIsReturnMode] = useState(false) // If true, view shows history only logic

    // Dialog States
    const [confirmProcessOpen, setConfirmProcessOpen] = useState(false)
    const [targetProcess, setTargetProcess] = useState("")
    const [returnDialogOpen, setReturnDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [helpDialogOpen, setHelpDialogOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    // Mock Data (simulating fetched data)
    const clientData = {
        id: id || "REC-001",
        clientName: "Acme Corp",
        date: "2024-01-15",
        paymentOption: "Online",
        paymentStatus: "Paid",
        assignment: "Audit for FY 2023-2024. Complete verification of assets.",
        documents: [
            { name: "Invoice-JAN.pdf", desc: "January Invoices" },
            { name: "Bank-Stmt.pdf", desc: "BOC Bank Statement" }
        ],
        logo: null // Simulate uploaded logo
    }

    // Stepper Logic
    const getCurrentStepIndex = () => processes.indexOf(currentProcess)
    const getProcessStatus = (step: string) => {
        const stepIndex = processes.indexOf(step)
        const currentIndex = getCurrentStepIndex()

        if (step === currentProcess) return "current"

        // Special case for mutually exclusive final steps
        if ((step === "Return" && currentProcess === "Submit") || (step === "Submit" && currentProcess === "Return")) {
            return "upcoming"
        }

        if (stepIndex < currentIndex) return "completed"
        return "upcoming"
    }

    const handleStepClick = (step: string) => {
        const stepIndex = processes.indexOf(step)
        const currentIndex = getCurrentStepIndex()

        // Branching logic: From Handover (index 3), can go to either Return (4) or Submit (5)
        const canProceed = (currentIndex < 3 && stepIndex === currentIndex + 1) ||
            (currentIndex === 3 && (step === "Return" || step === "Submit"))

        if (canProceed) {
            // Final steps requirements
            if (step === "Return" || step === "Submit") {
                if (clientData.documents.length === 0) {
                    setAlertMessage("Cannot proceed. At least one source document is required.")
                    setAlertOpen(true)
                    return
                }
                if (step === "Return") {
                    setReturnDialogOpen(true)
                    return
                }
            }
            setTargetProcess(step)
            setConfirmProcessOpen(true)
        } else if (stepIndex > currentIndex) {
            setAlertMessage("Processes must be completed in order.")
            setAlertOpen(true)
        }
    }

    const confirmStep = () => {
        setCurrentProcess(targetProcess)
        setConfirmProcessOpen(false)
    }

    const handleReturnConfirm = () => {
        if (!returnReason) {
            setAlertMessage("Reason is required to return a record.")
            setAlertOpen(true)
            return
        }
        setIsReturnMode(true)
        setReturnDialogOpen(false)
    }

    if (isReturnMode) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                    <Button variant="outline" size="sm" onClick={() => navigate("/audit-assurance")}>Back</Button>
                    <h1 className="text-xl font-bold">Returned Record History</h1>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <div>
                                <span className="font-semibold px-2">ID:</span> {clientData.id}
                            </div>
                            <div className="text-muted-foreground">
                                {new Date().toLocaleDateString()}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-destructive flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                Returned
                            </h4>
                            <p className="text-sm"><span className="font-medium">Reason:</span> {returnReason}</p>
                            <p className="text-sm text-muted-foreground">Recorded by Admin</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full space-y-6 p-4 md:p-6 animate-in slide-in-from-right-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm ring-1 ring-primary/20">
                        {clientData.logo ? (
                            <img src={clientData.logo} alt={clientData.clientName} className="size-8 object-contain" />
                        ) : (
                            <Building2 className="size-7" />
                        )}
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{clientData.clientName}</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="download" size="default">
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button variant="print" size="default">
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ID</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">{clientData.id}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{clientData.date}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Option</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{clientData.paymentOption}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Status</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{clientData.paymentStatus}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Assignment */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Assignment</h3>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm leading-relaxed">{clientData.assignment}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Process Stepper */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center md:text-left">Process</h3>
                <ul className="relative flex flex-row gap-x-0 overflow-x-auto py-2 px-4 bg-muted/10 rounded-xl border border-dashed border-muted/50 justify-between md:justify-center">
                    {processes.filter(p => p !== "Return" && p !== "Submit").map((step, idx) => {
                        const status = getProcessStatus(step)

                        return (
                            <li key={step} className="shrink basis-0 flex-1 group cursor-pointer" onClick={() => handleStepClick(step)}>
                                <div className="min-w-10 min-h-10 w-full flex items-center text-xs align-middle">
                                    <div className={cn(
                                        "w-full h-px flex-1 bg-gray-200 dark:bg-neutral-700",
                                        status === "completed" ? "bg-green-600" : "bg-gray-200",
                                        idx === 0 && "invisible"
                                    )}></div>
                                    <span className={cn(
                                        "size-10 flex justify-center items-center shrink-0 font-medium rounded-full transition-colors text-sm relative z-10 mx-auto",
                                        status === "completed" ? "bg-green-600 text-white" :
                                            status === "current" ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/30" :
                                                "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white"
                                    )}>
                                        {status === "completed" ? <CheckCircle className="h-5 w-5" /> : idx + 1}
                                    </span>
                                    <div className={cn(
                                        "w-full h-px flex-1 bg-gray-200 dark:bg-neutral-700",
                                        status === "completed" ? "bg-green-600" : "bg-gray-200"
                                    )}></div>
                                </div>
                                <div className="mt-3 text-center">
                                    <span className={cn(
                                        "block text-sm font-medium transition-colors",
                                        status === "upcoming" ? "text-muted-foreground" : "text-gray-800 dark:text-white"
                                    )}>
                                        {step}
                                    </span>
                                </div>
                            </li>
                        )
                    })}

                    {/* Return Step */}
                    <li className="shrink basis-0 flex-1 group cursor-pointer" onClick={() => handleStepClick("Return")}>
                        <div className="min-w-10 min-h-10 w-full flex items-center text-xs align-middle">
                            <div className={cn(
                                "w-full h-px flex-1 bg-gray-200 dark:bg-neutral-700",
                                getProcessStatus("Return") === "completed" ? "bg-green-600" : "bg-gray-200"
                            )}></div>
                            <span className={cn(
                                "size-10 flex justify-center items-center shrink-0 font-medium rounded-full transition-colors mx-auto relative z-10",
                                getProcessStatus("Return") === "current" ? "bg-destructive text-destructive-foreground ring-4 ring-destructive/10" :
                                    getProcessStatus("Return") === "completed" ? "bg-green-600 text-white" :
                                        "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white"
                            )}>
                                <AlertCircle className="h-5 w-5" />
                            </span>
                            <div className={cn(
                                "w-full h-px flex-1 bg-gray-200 dark:bg-neutral-700",
                                getProcessStatus("Submit") === "completed" || getProcessStatus("Submit") === "current" ? "bg-green-600" : "bg-gray-200"
                            )}></div>
                        </div>
                        <div className="mt-3 text-center">
                            <span className={cn(
                                "block text-sm font-medium",
                                getProcessStatus("Return") === "current" ? "text-destructive" : "text-muted-foreground"
                            )}>
                                Return
                            </span>
                        </div>
                    </li>

                    {/* Submit Step */}
                    <li className="shrink basis-0 flex-1 group cursor-pointer" onClick={() => handleStepClick("Submit")}>
                        <div className="min-w-10 min-h-10 w-full flex items-center text-xs align-middle">
                            <div className={cn(
                                "w-full h-px flex-1 bg-gray-200 dark:bg-neutral-700",
                                getProcessStatus("Submit") === "completed" || getProcessStatus("Submit") === "current" ? "bg-green-600" : "bg-gray-200"
                            )}></div>
                            <span className={cn(
                                "size-10 flex justify-center items-center shrink-0 font-medium rounded-full transition-colors mx-auto relative z-10",
                                getProcessStatus("Submit") === "current" ? "bg-green-600 text-white ring-4 ring-green-100 dark:ring-green-900/30" :
                                    getProcessStatus("Submit") === "completed" ? "bg-green-600 text-white" :
                                        "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white"
                            )}>
                                <CheckCircle className="h-5 w-5" />
                            </span>
                            <div className={cn(
                                "w-full h-px flex-1 bg-gray-200 dark:bg-neutral-700 invisible"
                            )}></div>
                        </div>
                        <div className="mt-3 text-center">
                            <span className={cn(
                                "block text-sm font-medium",
                                getProcessStatus("Submit") === "current" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                            )}>
                                Submit
                            </span>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Source Documents */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Source Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clientData.documents.map((doc, i) => (
                        <div key={i} className="flex items-center p-3 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                                    <FileText className="h-5 w-5 text-primary" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-sm truncate" title={doc.name}>{doc.name}</p>
                                    <p className="text-xs text-muted-foreground truncate" title={doc.desc}>{doc.desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-0.5 shrink-0 ml-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Download">
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Print">
                                    <Printer className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-8 pb-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 order-2 md:order-1"
                    onClick={() => setHelpDialogOpen(true)}
                >
                    <HelpCircle className="h-4 w-4" />
                    Learn more about Client Page
                </button>
                <div className="flex gap-3 order-1 md:order-2">
                    <Button variant="outline" size="default" className="bg-background w-28" onClick={() => navigate("/audit-assurance/new")}>
                        Edit
                    </Button>
                    <Button variant="destructive" size="default" className="w-28" onClick={() => setDeleteDialogOpen(true)}>
                        Delete
                    </Button>
                </div>
            </div>

            {/* Process Confirmation Dialog */}
            <Dialog open={confirmProcessOpen} onOpenChange={setConfirmProcessOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Process Step?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to mark <strong>{targetProcess}</strong> as complete?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmProcessOpen(false)}>Cancel</Button>
                        <Button onClick={confirmStep}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Return Dialog */}
            <Dialog open={returnDialogOpen} onOpenChange={setReturnDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Return Record Confirmation</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for returning this record. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Textarea
                            placeholder="Enter reason for return..."
                            value={returnReason}
                            onChange={(e) => setReturnReason(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setReturnDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleReturnConfirm}>Confirm Return</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Record</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this record forever?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => { setDeleteDialogOpen(false); navigate("/audit-assurance"); }}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Help Dialog */}
            <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-primary" />
                            Guide: Managing Client Details
                        </DialogTitle>
                        <DialogDescription>
                            Everything you need to know about the Client Detail view and workflow.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">1</div>
                                    Information Cards
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Quickly view essential details like Invoice ID, Date, and Payment status at a glance.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">2</div>
                                    Process Stepper
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Follow the linear workflow. Once "Handover" is done, you can choose to "Return" for revisions or "Submit" for final approval.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">3</div>
                                    Document Handeling
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Access all attached source documents. Use the inline icons to download or print files directly from the grid.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">4</div>
                                    Record Management
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Use the Edit and Delete buttons at the bottom to modify details or permanently remove the client record.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Pro Tip</h5>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Completing steps in order ensures data integrity. If a record is "Returned", you can track its history in the specialized history view.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setHelpDialogOpen(false)}>Got it, thanks!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Alert Dialog (Replacing native alert) */}
            <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader><DialogTitle className="text-center">Action Required</DialogTitle><DialogDescription className="text-center">{alertMessage}</DialogDescription></DialogHeader>
                    <DialogFooter className="sm:justify-center"><Button onClick={() => setAlertOpen(false)}>OK</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}