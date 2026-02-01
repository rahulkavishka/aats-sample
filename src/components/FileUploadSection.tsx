import { useState, useRef } from "react"
import { Upload, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FileUploadSectionProps {
    title: string
    files: { id: string; name: string; size?: string }[]
    onFilesChange: (files: { id: string; name: string; size?: string }[]) => void
}

export default function FileUploadSection({ title, files, onFilesChange }: FileUploadSectionProps) {
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files)
        addFiles(droppedFiles)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
            addFiles(selectedFiles)
        }
    }

    const addFiles = (newFiles: File[]) => {
        const fileObjects = newFiles.map((file) => ({
            id: `${Date.now()}-${Math.random()}`,
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`
        }))
        onFilesChange([...files, ...fileObjects])
    }

    const removeFile = (id: string) => {
        onFilesChange(files.filter((f) => f.id !== id))
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {title}
                </h4>
                <Badge className="bg-blue-500 text-white font-bold">
                    {files.length} {files.length === 1 ? "File" : "Files"}
                </Badge>
            </div>

            {/* Upload Area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                    : "border-[#749faf] bg-[#749faf]/10 hover:border-[#749faf]/80"
                    }`}
            >
                <Upload className="mx-auto h-8 w-8 text-[#749faf] mb-2" />
                <p className="text-sm text-[#749faf]">
                    Drag & drop files here or click to browse
                </p>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                                        {file.name}
                                    </p>
                                    {file.size && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{file.size}</p>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeFile(file.id)
                                }}
                                className="h-8 w-8 text-slate-500 hover:text-red-500"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
