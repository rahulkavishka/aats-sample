import { useState, useRef, useEffect } from "react"
import { Search, Plus, Phone, Mail, MoreVertical, HelpCircle, ChevronLeft, ChevronRight, Shield, Camera, Upload, X, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

// Mock Data
const initialEmployees: { id: number; name: string; email: string; phone: string; role: string; status: string; avatar?: string }[] = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "077 234 5678", role: "Auditor", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "071 987 6543", role: "Manager", status: "Active" },
    { id: 3, name: "Charlie Hidden", email: "charlie@example.com", phone: "076 555 1234", role: "Intern", status: "Inactive" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", phone: "077 444 9999", role: "Senior Auditor", status: "Active" },
    { id: 5, name: "Ethan Hunt", email: "ethan@example.com", phone: "078 777 0000", role: "Security", status: "Active" },
    { id: 6, name: "Fiona Apple", email: "fiona@example.com", phone: "075 123 1234", role: "Auditor", status: "Active" },
    { id: 7, name: "George Miller", email: "george@example.com", phone: "070 321 3210", role: "Manager", status: "Active" },
    { id: 8, name: "Hannah Montana", email: "hannah@example.com", phone: "077 456 4567", role: "Senior Auditor", status: "Active" },
    { id: 9, name: "Ian McKellen", email: "ian@example.com", phone: "071 654 6543", role: "Auditor", status: "Active" },
    { id: 10, name: "Jane Doe", email: "jane@example.com", phone: "076 789 7890", role: "Intern", status: "Active" },
    { id: 11, name: "Kevin Hart", email: "kevin@example.com", phone: "077 910 9101", role: "Auditor", status: "Inactive" },
    { id: 12, name: "Laura Croft", email: "laura@example.com", phone: "071 222 3333", role: "Manager", status: "Active" },
    { id: 13, name: "Mike Tyson", email: "mike@example.com", phone: "076 555 6666", role: "Senior Auditor", status: "Active" },
    { id: 14, name: "Nina Simone", email: "nina@example.com", phone: "077 888 9999", role: "Auditor", status: "Active" },
    { id: 15, name: "Oscar Wilde", email: "oscar@example.com", phone: "071 111 2222", role: "Intern", status: "Active" },
]

