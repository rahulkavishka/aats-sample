import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import SubModuleHeader from "@/components/secretarial-advisory/SubModuleHeader"
import { secretarialRecords } from "@/data/secretarialData"

import { HelpCircle, FileText, Download, Printer, FileBadge, CalendarClock, Activity } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TradeLicenseDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const record = secretarialRecords.find(r => r.id === id) || secretarialRecords[0]
    const [helpDialogOpen, setHelpDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const documents = [
        { name: "NIC.pdf", desc: "National Identity Card" }
    ]

    return (
        <div className="flex flex-col min-h-[85vh] justify-between p-4 md:p-6 animate-in fade-in duration-500 pb-20">
            <SubModuleHeader title={record.companyName} showNavigation={false} />

            {/* Detail Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-6">
                {/* License Information Card */}
                <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                        <FileBadge className="h-4 w-4 text-blue-500" />
                        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">License Information</h3>
                    </div>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <DetailField label="License Number" value="TL-2026-8892" />
                            <DetailField label="License Category" value="General Trading & Services" />
                            <DetailField label="Issuing Authority" value="Colombo Municipal Council" />
                        </div>
                    </CardContent>
                </Card>

                {/* Validity Period Card */}
                <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                        <CalendarClock className="h-4 w-4 text-blue-500" />
                        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">Validity Period</h3>
                    </div>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <DetailField label="Issued Date" value={record.date} />
                            <DetailField label="Expiry Date" value="31/12/2026" />
                            <DetailField label="Grace Period" value="14 Days" />
                        </div>
                    </CardContent>
                </Card>

                {/* Status & Renewal Card */}
                <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden flex flex-col">
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">Status & Renewal</h3>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</p>
                                <Badge className="bg-green-500 hover:bg-green-600 text-white border-none font-bold text-[10px] px-3 py-0.5 uppercase tracking-wider">Active</Badge>
                            </div>
                            <DetailField label="Renewal Information" value="Eligible for renewal from 01/11/2026" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Source Document Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-6">
                <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest px-1 border-l-2 border-blue-500 pl-3">SOURCE DOCUMENT</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc, i) => (
                        <div key={i} className="flex items-center p-3 border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow gap-3 border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg shrink-0">
                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-sm truncate text-slate-900 dark:text-slate-100" title={doc.name}>{doc.name}</p>
                                    <p className="text-xs text-muted-foreground truncate" title={doc.desc}>{doc.desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-0.5 shrink-0 ml-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" title="Download">
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20" title="Print">
                                    <Printer className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reorganized Action row Footer */}
            <div className="pt-8 pb-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
                <button
                    className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-2 group transition-colors"
                    onClick={() => setHelpDialogOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    Learn more about Trade License Registration
                </button>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="default"
                        className="bg-white dark:bg-slate-900 w-28"
                        onClick={() => navigate(`/secretarial-advisory/trade-license/edit/${id}`)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="default"
                        className="w-28"
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            {/* Help Dialog */}
            <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-blue-500" />
                            Guide: Trade License Registration Details
                        </DialogTitle>
                        <DialogDescription>
                            How to manage trade license details and department assignments.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-bold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">1</div>
                                    Assignment Tracking
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Track which department or group (e.g., Finance) is assigned for this trade license registration.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-bold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">2</div>
                                    Essential Documents
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Manage standard registration documents including NIC, Business Registration, R1, and ART forms.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setHelpDialogOpen(false)}>Got it!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Delete Record</DialogTitle><DialogDescription>Are you sure? This cannot be undone.</DialogDescription></DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => { setDeleteDialogOpen(false); navigate("/secretarial-advisory/trade-license"); }}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function DetailField({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">{value || "—"}</p>
        </div>
    )
}
