import { useState, useRef } from "react"
import { Upload, X, Plus, FileText, Check, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TINRegistrationFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (entries: TINFormEntry[]) => void
}

export interface TINFormEntry {
    id: string
    file: File
    category: string
    type: string
    description: string
}

export default function TINRegistrationForm({ open, onOpenChange, onSubmit }: TINRegistrationFormProps) {
    const [entries, setEntries] = useState<TINFormEntry[]>([])
    const [file, setFile] = useState<File | null>(null)
    const [category, setCategory] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const resetForm = () => {
        setFile(null)
        setCategory("")
        setType("")
        setDescription("")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleAddMore = () => {
        if (!file || !category) return

        const newEntry: TINFormEntry = {
            id: Math.random().toString(36).substring(7),
            file,
            category,
            type,
            description
        }

        setEntries([...entries, newEntry])
        resetForm()
    }

    const handleRemoveEntry = (id: string) => {
        setEntries(entries.filter(e => e.id !== id))
    }

    const handleEditEntry = (entry: TINFormEntry) => {
        // If there is current unfinished work, maybe save it? 
        // For now, simpler to just replace (or we could warn)
        // Ideally we push current back to list if valid, but let's just load:

        setFile(entry.file)
        setCategory(entry.category)
        setType(entry.type)
        setDescription(entry.description)

        // Remove from list so it's "moved" back to editing
        setEntries(entries.filter(e => e.id !== entry.id))
    }

    const handleSubmit = () => {
        // Combine list entries + current valid form state
        const finalEntries = [...entries]
        if (file && category) {
            finalEntries.push({
                id: Math.random().toString(36).substring(7),
                file,
                category,
                type,
                description
            })
        }

        console.log("Submitting all records:", finalEntries)
        onSubmit(finalEntries)
        setEntries([]) // Clear all
        resetForm()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-slate-900 border-slate-800 text-slate-100 max-h-[85vh] overflow-y-auto flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold uppercase tracking-wide flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        TIN Registration Upload
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 space-y-6 py-4">

                    {/* Preview List of Added Entries */}
                    {entries.length > 0 && (
                        <div className="space-y-3 mb-6">
                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Added Files ({entries.length})</Label>
                            <div className="grid gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                {entries.map(entry => (
                                    <div key={entry.id} className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/80 border border-slate-700 animate-in fade-in slide-in-from-top-1">
                                        {/* Icon Preview */}
                                        <div className="h-12 w-12 rounded bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                                            <FileText className="h-6 w-6 text-blue-500" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <p className="text-sm font-semibold text-slate-100 truncate" title={entry.file.name}>{entry.file.name}</p>
                                                <Badge variant="outline" className="text-[10px] uppercase border-blue-500/30 text-blue-400 bg-blue-500/10 ml-2 shrink-0">
                                                    {entry.category}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1 truncate">{entry.type || "No Type"} • {entry.description || "No Desc"}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                                                onClick={() => handleEditEntry(entry)}
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                onClick={() => handleRemoveEntry(entry.id)}
                                                title="Remove"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Form Area */}
                    <div className="space-y-4">
                        {/* File Upload Area */}
                        {!file ? (
                            <div
                                className="border-2 border-dashed border-slate-700 hover:border-slate-500 bg-slate-800/30 rounded-lg p-8 text-center transition-colors cursor-pointer group"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                                <div className="h-12 w-12 rounded-full bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:text-slate-300 mx-auto mb-3 transition-colors">
                                    <Upload className="h-6 w-6" />
                                </div>
                                <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Click to upload photo or drag and drop</p>
                                <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                            </div>
                        ) : (
                            <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                                {/* Selected File Warning / Header */}
                                <div className="flex items-center justify-between pb-3 border-b border-slate-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <Check className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-100 truncate max-w-[200px]">{file.name}</p>
                                            <p className="text-[10px] text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetForm}
                                        className="text-slate-400 hover:text-white"
                                    >
                                        <X className="h-4 w-4 mr-1" /> Change
                                    </Button>
                                </div>

                                <div className="grid gap-4">
                                    {/* Category */}
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</Label>
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger id="category" className="bg-slate-900 border-slate-700 text-slate-200 focus:ring-blue-500/20">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                                                <SelectItem value="process">Process</SelectItem>
                                                <SelectItem value="approved">Approved</SelectItem>
                                                <SelectItem value="pin">PIN</SelectItem>
                                                <SelectItem value="ssid">SSID</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Type */}
                                    <div className="space-y-2">
                                        <Label htmlFor="type" className="text-xs font-bold uppercase tracking-wider text-slate-400">Type</Label>
                                        <Input
                                            id="type"
                                            placeholder="e.g. Application Form"
                                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-blue-500/20"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="desc" className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</Label>
                                        <Textarea
                                            id="desc"
                                            placeholder="Add a description..."
                                            className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 min-h-[80px] focus-visible:ring-blue-500/20"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Add Another Button */}
                                {category && (
                                    <Button
                                        variant="outline"
                                        onClick={handleAddMore}
                                        className="w-full bg-slate-800/50 border-dashed border-slate-700 text-blue-400 hover:bg-blue-900/10 hover:text-blue-300 hover:border-blue-500/50 py-6 transition-all"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Add Another
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-800 mt-auto">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-slate-400 hover:text-white">
                        Cancel
                    </Button>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">
                            {entries.length + (file && category ? 1 : 0)} file(s) to save
                        </span>
                        <Button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                            disabled={entries.length === 0 && (!file || !category)}
                        >
                            Save & Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
