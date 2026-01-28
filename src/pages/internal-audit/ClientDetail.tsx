import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Download, Printer, CheckCircle, HelpCircle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

import { internalAuditRecords } from "@/data/internal-audit/records"

const processes = ["Reporting", "Meeting Complete"]

export default function InternalAuditClientDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentProcess, setCurrentProcess] = useState("Reporting")
    const [confirmProcessOpen, setConfirmProcessOpen] = useState(false)
    const [targetProcess, setTargetProcess] = useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [helpDialogOpen, setHelpDialogOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    // Find the record or use default
    const record = internalAuditRecords.find(r => r.id === id) || internalAuditRecords[0]

    const clientData = {
        id: record.id,
        clientName: record.clientName,
        date: record.date,
        paymentOption: "Cash", // Assuming cash for mock, or could add to interface
        paymentStatus: record.paymentStatus,
        assignment: record.assignment || "Internal audit for Q1 2024. Review of financial controls and risk assessment.",
        period: record.periodNumber && record.periodType ? `${record.periodNumber} ${record.periodType}` : "N/A",
        logo: null
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm ring-1 ring-primary/20">
                        {clientData.logo ? <img src={clientData.logo} alt="" className="size-8 object-contain" /> : <Building2 className="size-7" />}
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{clientData.clientName}</h1>
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

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ID</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">{clientData.id}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{clientData.date}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Period</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{clientData.period}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Option</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{clientData.paymentOption}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Status</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{clientData.paymentStatus}</p>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Assignment</h3>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm leading-relaxed">{clientData.assignment}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center md:text-left">Process</h3>
                <ul className="relative flex flex-row gap-x-0 overflow-x-auto py-2 px-4 bg-muted/10 rounded-xl border border-dashed border-muted/50 justify-between md:justify-center">
                    {processes.map((step, idx) => {
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
                                        status === "completed" ? "bg-green-600" : "bg-gray-200",
                                        idx === processes.length - 1 && "invisible"
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
                </ul>
            </div>

            <div className="pt-8 pb-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
                <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 order-2 md:order-1" onClick={() => setHelpDialogOpen(true)}>
                    <HelpCircle className="h-4 w-4" /> Learn more about Client Page
                </button>
                <div className="flex gap-3 order-1 md:order-2">
                    <Button variant="outline" size="default" className="bg-background w-28" onClick={() => navigate("/internal-audit/new")}>
                        Edit
                    </Button>
                    <Button variant="destructive" size="default" className="w-28" onClick={() => setDeleteDialogOpen(true)}>
                        Delete
                    </Button>
                </div>
            </div>

            <Dialog open={confirmProcessOpen} onOpenChange={setConfirmProcessOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Step?</DialogTitle>
                        <DialogDescription>Mark <strong>{targetProcess}</strong> as complete?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmProcessOpen(false)}>Cancel</Button>
                        <Button onClick={confirmStep}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Record</DialogTitle>
                        <DialogDescription>Are you sure you want to delete this record?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => navigate("/internal-audit")}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
                                    Audit Summary
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Quickly view essential audit details like Assignment ID, Period, and Payment status at a glance.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">2</div>
                                    Workflow Stepper
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Follow the linear workflow processes from initial Reporting to Meeting Completion stages.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">3</div>
                                    Record Lifecycle
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Track progress indicators. Completed stages are marked in green, while upcoming ones remain in a neutral state.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">4</div>
                                    Manage Records
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Use the Edit and Delete buttons at the bottom to modify assignment details or permanently remove the client record.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Pro Tip</h5>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Completing steps in order ensures audit integrity. Detailed assignment names help in better tracking during the audit lifecycle.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setHelpDialogOpen(false)}>Got it, thanks!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader><DialogTitle className="text-center">Action Required</DialogTitle><DialogDescription className="text-center">{alertMessage}</DialogDescription></DialogHeader>
                    <DialogFooter className="sm:justify-center"><Button onClick={() => setAlertOpen(false)}>OK</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}
