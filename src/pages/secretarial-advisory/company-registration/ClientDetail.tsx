import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Building2, FileText, Download, Printer, HelpCircle, Trash2, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import PersonnelGrid from "@/components/PersonnelGrid"
import TINRegistrationDrawer from "@/components/TINRegistrationDrawer"
import type { TINData, FileData } from "@/components/TINRegistrationDrawer"
import { companyRegistrationRecords } from "@/data/secretarial-advisory/records"

interface Document {
    id: string
    name: string
    category: string
    size?: string
    url?: string
}

// Helper component for detail items
function DetailItem({ label, value, className }: { label: string; value: string; className?: string }) {
    return (
        <div className={className}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">{value || "—"}</p>
        </div>
    )
}

// Summary item for registration overview
function SummaryItem({ label, count, color }: { label: string, count: number, color: "blue" | "green" | "amber" | "red" }) {
    const colorMap = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        amber: "bg-amber-500",
        red: "bg-red-500"
    }

    return (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-blue-200 dark:hover:border-blue-900 transition-all">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{label}</span>
            <Badge className={`${colorMap[color]} text-[10px] h-5 min-w-5 flex items-center justify-center font-bold border-none`}>
                {count}
            </Badge>
        </div>
    )
}

// Document card component
function DocumentCard({ doc, onDownload, onPrint, onDelete, onView }: {
    doc: FileData & { category: string };
    onDownload: (name: string) => void;
    onPrint: (name: string) => void;
    onDelete: (id: string, category: string) => void;
    onView: (doc: any) => void;
}) {
    return (
        <div
            className="flex items-center p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50 transition-all gap-4 cursor-pointer group"
            onClick={() => onView(doc)}
        >
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 transition-colors" title={doc.name}>
                    {doc.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                    {doc.size && <span className="text-[10px] font-medium text-slate-400">{doc.size}</span>}
                </div>
            </div>
            <div className="flex gap-1 shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => onView(doc)}>
                    <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => onDownload(doc.name)}>
                    <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => onPrint(doc.name)}>
                    <Printer className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => onDelete(doc.id, doc.category)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default function SecretarialAdvisoryClientDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [tinData, setTinData] = useState<TINData | undefined>()

    // Dialog States
    const [helpDialogOpen, setHelpDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [previewDoc, setPreviewDoc] = useState<Document | null>(null)

    // Find the record by ID
    const record = companyRegistrationRecords.find((r) => r.id === id)

    if (!record) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Record Not Found</h2>
                <Button onClick={() => navigate("/secretarial-advisory")}>Back to Dashboard</Button>
            </div>
        )
    }

    // Initialize tinData from record if available
    useEffect(() => {
        if (!tinData && record.tinData) {
            setTinData(record.tinData)
        }
    }, [record, tinData])

    const handleSaveTIN = (data: TINData) => {
        setTinData(data)
        console.log("TIN Data saved:", data)
    }

    const handleDownloadDocument = (fileName: string) => console.log("Downloading:", fileName)
    const handlePrintDocument = (fileName: string) => console.log("Printing:", fileName)
    const handleDownloadAll = () => console.log("Downloading all documents")
    const handlePrintAll = () => console.log("Printing all documents")

    const handleDeleteDocument = (id: string, category: string) => {
        if (!tinData) return
        const updatedData = { ...tinData }
        switch (category) {
            case "PROCESS": updatedData.processFiles = updatedData.processFiles.filter(f => f.id !== id); break;
            case "APPROVED": updatedData.approvedFiles = updatedData.approvedFiles.filter(f => f.id !== id); break;
            case "PIN": updatedData.pinFiles = updatedData.pinFiles.filter(f => f.id !== id); break;
            case "SSID": updatedData.ssidFiles = updatedData.ssidFiles.filter(f => f.id !== id); break;
        }
        setTinData(updatedData)
    }

    const handleViewDocument = (doc: Document) => setPreviewDoc(doc)

    const allDocuments: Document[] = [
        ...tinData?.processFiles.map(f => ({ ...f, category: "PROCESS" })) || [],
        ...tinData?.approvedFiles.map(f => ({ ...f, category: "APPROVED" })) || [],
        ...tinData?.pinFiles.map(f => ({ ...f, category: "PIN" })) || [],
        ...tinData?.ssidFiles.map(f => ({ ...f, category: "SSID" })) || []
    ]

    return (
        <div className="flex flex-col h-full space-y-6 p-4 md:p-6 animate-in slide-in-from-right-4 duration-500 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-sm ring-1 ring-blue-500/20">
                        <Building2 className="size-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            {record.companyName}
                        </h1>
                    </div>
                </div>
                <div className="flex gap-2 mb-0.5">
                    <Button variant="download" onClick={handleDownloadAll}>
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button variant="print" onClick={handlePrintAll}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                </div>
            </div>

            {/* Consolidated Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Left Side: Information */}
                <div className="space-y-4">
                    {/* ID and Date Cards Side-by-Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
                            <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Record Identifier</p>
                            </div>
                            <CardContent className="p-4">
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight font-mono">{record.id}</p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
                            <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Registration Date</p>
                            </div>
                            <CardContent className="p-4">
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{record.date}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Registration Details */}
                    <div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                            <Building2 className="size-5 text-blue-500" />
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">Registration Details</h3>
                        </div>
                        <Card className="shadow-sm border-slate-200 dark:border-slate-800 border-t-0 rounded-t-none">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                                    <DetailItem label="Company Name" value={record.companyName} />
                                    <DetailItem label="Type" value={record.type || "—"} />
                                    <DetailItem label="Address" value={record.address || "—"} className="md:col-span-2" />
                                    <DetailItem label="Email" value={record.email || "—"} />
                                    <DetailItem label="Phone No" value={record.phoneNo || "—"} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Personnel */}
                    <div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                            <Building2 className="size-5 text-blue-500" />
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">Personnel</h3>
                        </div>
                        <PersonnelGrid directors={record.directors} secretary={record.secretary} directors2={record.directors2} other={record.other} />
                    </div>

                    {/* NIC Documents */}
                    <div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                            <FileText className="size-5 text-blue-500" />
                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">Uploaded NIC Documents</h3>
                        </div>
                        <Card className="shadow-sm border-slate-200 dark:border-slate-800 border-t-0 rounded-t-none">
                            <CardContent className="p-4">
                                {(record.nicFiles?.length ?? 0) > 0 ? (
                                    <div className="grid grid-cols-1 gap-2">
                                        {record.nicFiles!.map((doc) => (
                                            <div key={doc.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                                                    <span className="text-xs font-medium truncate">{doc.name}</span>
                                                </div>
                                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleViewDocument({ ...doc, category: 'NIC' })}>
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 py-4 text-center">No NIC documents uploaded.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Side: TIN Registration (Brought Up and Right) */}
                <Card className="lg:min-h-full border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-950 overflow-hidden flex flex-col">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="size-5 text-blue-500" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">TIN Registration</h3>
                        </div>
                        <Button onClick={() => setIsDrawerOpen(true)} className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01] text-base">
                            <Plus className="h-4 w-4" /> Registration
                        </Button>
                    </div>
                    <CardContent className="p-6 space-y-6 flex-1">
                        <Tabs defaultValue="PROCESS" className="w-full">
                            <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6 flex overflow-x-auto h-auto w-full justify-between items-stretch border border-slate-200">
                                {["PROCESS", "APPROVED", "PIN", "SSID"].map(cat => (
                                    <TabsTrigger key={cat} value={cat} className="flex-1 rounded-lg px-2 py-2 font-bold uppercase text-[10px] tracking-wider">
                                        {cat}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {["PROCESS", "APPROVED", "PIN", "SSID"].map((category) => {
                                const categoryDesc = tinData?.description;
                                const categoryFiles = allDocuments.filter(d => d.category === category);
                                return (
                                    <TabsContent key={category} value={category} className="mt-0 space-y-5">
                                        {categoryDesc && (
                                            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100">
                                                <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Notes</p>
                                                <p className="text-sm text-slate-700 italic">"{categoryDesc}"</p>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 gap-3">
                                            {categoryFiles.length > 0 ? (
                                                categoryFiles.map((doc) => (
                                                    <DocumentCard key={`${doc.category}-${doc.id}`} doc={doc} onDownload={handleDownloadDocument} onPrint={handlePrintDocument} onDelete={handleDeleteDocument} onView={handleViewDocument} />
                                                ))
                                            ) : (
                                                <div className="py-16 flex flex-col items-center justify-center border-2 border-dashed border-blue-900/20 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-400/20">
                                                    <FileText className="h-8 w-8 mb-2 text-blue-900 dark:text-blue-400 opacity-40" />
                                                    <p className="text-sm font-bold text-blue-900 dark:text-blue-400">No {category.toLowerCase()} files</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>
                                )
                            })}
                        </Tabs>
                        {tinData && (tinData.processFiles.length > 0 || tinData.approvedFiles.length > 0 || tinData.pinFiles.length > 0 || tinData.ssidFiles.length > 0) && (
                            <div className="pt-6 border-t border-slate-100 mt-4 space-y-4">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Registration Overview</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <SummaryItem label="Process" count={tinData.processFiles.length} color="blue" />
                                    <SummaryItem label="Approved" count={tinData.approvedFiles.length} color="green" />
                                    <SummaryItem label="PIN" count={tinData.pinFiles.length} color="amber" />
                                    <SummaryItem label="SSID" count={tinData.ssidFiles.length} color="red" />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>


            {/* Standard Footer line and Learn More Below */}
            <div className="pt-8 pb-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 group transition-colors order-2 md:order-1"
                    onClick={() => setHelpDialogOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    Learn more about Client Page
                </button>
                <div className="flex gap-3 order-1 md:order-2">
                    <Button
                        variant="outline"
                        size="default"
                        className="bg-white dark:bg-slate-900 w-28"
                        onClick={() => navigate(`/secretarial-advisory/new/${id}`)}
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

            {/* Dialogs */}
            <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-blue-500" />
                            Guide: Managing Secretarial Details
                        </DialogTitle>
                        <DialogDescription>
                            How to manage client information and TIN registration documents.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">1</div>
                                    Company Info
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Review company registration details, address, and contact information.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">2</div>
                                    Personnel Info
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Manage directors, secretaries, and other key personnel associated with the company.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">3</div>
                                    TIN Registration
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Use the "TIN Registration +" button to upload and categorize documents like Process, Approved, PIN, and SSID.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">4</div>
                                    Document Handling
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Click on documents to view them. Use icons to download, print, or remove specific documents from the registry.
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
                        <Button variant="destructive" onClick={() => { setDeleteDialogOpen(false); navigate("/secretarial-advisory"); }}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
                <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                    <DialogHeader><DialogTitle>{previewDoc?.name}</DialogTitle><DialogDescription>Viewing {previewDoc?.category} document</DialogDescription></DialogHeader>
                    <div className="flex-1 bg-slate-100 rounded-lg flex items-center justify-center m-4">Preview Placeholder</div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => previewDoc && handlePrintDocument(previewDoc.name)}>Print</Button>
                        <Button onClick={() => previewDoc && handleDownloadDocument(previewDoc.name)}>Download</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <TINRegistrationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onSave={handleSaveTIN} initialData={tinData} />
        </div>
    )
}
