import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Download, Printer, Edit, Trash2, CheckCircle, HelpCircle, Building2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const processes = ["Bookkeep", "Draft Account", "Finalize", "Handover"]

export default function ManagementAccountClientDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentProcess, setCurrentProcess] = useState("Bookkeep")
    const [confirmProcessOpen, setConfirmProcessOpen] = useState(false)
    const [targetProcess, setTargetProcess] = useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [helpDialogOpen, setHelpDialogOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    // Mock data based on record ID
    const clientData = {
        id: id || "MA-001",
        clientName: "Solaris Corp",
        date: "2024-01-10",
        paymentOption: "Online",
        paymentStatus: "Paid",
        assignment: "Provision of management accounts for the fiscal year 2023. Includes full bookkeeping and reconciliation.",
        sourceDocuments: [
            { id: "doc-1", name: "Bank_Statement_Jan.pdf", description: "January bank statements for reconciliation", size: "1.2MB" },
            { id: "doc-2", name: "Invoices_Q4.pdf", description: "Expense invoices from Q4 2023", size: "2.4MB" }
        ]
    }

    const getCurrentStepIndex = () => processes.indexOf(currentProcess)

    const getProcessStatus = (step: string) => {
        const stepIndex = processes.indexOf(step)
        const currentIndex = getCurrentStepIndex()
        if (step === currentProcess) return "current"
        if (stepIndex < currentIndex) return "completed"
        return "upcoming"
    }

    const handleStepClick = (step: string) => {
        const stepIndex = processes.indexOf(step)
        const currentIndex = getCurrentStepIndex()

        if (stepIndex === currentIndex + 1) {
            // Special validation for handover
            if (step === "Handover" && clientData.sourceDocuments.length === 0) {
                setAlertMessage("At least one source document must be added before completing the Handover process.")
                setAlertOpen(true)
                return
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

    return (
        <div className="flex flex-col h-full space-y-6 p-4 md:p-6 animate-in slide-in-from-right-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm ring-1 ring-primary/20">
                        <Building2 className="size-7" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{clientData.clientName}</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download</Button>
                    <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                </div>
            </div>

            {/* Core Info Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "ID", value: clientData.id, mono: true },
                    { label: "Date", value: clientData.date },
                    { label: "Payment Option", value: clientData.paymentOption },
                    { label: "Payment Status", value: clientData.paymentStatus }
                ].map((item, i) => (
                    <Card key={i} className="shadow-sm border-slate-100 dark:border-slate-800">
                        <CardContent className="p-4 space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                            <p className={cn("text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight", item.mono && "font-mono")}>{item.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Assignment */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Assignment</h3>
                <Card><CardContent className="p-4"><p className="text-sm leading-relaxed">{clientData.assignment}</p></CardContent></Card>
            </div>

            {/* Process Stepper */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center md:text-left">Process</h3>
                <ul className="relative flex flex-row gap-x-0 overflow-x-auto py-2 px-4 bg-muted/10 rounded-xl border border-dashed border-muted/50 justify-between md:justify-center">
                    {processes.map((step, idx) => {
                        const status = getProcessStatus(step)
                        return (
                            <li key={step} className="shrink basis-0 flex-1 group cursor-pointer" onClick={() => handleStepClick(step)}>
                                <div className="min-w-10 min-h-10 w-full flex items-center text-xs align-middle">
                                    <div className={cn("w-full h-px flex-1 bg-gray-200 dark:bg-neutral-700", status === "completed" ? "bg-green-600" : "bg-gray-200", idx === 0 && "invisible")}></div>
                                    <span className={cn(
                                        "size-10 flex justify-center items-center shrink-0 font-medium rounded-full transition-colors text-sm relative z-10 mx-auto",
                                        status === "completed" ? "bg-green-600 text-white" :
                                            status === "current" ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                                                "bg-gray-100 text-gray-800 dark:bg-neutral-700"
                                    )}>
                                        {status === "completed" ? <CheckCircle className="size-5" /> : idx + 1}
                                    </span>
                                    <div className={cn("w-full h-px flex-1 bg-gray-200 dark:bg-neutral-700", status === "completed" ? "bg-green-600" : "bg-gray-200", idx === processes.length - 1 && "invisible")}></div>
                                </div>
                                <div className="mt-3 text-center"><span className={cn("text-sm font-medium transition-colors", status === "upcoming" ? "text-muted-foreground" : "")}>{step}</span></div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Source Documents Section */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Source Documents</h3>
                </div>
                {clientData.sourceDocuments.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic bg-muted/20 p-6 rounded-xl border border-dashed text-center">No documents uploaded yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {clientData.sourceDocuments.map((doc) => (
                            <Card key={doc.id} className="group hover:border-primary/50 transition-colors">
                                <CardContent className="p-4 flex items-start gap-4">
                                    <div className="size-10 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0"><FileText className="size-6" /></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{doc.name}</p>
                                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{doc.description}</p>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="size-8"><Download className="size-4" /></Button>
                                        <Button variant="ghost" size="icon" className="size-8"><Printer className="size-4" /></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
                <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 order-2 md:order-1" onClick={() => setHelpDialogOpen(true)}>
                    <HelpCircle className="h-4 w-4" /> Learn more about Client Page
                </button>
                <div className="flex gap-2 order-1 md:order-2">
                    <Button variant="outline" size="sm" onClick={() => navigate("/management-account/new")}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                </div>
            </div>

            {/* Dialogs */}
            <Dialog open={confirmProcessOpen} onOpenChange={setConfirmProcessOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Complete Step?</DialogTitle><DialogDescription>Mark <strong>{targetProcess}</strong> as complete?</DialogDescription></DialogHeader>
                    <DialogFooter><Button variant="outline" onClick={() => setConfirmProcessOpen(false)}>Cancel</Button><Button onClick={confirmStep}>Confirm</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Delete Record</DialogTitle><DialogDescription>Are you sure you want to delete this management account record?</DialogDescription></DialogHeader>
                    <DialogFooter><Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button><Button variant="destructive" onClick={() => navigate("/management-account")}>Delete</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader><DialogTitle className="text-center">Action Required</DialogTitle><DialogDescription className="text-center">{alertMessage}</DialogDescription></DialogHeader>
                    <DialogFooter className="sm:justify-center"><Button onClick={() => setAlertOpen(false)}>OK</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
                <DialogContent className="max-w-xl">
                    <DialogHeader><DialogTitle>Management Account Guide</DialogTitle></DialogHeader>
                    <div className="py-2 text-sm text-muted-foreground space-y-2">
                        <p>1. Review core info and assignment.</p>
                        <p>2. Complete the 4-stage process workflow.</p>
                        <p>3. Ensure all source documents are verified before final handover.</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
