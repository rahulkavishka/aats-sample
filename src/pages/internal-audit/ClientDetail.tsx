import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Download, Printer, Edit, Trash2, CheckCircle, HelpCircle, Building2 } from "lucide-react"
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
                    <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download</Button>
                    <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">ID</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">{clientData.id}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Date</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{clientData.date}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Period</p>
                        <p className="text-xl font-bold text-primary">{clientData.period}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Option</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{clientData.paymentOption}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-100 dark:border-slate-800">
                    <CardContent className="p-4 space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</p>
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

            <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
                <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 order-2 md:order-1" onClick={() => setHelpDialogOpen(true)}>
                    <HelpCircle className="h-4 w-4" /> Learn more about Client Page
                </button>
                <div className="flex gap-2 order-1 md:order-2">
                    <Button variant="outline" size="sm" onClick={() => navigate("/internal-audit/new")}>
                        <Edit className="mr-2 h-4 w-4 text-muted-foreground" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
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
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Internal Audit Details Guide</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-2 text-sm text-muted-foreground">
                        <p>1. View core audit info in the summary cards.</p>
                        <p>2. Complete processes linearly: Reporting &rarr; Meeting Complete.</p>
                        <p>3. Use header actions to manage the record.</p>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center">System Alert</DialogTitle>
                        <DialogDescription className="text-center">{alertMessage}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center">
                        <Button onClick={() => setAlertOpen(false)}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
