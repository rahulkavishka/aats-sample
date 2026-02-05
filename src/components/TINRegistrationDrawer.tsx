import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FileUploadSection from "@/components/FileUploadSection"

interface TINRegistrationDrawerProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: TINData) => void
    initialData?: TINData
}

export interface FileData {
    id: string
    name: string
    size?: string
}

export interface TINData {
    processFiles: FileData[]
    approvedFiles: FileData[]
    pinFiles: FileData[]
    ssidFiles: FileData[]
    description?: string
}

export default function TINRegistrationDrawer({
    isOpen,
    onClose,
    onSave,
    initialData
}: TINRegistrationDrawerProps) {
    const [processFiles, setProcessFiles] = useState<{ id: string; name: string; size?: string }[]>([])
    const [approvedFiles, setApprovedFiles] = useState<{ id: string; name: string; size?: string }[]>([])
    const [pinFiles, setPinFiles] = useState<{ id: string; name: string; size?: string }[]>([])
    const [ssidFiles, setSsidFiles] = useState<{ id: string; name: string; size?: string }[]>([])
    const [description, setDescription] = useState("")

    // Load initial data when drawer opens
    useEffect(() => {
        if (isOpen && initialData) {
            setProcessFiles(initialData.processFiles || [])
            setApprovedFiles(initialData.approvedFiles || [])
            setPinFiles(initialData.pinFiles || [])
            setSsidFiles(initialData.ssidFiles || [])
            setDescription(initialData.description || "")
        }
    }, [isOpen, initialData])

    const handleSave = () => {
        onSave({
            processFiles,
            approvedFiles,
            pinFiles,
            ssidFiles,
            description
        })
        onClose()
    }

    if (!isOpen) return null

    return createPortal(
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 inset-y-0 w-full md:w-[600px] lg:w-[700px] bg-white dark:bg-slate-900 shadow-2xl z-50 animate-in slide-in-from-right duration-300 flex flex-col">
                <div className="flex-none bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 z-20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                TIN Registration
                            </h2>
                            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Update registration documents and notes</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-10 w-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-bold uppercase tracking-wider">
                                Description
                            </Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description..."
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Upload Sections */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                Document Categories
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <FileUploadSection
                                title="PROCESS"
                                files={processFiles}
                                onFilesChange={setProcessFiles}
                            />

                            <FileUploadSection
                                title="APPROVED"
                                files={approvedFiles}
                                onFilesChange={setApprovedFiles}
                            />

                            <FileUploadSection
                                title="PIN"
                                files={pinFiles}
                                onFilesChange={setPinFiles}
                            />

                            <FileUploadSection
                                title="SSID"
                                files={ssidFiles}
                                onFilesChange={setSsidFiles}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer with Save Button */}
                <div className="flex-none bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-20 p-6">
                    <Button
                        onClick={handleSave}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-tight h-12 shadow-lg shadow-blue-500/20"
                        size="lg"
                    >
                        Save Registration Changes
                    </Button>
                </div>
            </div>
        </>,
        document.body
    )
}
