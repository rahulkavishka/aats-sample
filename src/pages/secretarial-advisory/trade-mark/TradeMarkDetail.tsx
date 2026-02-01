import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import SubModuleHeader from "@/components/secretarial-advisory/SubModuleHeader"
import { secretarialRecords } from "@/data/secretarialData"

import { HelpCircle, FileText, Download, Printer } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function TradeMarkDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const record = secretarialRecords.find(r => r.id === id) || secretarialRecords[0]
    const [helpDialogOpen, setHelpDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const documents = [
        { name: "NIC.pdf", desc: "National Identity Card" },
        { name: "BR.pdf", desc: "Business Registration" },
        { name: "R1.pdf", desc: "R1 Form" },
        { name: "ART.pdf", desc: "Articles of Association" },
        { name: "LOGO-TM.pdf", desc: "Logo or Trademark" },
        { name: "NO.pdf", desc: "Registration Document" },
        { name: "CATEGORY.pdf", desc: "Category Specification" }
    ]

    return (
        <div className="flex flex-col h-full space-y-6 p-4 md:p-6 animate-in fade-in duration-500 pb-20">
            <SubModuleHeader title="Trade Details" showNavigation={false} />

            {/* General Section */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-6 px-1 border-l-2 border-blue-500 pl-3">GENERAL</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <DetailField label="ID" value={record.id} />
                        <DetailField label="DATE" value={record.date} />
                        <DetailField label="NAME" value={record.clientName} />
                        <DetailField label="COMPANY NAME" value={record.companyName} />
                        <DetailField label="CODE" value="867958" />
                    </div>
                </div>
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 mb-2">
                <Button
                    variant="outline"
                    size="default"
                    className="bg-white dark:bg-slate-900 px-8 font-bold border-slate-300 shadow-sm hover:bg-slate-50 transition-all font-mono uppercase text-xs"
                    onClick={() => navigate(`/secretarial-advisory/trade-mark/edit/${id}`)}
                >
                    Edit
                </Button>
                <Button
                    variant="destructive"
                    size="default"
                    className="px-8 font-bold shadow-lg shadow-red-500/20 font-mono uppercase text-xs"
                    onClick={() => setDeleteDialogOpen(true)}
                >
                    Remove Record
                </Button>
            </div>

            {/* Standard Footer line and Learn More Below */}
            <div className="pt-4 pb-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 mt-auto">
                <button
                    className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-2 group transition-colors"
                    onClick={() => setHelpDialogOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    Learn more about Trade Mark Registration
                </button>
            </div>

            {/* Help Dialog */}
            <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-blue-500" />
                            Guide: Trade Mark Registration Details
                        </DialogTitle>
                        <DialogDescription>
                            How to manage trademark details and document categories.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-bold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">1</div>
                                    General Details
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Manage trademark registration codes and applicant information.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-bold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">2</div>
                                    Specialized Documents
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Support for multiple categories including Logos, TMs, and specific Registration Categories.
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
                        <Button variant="destructive" onClick={() => { setDeleteDialogOpen(false); navigate("/secretarial-advisory/trade-mark"); }}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function DetailField({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">{value || "—"}</p>
        </div>
    )
}
