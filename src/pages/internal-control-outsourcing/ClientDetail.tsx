import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Download, Printer, Edit, Trash2, CheckCircle, HelpCircle, LayoutGrid, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const processes = ["Reporting", "Meeting Complete"]

export default function InternalControlClientDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentProcess, setCurrentProcess] = useState("")
    const [confirmProcessOpen, setConfirmProcessOpen] = useState(false)
    const [targetProcess, setTargetProcess] = useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [helpDialogOpen, setHelpDialogOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    // Mock data based on record ID
    const clientData = {
        id: id || "IC-001",
        clientName: "Alpha Manufacturing",
        date: "2024-03-10",
        paymentOption: "Online",
        paymentStatus: "Paid",
        assignment: "Full scope internal control audit for manufacturing and inventory management systems. This involves evaluating current policies, identifying gaps, and providing recommendations for process improvements to enhance operational efficiency and mitigate risks.",
    }

    const getCurrentStepIndex = () => processes.indexOf(currentProcess)

    const getProcessStatus = (step: string) => {
        const stepIndex = processes.indexOf(step)
        const currentIndex = getCurrentStepIndex()
        if (currentProcess === "") return "upcoming"
        if (step === currentProcess) return "current"
        if (stepIndex < currentIndex) return "completed"
        return "upcoming"
    }

    const handleStepClick = (step: string) => {
        const stepIndex = processes.indexOf(step)
        const currentIndex = getCurrentStepIndex()

        if (stepIndex === 0 && currentProcess === "") {
            setTargetProcess(step)
            setConfirmProcessOpen(true)
        } else if (stepIndex === currentIndex + 1) {
            setTargetProcess(step)
            setConfirmProcessOpen(true)
        } else if (stepIndex > currentIndex + 1 || (currentIndex === -1 && stepIndex > 0)) {
            setAlertMessage("Processes must be completed in order.")
            setAlertOpen(true)
        }
    }

    const confirmStep = () => {
        setCurrentProcess(targetProcess)
        setConfirmProcessOpen(false)
    }

    return (
        <div className="flex flex-col h-full space-y-6 p-4 md:p-6 animate-in slide-in-from-right-4 duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-orange-100 dark:bg-orange-950/20 flex items-center justify-center text-orange-600 shadow-sm ring-1 ring-orange-200">
                        <LayoutGrid className="size-7" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{clientData.clientName}</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-9 px-4 gap-2 border-slate-200 hover:bg-slate-50">
                        <Download className="h-4 w-4" /> Download
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 px-4 gap-2 border-slate-200 hover:bg-slate-50">
                        <Printer className="h-4 w-4" /> Print
                    </Button>
                </div>
            </div>

            {/* Core Info Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "ID & Date", value: `${clientData.id} • ${clientData.date}`, mono: true },
                    { label: "Payment Option", value: clientData.paymentOption },
                    { label: "Payment Status", value: clientData.paymentStatus, status: true }
                ].map((item, i) => (
                    <Card key={i} className="shadow-sm border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                        <CardContent className="p-4 space-y-1">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">{item.label}</p>
                            <p className={cn(
                                "text-lg font-bold tracking-tight",
                                item.mono && "font-mono text-primary",
                                !item.mono && "text-slate-900 dark:text-slate-100"
                            )}>
                                {item.value}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Assignment */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Assignment</h3>
                <Card className="bg-muted/10 border-dashed border-2">
                    <CardContent className="p-6">
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">"{clientData.assignment}"</p>
                    </CardContent>
                </Card>
            </div>

            {/* Process Stepper */}
            <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Process Workflow</h3>
                <div className="relative flex flex-row gap-x-0 overflow-x-auto py-8 px-4 bg-muted/20 rounded-2xl border-2 border-slate-100 dark:border-slate-800/50 justify-between md:justify-center">
                    {processes.map((step, idx) => {
                        const status = getProcessStatus(step)
                        return (
                            <div key={step} className="shrink basis-0 flex-1 group cursor-pointer" onClick={() => handleStepClick(step)}>
                                <div className="min-w-14 min-h-14 w-full flex items-center text-xs align-middle">
                                    <div className={cn("w-full h-[3px] flex-1 transition-colors duration-500", status === "completed" ? "bg-green-500" : "bg-slate-200 dark:bg-neutral-700", idx === 0 && "invisible")}></div>
                                    <span className={cn(
                                        "size-14 flex justify-center items-center shrink-0 font-bold rounded-full transition-all duration-300 relative z-10 mx-auto border-4",
                                        status === "completed" ? "bg-green-500 text-white border-green-200" :
                                            status === "current" ? "bg-blue-600 text-white border-blue-100 animate-pulse shadow-lg shadow-blue-200" :
                                                "bg-slate-100 text-slate-400 border-white dark:bg-neutral-800 dark:border-neutral-700"
                                    )}>
                                        {status === "completed" ? <CheckCircle className="size-7" /> : idx + 1}
                                    </span>
                                    <div className={cn("w-full h-[3px] flex-1 transition-colors duration-500", status === "completed" ? "bg-green-500" : "bg-slate-200 dark:bg-neutral-700", idx === processes.length - 1 && "invisible")}></div>
                                </div>
                                <div className="mt-4 text-center">
                                    <span className={cn("text-xs font-bold transition-all duration-300 uppercase tracking-wide", status === "upcoming" ? "text-muted-foreground opacity-50" : "text-foreground group-hover:text-primary")}>{step}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
                <button className="text-sm font-semibold text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors" onClick={() => setHelpDialogOpen(true)}>
                    <HelpCircle className="h-4.5 w-4.5" /> Learn more about Client Page
                </button>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 h-10 px-5 font-semibold" onClick={() => navigate("/internal-control-outsourcing/new")}>
                        <Edit className="h-4 w-4 text-blue-600" /> Edit Record
                    </Button>
                    <Button variant="destructive" className="gap-2 h-10 px-5 font-semibold shadow-lg shadow-destructive/20" onClick={() => setDeleteDialogOpen(true)}>
                        <Trash2 className="h-4 w-4" /> Delete Record
                    </Button>
                </div>
            </div>

            {/* Dialogs */}
            <Dialog open={confirmProcessOpen} onOpenChange={setConfirmProcessOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle className="text-xl">Mark as Complete?</DialogTitle><DialogDescription className="text-base pt-2">Are you sure you want to mark <strong>{targetProcess}</strong> as complete? This action cannot be undone.</DialogDescription></DialogHeader>
                    <DialogFooter className="gap-3 pt-4"><Button variant="outline" onClick={() => setConfirmProcessOpen(false)} className="px-6">Cancel</Button><Button onClick={confirmStep} className="px-6 shadow-md">Confirm</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle className="text-destructive text-xl">Confirm Deletion</DialogTitle><DialogDescription className="text-base pt-2">Are you sure you want to permanently delete this internal control record? This will remove all associated data.</DialogDescription></DialogHeader>
                    <DialogFooter className="gap-3 pt-4"><Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="px-6">Cancel</Button><Button variant="destructive" onClick={() => navigate("/internal-control-outsourcing")} className="px-6 shadow-md">Delete Forever</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader><DialogTitle className="text-center text-amber-600">Sequential Required</DialogTitle><DialogDescription className="text-center pt-2 text-base">{alertMessage}</DialogDescription></DialogHeader>
                    <DialogFooter className="sm:justify-center pt-4"><Button onClick={() => setAlertOpen(false)} className="px-8 shadow-sm">I Understand</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
                <DialogContent className="max-w-xl">
                    <DialogHeader><DialogTitle className="flex items-center gap-2 text-xl italic"><HelpCircle className="h-6 w-6 text-primary" /> Internal Control Guide</DialogTitle></DialogHeader>
                    <div className="py-2 text-sm text-muted-foreground space-y-4">
                        <p>Track the progress of internal control audits and outsourcing engagements through a structured workflow:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-muted/30 p-3 rounded-lg border border-dashed border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-1">1. Reporting</h4>
                                <p>Preparation and submission of the internal control report.</p>
                            </div>
                            <div className="bg-muted/30 p-3 rounded-lg border border-dashed border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-1">2. Meeting Complete</h4>
                                <p>Finalization of findings with the client via a closing meeting.</p>
                            </div>
                        </div>
                        <p className="italic bg-amber-50 p-2 rounded border border-amber-100 text-amber-800 text-[11px] font-bold">RECORDS MUST BE UPDATED IN SEQUENTIAL ORDER. UNAUTHORIZED SKIPPING IS PREVENTED.</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