const RoleBadge = ({ role }: { role: string }) => {
    const r = role.toLowerCase()
    let variant: "paid" | "pending" | "partial" | "secondary" | "destructive" = "secondary"

    if (r.includes("manager") || r.includes("senior") || r.includes("admin")) variant = "paid"
    else if (r.includes("auditor") || r.includes("assistant") || r.includes("staff")) variant = "destructive"
    else if (r.includes("intern")) variant = "secondary"
    else if (r.includes("security")) variant = "destructive"

    return <Badge variant={variant} className="capitalize">{role}</Badge>
}

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState(() => {
        const saved = localStorage.getItem("aats_employees")
        return saved ? JSON.parse(saved) : initialEmployees
    })
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState<typeof initialEmployees[0] | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("aats_employees", JSON.stringify(employees))
    }, [employees])

    // --- Form State ---
    const initialFormState = {
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: "",
        avatar: ""
    }
    const [formData, setFormData] = useState(initialFormState)
    const [error, setError] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    const resetForm = () => {
        setFormData(initialFormState)
        setError(null)
        setEditingId(null)
    }

    const fileInputRef = useRef<HTMLInputElement>(null)

    const filteredEmployees = employees.filter((emp: any) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // --- Pagination Logic ---
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    // --- Handlers ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleRoleChange = (value: string) => {
        setFormData(prev => ({ ...prev, role: value }))
    }

    const handleUpdateEmployeePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && selectedEmployee) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const photo = reader.result as string
                setEmployees((prev: any[]) => prev.map(emp => emp.id === selectedEmployee.id ? { ...emp, avatar: photo } : emp))
                setSelectedEmployee({ ...selectedEmployee, avatar: photo })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveEmployee = () => {
        // Full form validation
        const isEditing = !!editingId
        if (!formData.name || !formData.email || !formData.phone || !formData.role) {
            setError("All fields (Name, Email, Phone, Role) must be filled.")
            return
        }

        // Phone Validation: Must have exactly 10 digits
        const phoneDigits = formData.phone.replace(/\D/g, '')
        if (phoneDigits.length !== 10) {
            setError("Phone number must contain exactly 10 digits.")
            return
        }

        // Only require passwords if NOT editing OR if either password field is filled
        if (!isEditing || formData.password || formData.confirmPassword) {
            if (!formData.password || !formData.confirmPassword) {
                setError("Please fill both password fields to update password.")
                return
            }
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match.")
                return
            }
        }

        if (editingId) {
            // Update existing employee
            setEmployees((prev: any[]) => prev.map(emp =>
                emp.id === editingId
                    ? {
                        ...emp,
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        role: formData.role,
                        avatar: formData.avatar || emp.avatar
                    }
                    : emp
            ))
            // Update selected employee view
            if (selectedEmployee) {
                const updated = {
                    ...selectedEmployee,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    role: formData.role,
                    avatar: formData.avatar || selectedEmployee.avatar
                }
                setSelectedEmployee(updated)
            }
        } else {
            // Create new employee
            const newEmployee = {
                id: Date.now(), // More robust unique ID
                name: formData.name,
                email: formData.email,
                phone: formData.phone || "077 000 0000",
                role: formData.role,
                status: "Active",
                avatar: formData.avatar
            }
            setEmployees((prev: any[]) => [newEmployee, ...prev])
            setCurrentPage(1)
        }

        resetForm()
        setIsAddMemberOpen(false)

        // Show success notification
        setNotification({
            message: editingId ? "Employee updated successfully!" : "Employee added successfully!",
            type: 'success'
        })
        setTimeout(() => setNotification(null), 3000)
    }

    const handleEditClick = () => {
        if (!selectedEmployee) return
        setFormData({
            name: selectedEmployee.name,
            email: selectedEmployee.email,
            phone: selectedEmployee.phone,
            role: selectedEmployee.role,
            password: "",
            confirmPassword: "",
            avatar: selectedEmployee.avatar || ""
        })
        setEditingId(selectedEmployee.id)
        setIsAddMemberOpen(true)
    }

    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6 relative min-h-screen pb-10">
            {/* Success Notification */}
            {notification && (
                <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-4 duration-300">
                    <div className={cn(
                        "px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 bg-white dark:bg-slate-900 shadow-xl",
                        notification.type === 'success' ? "border-[#00DBDE]/50" : "border-rose-500/50"
                    )}>
                        <div className={cn(
                            "size-8 rounded-full flex items-center justify-center text-white",
                            notification.type === 'success' ? "bg-gradient-to-tr from-[#00DBDE] to-[#FC00FF]" : "bg-rose-500"
                        )}>
                            {notification.type === 'success' ? <CheckCircle2 className="size-5" /> : <AlertCircle className="size-5" />}
                        </div>
                        <p className="font-bold text-sm text-[#0A1931] dark:text-white">{notification.message}</p>
                    </div>
                </div>
            )}

            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#0A1931]">Employee Management</h1>
                    <p className="text-muted-foreground mt-1">Manage firm employees and their access privileges.</p>
                </div>
                <Button onClick={() => setIsAddMemberOpen(true)} className="w-full sm:w-auto bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] hover:opacity-90 transition-opacity border-0 h-11 px-6 shadow-md font-semibold text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Member
                </Button>
            </div>

            {/* Filters */}
            <Card className="shadow-sm border-[#B3CFE5]/30">
                <CardContent className="p-4 grid gap-4 grid-cols-1 md:grid-cols-[1fr_auto]">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#4A7FA7]" />
                        <Input
                            placeholder="Search by name, email or role..."
                            className="pl-9 h-10 border-[#B3CFE5]/50 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <div className="rounded-xl border border-[#B3CFE5]/30 bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#F6FAFD] hover:bg-[#F6FAFD] border-[#B3CFE5]/30">
                                <TableHead className="w-[300px] font-bold text-[#1A3D63] pl-6 py-4">Employee Name</TableHead>
                                <TableHead className="font-bold text-[#1A3D63] py-4">Contact Info</TableHead>
                                <TableHead className="font-bold text-[#1A3D63] py-4">Role</TableHead>
                                <TableHead className="font-bold text-[#1A3D63] py-4">Status</TableHead>
                                <TableHead className="font-bold text-[#1A3D63] text-right pr-6 py-4">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentEmployees.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-[#4A7FA7]">
                                        No employees found matching your search.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentEmployees.map((employee: any) => (
                                    <TableRow
                                        key={employee.id}
                                        className="hover:bg-[#F6FAFD]/50 border-[#B3CFE5]/30 transition-colors cursor-pointer group"
                                        onClick={() => setSelectedEmployee(employee)}
                                    >
                                        <TableCell className="font-medium text-[#0A1931] py-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                {employee.avatar ? (
                                                    <img src={employee.avatar} alt={employee.name} className="h-9 w-9 rounded-full object-cover border border-[#B3CFE5]" />
                                                ) : (
                                                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#00DBDE]/20 to-[#FC00FF]/20 flex items-center justify-center text-[#1A3D63] font-bold text-xs border border-[#B3CFE5]">
                                                        {employee.name.slice(0, 2).toUpperCase()}
                                                    </div>
                                                )}
                                                {employee.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm text-[#4A7FA7]">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    {employee.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] text-[#4A7FA7]/70">
                                                    <Phone className="h-3.5 w-3.5" />
                                                    {employee.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <RoleBadge role={employee.role} />
                                        </TableCell>
                                        <TableCell className="py-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${employee.status === "Active"
                                                ? "bg-green-100 text-green-700 border border-green-200"
                                                : "bg-red-100 text-red-700 border border-red-200"
                                                }`}>
                                                {employee.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-6 py-4">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#B3CFE5]/20">
                                                        <MoreVertical className="h-4 w-4 text-[#4A7FA7]" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[160px]">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem className="cursor-pointer">Edit Profile</DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">Reset Password</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive text-red-500">Deactivate</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* --- Pagination --- */}
                <div className="flex items-center justify-between border-t border-[#B3CFE5]/30 p-4 bg-[#F6FAFD]/30">
                    <p className="text-xs text-[#4A7FA7] font-medium">
                        Showing <span className="text-[#1A3D63] font-semibold">{startIndex + 1}</span> to <span className="text-[#1A3D63] font-semibold">{Math.min(startIndex + itemsPerPage, filteredEmployees.length)}</span> of <span className="text-[#1A3D63] font-bold">{filteredEmployees.length}</span> employees
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-[#B3CFE5]/50 hover:bg-white text-[#4A7FA7]"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-[#B3CFE5]/50 hover:bg-white text-[#4A7FA7]"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            Next <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer / Info */}
            <div className="flex items-center justify-between pt-6">
                <button
                    className="text-sm text-[#4A7FA7] hover:text-[#00DBDE] flex items-center gap-1 group transition-colors"
                    onClick={() => setLearnMoreOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 group-hover:text-[#00DBDE] transition-colors" />
                    <span>Learning Center: Employee Management Guide</span>
                </button>
            </div>

            {/* --- Side Drawer (Employee Details) --- */}
            {/* Backdrop */}
            {selectedEmployee && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px] animate-in fade-in duration-300"
                    onClick={() => setSelectedEmployee(null)}
                />
            )}

            {/* Drawer */}
            <div className={cn(
                "fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out transform border-l border-[#B3CFE5]/30",
                selectedEmployee ? "translate-x-0" : "translate-x-full"
            )}>
                {selectedEmployee && (
                    <div className="h-full flex flex-col">
                        {/* Drawer Header */}
                        <div className="px-6 py-6 border-b border-[#B3CFE5]/20 flex items-start justify-between bg-[#F6FAFD]/50">
                            <div>
                                <h2 className="text-lg font-bold text-[#0A1931]">Employee Profile</h2>
                                <p className="text-sm text-[#4A7FA7]">Comprehensive details for {selectedEmployee.name}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="-mr-2 text-[#4A7FA7] hover:bg-[#B3CFE5]/20" onClick={() => setSelectedEmployee(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Profile Photo Section */}
                            <div className="flex flex-col items-center justify-center text-center space-y-4">
                                <div
                                    className="relative group cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {selectedEmployee.avatar ? (
                                        <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="size-28 rounded-full object-cover border-4 border-white shadow-xl bg-white transition-transform group-hover:scale-105" />
                                    ) : (
                                        <div className="size-28 rounded-full bg-gradient-to-tr from-[#00DBDE] to-[#FC00FF] flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white transition-transform group-hover:scale-105">
                                            {selectedEmployee.name.slice(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <Camera className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 size-9 rounded-full bg-gradient-to-tr from-[#00DBDE] to-[#FC00FF] text-white flex items-center justify-center border-2 border-white shadow-md">
                                        <Upload className="h-4 w-4" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleUpdateEmployeePhoto}
                                />
                                <div>
                                    <h3 className="text-2xl font-bold text-[#0A1931]">{selectedEmployee.name}</h3>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <Badge className="bg-[#00DBDE]/10 text-[#00DBDE] border-[#00DBDE]/20 hover:bg-[#00DBDE]/20 transition-colors">
                                            <Shield className="size-3 mr-1" />
                                            {selectedEmployee.role}
                                        </Badge>
                                        <Badge className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider",
                                            selectedEmployee.status === "Active"
                                                ? "bg-green-100 text-green-700 border-green-200"
                                                : "bg-red-100 text-red-700 border-red-200"
                                        )}>
                                            {selectedEmployee.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Info Blocks */}
                            <div className="grid gap-6">
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#4A7FA7]">Contact Details</h4>
                                    <div className="grid gap-4">
                                        <div className="flex items-center gap-4 p-3 rounded-xl bg-[#F6FAFD] border border-[#B3CFE5]/20 group hover:border-[#00DBDE]/30 transition-colors">
                                            <div className="size-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#00DBDE]">
                                                <Mail className="size-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#4A7FA7]">Email Address</p>
                                                <p className="text-sm font-semibold text-[#1A3D63]">{selectedEmployee.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-3 rounded-xl bg-[#F6FAFD] border border-[#B3CFE5]/20 group hover:border-[#00DBDE]/30 transition-colors">
                                            <div className="size-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#FC00FF]">
                                                <Phone className="size-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#4A7FA7]">Work Phone</p>
                                                <p className="text-sm font-semibold text-[#1A3D63]">{selectedEmployee.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-[#B3CFE5]/20" />

                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#4A7FA7]">Administrative Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 rounded-xl bg-[#F6FAFD] border border-[#B3CFE5]/20">
                                            <p className="text-[10px] text-[#4A7FA7] mb-1">Employee ID</p>
                                            <p className="text-sm font-bold text-[#1A3D63]">EMP-{String(selectedEmployee.id).padStart(3, '0')}</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-[#F6FAFD] border border-[#B3CFE5]/20">
                                            <p className="text-[10px] text-[#4A7FA7] mb-1">System Status</p>
                                            <p className="text-sm font-bold text-green-600">Verified</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-6 border-t border-[#B3CFE5]/20 bg-[#F6FAFD]/30">
                            <div className="grid grid-cols-2 gap-3">
                                <Button className="bg-[#1A3D63] text-white hover:bg-[#0A1931]" onClick={handleEditClick}>
                                    Edit Employee
                                </Button>
                                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                                    Deactivate
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Dialogs --- */}

            {/* Add Member Dialog */}
            <Dialog
                open={isAddMemberOpen}
                onOpenChange={(open) => {
                    setIsAddMemberOpen(open)
                    if (!open) resetForm()
                }}
            >
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Employee" : "Add New Member"}</DialogTitle>
                        <DialogDescription>
                            {editingId ? "Update the employee's information in the system." : "Enter details to add a new employee to the system."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter employee name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="focus-brand"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select onValueChange={handleRoleChange} value={formData.role}>
                                    <SelectTrigger id="role" className="focus-brand">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Auditor">Auditor</SelectItem>
                                        <SelectItem value="Manager">Manager</SelectItem>
                                        <SelectItem value="Senior Auditor">Senior Auditor</SelectItem>
                                        <SelectItem value="Intern">Intern</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="employee@auditfirm.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="focus-brand"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="07X-XXXXXXX"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="focus-brand"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                                {error}
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAddMemberOpen(false)
                                resetForm()
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleSaveEmployee} className="bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] border-0 text-white">
                            {editingId ? "Save Changes" : "Save Member"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Help Dialog */}
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl text-[#0A1931]">
                            <HelpCircle className="h-6 w-6 text-[#00DBDE]" />
                            Guide: Employee Roles & Management
                        </DialogTitle>
                        <DialogDescription>
                            Understanding how to manage your team effectively.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-[#F6FAFD] space-y-2 border border-[#B3CFE5]/30">
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-[#0A1931]">
                                    <Shield className="h-4 w-4 text-[#00DBDE]" />
                                    Employee Roles
                                </h4>
                                <p className="text-xs text-[#4A7FA7] leading-relaxed">
                                    Auditors and Managers have different levels of access to client portals and internal audit records.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-[#F6FAFD] space-y-2 border border-[#B3CFE5]/30">
                                <h4 className="font-semibold text-sm flex items-center gap-2 text-[#0A1931]">
                                    <Plus className="h-4 w-4 text-[#FC00FF]" />
                                    Dynamic Management
                                </h4>
                                <p className="text-xs text-[#4A7FA7] leading-relaxed">
                                    Adding a new member automatically grants them immediate access to their assigned firm modules.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)} className="bg-[#0A1931] hover:bg-[#1A3D63] text-white">Got it, thanks!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
