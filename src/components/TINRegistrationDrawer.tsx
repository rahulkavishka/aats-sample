import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export interface FileData {
    id: string
    name: string
    size?: string
    url?: string
}

export interface TINData {
    description?: string
    processFiles: FileData[]
    approvedFiles: FileData[]
    pinFiles: FileData[]
    ssidFiles: FileData[]
}

interface TINRegistrationDrawerProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: TINData) => void
    initialData?: TINData
}

export default function TINRegistrationDrawer({ isOpen, onClose }: TINRegistrationDrawerProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>TIN Registration</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                    <p>TIN Registration Drawer Placeholder</p>
                </div>
            </SheetContent>
        </Sheet>
    )
}
