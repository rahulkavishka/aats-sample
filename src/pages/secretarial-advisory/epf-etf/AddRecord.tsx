import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Save, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function AddRecord() {
    const navigate = useNavigate()
    const [discardConfirmation, setDiscardConfirmation] = useState(false)

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [clientName, setClientName] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [noOfStaffs, setNoOfStaffs] = useState("")

    const handleSave = () => {
        navigate("/secretarial-advisory/epf-etf")
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20 p-4 md:p-6">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Add EPF/ETF Record</h1>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" onClick={() => setDiscardConfirmation(true)}>Cancel</Button>
                    <Button onClick={handleSave} className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01]">
                        <Save className="mr-2 h-4 w-4" />
                        Save Record
                    </Button>
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <fieldset className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 bg-card">
                    <legend className="px-2 text-sm font-medium text-foreground">Details</legend>
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="id">ID</Label>
                            <Input id="id" placeholder="Enter ID" className="bg-slate-50 dark:bg-slate-900" />
                        </div>
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client">Client Name</Label>
                            <Input id="client" value={clientName} onChange={e => setClientName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Company Name</Label>
                            <Input id="company" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="staffs">No of Staffs</Label>
                            <Input id="staffs" type="number" value={noOfStaffs} onChange={e => setNoOfStaffs(e.target.value)} />
                        </div>
                    </div>
                </fieldset>
            </div>

            <Dialog open={discardConfirmation} onOpenChange={setDiscardConfirmation}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Discard Changes?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel? Any unsaved changes will be lost.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setDiscardConfirmation(false)}>No, Keep Editing</Button>
                        <Button variant="destructive" onClick={() => navigate("/secretarial-advisory/epf-etf")}>Yes, Discard</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
