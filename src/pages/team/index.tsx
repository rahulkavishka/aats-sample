import { useState, useEffect, useRef } from "react"

import {
    Search,
    Plus,
    Trash2,
    X,
    Filter,
    User,
    Mail,
    Phone,
    Shield,
    FileText,
    PenSquare,
    ChevronLeft,
    ChevronRight,
    HelpCircle,
    Camera,
    Upload,
    CheckCircle2,
    AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// --- Mock Data ---
interface TeamMember {
    id: string
    username: string
    email: string
    phone: string
    role: "Admin" | "Staff"
    joinDate: string
    avatarColor: string
    avatar?: string
}

const mockMembers: TeamMember[] = [
    { id: "USR-001", username: "alex.admin", email: "alex@auditfirm.com", phone: "077 123 4567", role: "Admin", joinDate: "2023-01-15", avatarColor: "bg-blue-500" },
    { id: "USR-002", username: "sarah.staff", email: "sarah@auditfirm.com", phone: "071 987 6543", role: "Staff", joinDate: "2023-03-22", avatarColor: "bg-green-500" },
    { id: "USR-003", username: "mike.finance", email: "mike@auditfirm.com", phone: "076 456 7890", role: "Staff", joinDate: "2023-06-10", avatarColor: "bg-purple-500" },
    { id: "USR-004", username: "jessica.audit", email: "jessica@auditfirm.com", phone: "077 234 5678", role: "Staff", joinDate: "2023-08-05", avatarColor: "bg-orange-500" },
    { id: "USR-005", username: "david.manager", email: "david@auditfirm.com", phone: "078 876 5432", role: "Staff", joinDate: "2022-11-30", avatarColor: "bg-red-500" },
    { id: "USR-006", username: "emma.watson", email: "emma@auditfirm.com", phone: "075 111 2222", role: "Staff", joinDate: "2023-09-12", avatarColor: "bg-pink-500" },
    { id: "USR-007", username: "tom.hanks", email: "tom@auditfirm.com", phone: "072 333 4444", role: "Staff", joinDate: "2023-10-01", avatarColor: "bg-teal-500" },
    { id: "USR-008", username: "robert.downey", email: "robert@auditfirm.com", phone: "077 555 6666", role: "Admin", joinDate: "2023-10-15", avatarColor: "bg-indigo-500" },
    { id: "USR-009", username: "scarlett.j", email: "scarlett@auditfirm.com", phone: "071 777 8888", role: "Staff", joinDate: "2023-11-05", avatarColor: "bg-yellow-500" },
    { id: "USR-010", username: "chris.evans", email: "chris@auditfirm.com", phone: "076 999 0000", role: "Staff", joinDate: "2023-11-20", avatarColor: "bg-cyan-500" },
    { id: "USR-011", username: "mark.ruffalo", email: "mark@auditfirm.com", phone: "077 121 2121", role: "Staff", joinDate: "2023-12-01", avatarColor: "bg-green-700" },
    { id: "USR-012", username: "jeremy.renner", email: "jeremy@auditfirm.com", phone: "071 232 3232", role: "Staff", joinDate: "2023-12-10", avatarColor: "bg-purple-700" },
    { id: "USR-013", username: "paul.rudd", email: "paul@auditfirm.com", phone: "076 343 4343", role: "Staff", joinDate: "2023-12-15", avatarColor: "bg-orange-700" },
    { id: "USR-014", username: "brie.larson", email: "brie@auditfirm.com", phone: "077 454 5454", role: "Admin", joinDate: "2023-12-20", avatarColor: "bg-blue-700" },
    { id: "USR-015", username: "tom.holland", email: "tom.h@auditfirm.com", phone: "070 565-6565", role: "Staff", joinDate: "2023-12-25", avatarColor: "bg-red-700" },
]

const RoleBadge = ({ role }: { role: string }) => {
    const r = role.toLowerCase()
    let variant: "paid" | "secondary" | "destructive" = "secondary"

    if (r === "admin") variant = "paid"
    else if (r === "staff") variant = "destructive"

    return <Badge variant={variant} className="capitalize">{role}</Badge>
}

export default function TeamManagement() {
    // --- State ---
    const [members, setMembers] = useState<TeamMember[]>(() => {
        const saved = localStorage.getItem("aats_team")
        return saved ? JSON.parse(saved) : mockMembers
    })
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState<string>("all")
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [memberToDelete, setMemberToDelete] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("aats_team", JSON.stringify(members))
    }, [members])

    // --- Form State ---
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: "",
        avatar: ""
    })
    const [error, setError] = useState<string | null>(null)

    const resetForm = () => {
        setFormData({
            username: "",
            email: "",
            phone: "",
            role: "",
            password: "",
            confirmPassword: "",
            avatar: ""
        })
        setError(null)
        setEditingId(null)
    }
    const [learnMoreOpen, setLearnMoreOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // --- Filter Logic ---
    const filteredMembers = members.filter(member => {
        const matchesSearch =
            member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === "all" || member.role === roleFilter
        return matchesSearch && matchesRole
    })

    // --- Pagination Logic ---
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage)

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, roleFilter])

    // --- Handlers ---
    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation() // Prevent row click
        setMemberToDelete(id)
        setIsDeleteOpen(true)
    }

    const confirmDelete = () => {
        if (memberToDelete) {
            setMembers(members.filter(m => m.id !== memberToDelete))
            setIsDeleteOpen(false)
            setMemberToDelete(null)
            if (selectedMember?.id === memberToDelete) {
                setSelectedMember(null)
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleRoleChange = (value: string) => {
        setFormData(prev => ({ ...prev, role: value }))
    }

    const handleUpdateMemberPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && selectedMember) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const photo = reader.result as string
                setMembers(prev => prev.map(m => m.id === selectedMember.id ? { ...m, avatar: photo } : m))
                setSelectedMember({ ...selectedMember, avatar: photo })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveMember = () => {
        // Full form validation
        const isEditing = !!editingId
        if (!formData.username || !formData.email || !formData.phone || !formData.role) {
            setError("All fields (Username, Email, Phone, Role) must be filled.")
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
            // Update existing member
            setMembers(prev => prev.map(m =>
                m.id === editingId
                    ? {
                        ...m,
                        username: formData.username,
                        email: formData.email,
                        phone: formData.phone,
                        role: formData.role as "Admin" | "Staff",
                        avatar: formData.avatar || m.avatar
                    }
                    : m
            ))
            // Update selected member view as well
            const updated = {
                ...selectedMember!,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                role: formData.role as "Admin" | "Staff",
                avatar: formData.avatar || selectedMember!.avatar
            }
            setSelectedMember(updated)
        } else {
            // Create new member
            const newMember: TeamMember = {
                id: `USR-${Date.now()}`,
                username: formData.username,
                email: formData.email,
                phone: formData.phone || "077 000 0000",
                role: formData.role as "Admin" | "Staff",
                joinDate: new Date().toISOString().split('T')[0],
                avatarColor: `bg-${['blue', 'green', 'purple', 'orange', 'red', 'indigo'][Math.floor(Math.random() * 6)]}-500`,
                avatar: formData.avatar
            }
            setMembers(prev => [newMember, ...prev])
            setCurrentPage(1)
        }

        resetForm()
        setIsAddMemberOpen(false)

        // Show success notification
        setNotification({
            message: editingId ? "Member updated successfully!" : "Member added successfully!",
            type: 'success'
        })
        setTimeout(() => setNotification(null), 3000)
    }

    const handleEditClick = () => {
        if (!selectedMember) return
        setFormData({
            username: selectedMember.username,
            email: selectedMember.email,
            phone: selectedMember.phone,
            role: selectedMember.role,
            password: "", // Don't pre-fill passwords for security
            confirmPassword: "",
            avatar: selectedMember.avatar || ""
        })
        setEditingId(selectedMember.id)
        setIsAddMemberOpen(true)
    }

    const handleRowClick = (member: TeamMember) => {
        setSelectedMember(member)
    }

    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6 pb-10 relative min-h-screen">
            {/* Success Notification */}
            {notification && (
                <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-4 duration-300">
                    <div className={cn(
                        "px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 bg-white dark:bg-slate-900",
                        notification.type === 'success' ? "border-emerald-500/50" : "border-rose-500/50"
                    )}>
                        <div className={cn(
                            "size-8 rounded-full flex items-center justify-center",
                            notification.type === 'success' ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                        )}>
                            {notification.type === 'success' ? <CheckCircle2 className="size-5" /> : <AlertCircle className="size-5" />}
                        </div>
                        <p className="font-semibold text-sm">{notification.message}</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Team Management</h1>
                    <p className="text-muted-foreground mt-1">Manage system access and employee roles.</p>
                </div>
                <Button onClick={() => setIsAddMemberOpen(true)} className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]">
                    <Plus className="h-4 w-4" />
                    Add Member
                </Button>
            </div>

            {/* Filters */}
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                <CardContent className="p-4 grid gap-4 grid-cols-1 md:grid-cols-[1fr_auto]">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by username or email..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <div className="flex items-center gap-2">
                                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                                <SelectValue placeholder="Role" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Staff">Staff</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Table */}
            <div className="rounded-md border bg-card shadow-sm overflow-hidden flex flex-col">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="font-bold text-foreground pl-6">Username</TableHead>
                            <TableHead className="font-bold text-foreground">Email</TableHead>
                            <TableHead className="font-bold text-foreground">Phone Number</TableHead>
                            <TableHead className="font-bold text-foreground">Role</TableHead>
                            <TableHead className="font-bold text-foreground text-right pr-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentMembers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                    No team members found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            currentMembers.map((member: TeamMember) => (
                                <TableRow
                                    key={member.id}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors group"
                                    onClick={() => handleRowClick(member)}
                                >
                                    <TableCell className="pl-6 font-medium">
                                        <div className="flex items-center gap-3">
                                            {member.avatar ? (
                                                <img src={member.avatar} alt={member.username} className="size-8 rounded-full object-cover border border-slate-200 dark:border-slate-800" />
                                            ) : (
                                                <div className={cn("size-8 rounded-full flex items-center justify-center text-white text-xs font-bold", member.avatarColor)}>
                                                    {member.username.substring(0, 2).toUpperCase()}
                                                </div>
                                            )}
                                            {member.username}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5 opacity-70" />
                                            {member.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3.5 w-3.5 opacity-70" />
                                            {member.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <RoleBadge role={member.role} />
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                                            onClick={(e) => handleDeleteClick(e, member.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer / Pagination */}
            <div className="flex items-center justify-between pt-2">
                <button
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 group transition-colors"
                    onClick={() => setLearnMoreOpen(true)}
                >
                    <HelpCircle className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Learn more about Team Management
                </button>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages || 1}</span>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* --- Side Drawer (Custom Sheet) --- */}
            {/* Backdrop */}
            {selectedMember && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setSelectedMember(null)}
                />
            )}

            {/* Drawer */}
            <div className={cn(
                "fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-background shadow-2xl transition-transform duration-300 ease-in-out transform border-l",
                selectedMember ? "translate-x-0" : "translate-x-full"
            )}>
                {selectedMember && (
                    <div className="h-full flex flex-col">
                        {/* Drawer Header */}
                        <div className="px-6 py-6 border-b flex items-start justify-between bg-muted/30">
                            <div>
                                <h2 className="text-lg font-semibold tracking-tight">Member Details</h2>
                                <p className="text-sm text-muted-foreground">View and manage employee information.</p>
                            </div>
                            <Button variant="ghost" size="icon" className="-mr-2" onClick={() => setSelectedMember(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Profile Header */}
                            <div className="flex flex-col items-center justify-center text-center space-y-3 pb-6 border-b">
                                <div
                                    className="relative group cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {selectedMember.avatar ? (
                                        <img src={selectedMember.avatar} alt={selectedMember.username} className="size-24 rounded-full object-cover border-4 border-white shadow-xl bg-white transition-transform group-hover:scale-105" />
                                    ) : (
                                        <div className={cn("size-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white transition-transform group-hover:scale-105", selectedMember.avatarColor)}>
                                            {selectedMember.username.substring(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <Camera className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-white shadow-md">
                                        <Upload className="h-4 w-4" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleUpdateMemberPhoto}
                                />
                                <div>
                                    <h3 className="text-xl font-bold">{selectedMember.username}</h3>
                                    <Badge variant="outline" className="mt-1">{selectedMember.role}</Badge>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Contact Information</Label>
                                    <div className="grid grid-cols-[auto_1fr] gap-3 pt-2">
                                        <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center">
                                            <Mail className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-sm font-medium">{selectedMember.email}</span>
                                            <span className="text-xs text-muted-foreground">Email Address</span>
                                        </div>

                                        <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center">
                                            <Phone className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-sm font-medium">{selectedMember.phone}</span>
                                            <span className="text-xs text-muted-foreground">Phone Number</span>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-1">
                                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Account Details</Label>
                                    <div className="grid grid-cols-[auto_1fr] gap-3 pt-2">
                                        <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center">
                                            <Shield className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-sm font-medium">{selectedMember.role} Access</span>
                                            <span className="text-xs text-muted-foreground">Current Role</span>
                                        </div>

                                        <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-sm font-medium">{selectedMember.id}</span>
                                            <span className="text-xs text-muted-foreground">Employee ID</span>
                                        </div>

                                        <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center">
                                            <FileText className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-sm font-medium">{selectedMember.joinDate}</span>
                                            <span className="text-xs text-muted-foreground">Date Joined</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-6 border-t bg-muted/30">
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="w-full" onClick={handleEditClick}>
                                    <PenSquare className="mr-2 h-4 w-4" />
                                    Edit Values
                                </Button>
                                <Button variant="destructive" className="w-full" onClick={() => {
                                    setMemberToDelete(selectedMember.id)
                                    setIsDeleteOpen(true)
                                    setSelectedMember(null)
                                }}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete User
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Add Member Dialog --- */}
            <Dialog
                open={isAddMemberOpen}
                onOpenChange={(open) => {
                    setIsAddMemberOpen(open)
                    if (!open) resetForm()
                }}
            >
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Member" : "Add New Member"}</DialogTitle>
                        <DialogDescription>
                            {editingId ? "Update the account details for this member." : "Create a new account for a staff member or administrator."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="jdoe"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="focus-brand"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={formData.role} onValueChange={handleRoleChange}>
                                    <SelectTrigger className="focus-brand">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Staff">Staff</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@company.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="focus-brand"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="07X-XXXXXXX"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="focus-brand"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="focus-brand"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="focus-brand"
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
                        <Button type="submit" onClick={handleSaveMember}>{editingId ? "Save Changes" : "Save Member"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* --- Delete Confirmation Dialog --- */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
                            <Trash2 className="h-6 w-6 text-destructive" />
                        </div>
                        <DialogTitle className="text-center">Delete Team Member</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            Are you sure you want to delete this user? This action cannot be undone and they will lose access specifically.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteOpen(false)}
                            className="w-full sm:w-32"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            className="w-full sm:w-32"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Help Dialog */}
            <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <HelpCircle className="h-6 w-6 text-primary" />
                            Guide: Team Management Dashboard
                        </DialogTitle>
                        <DialogDescription>
                            Master the tools for managing your team and system access.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">1</div>
                                    Member Roles
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Assign 'Admin' for full system access or 'Staff' for standard functional access to firm resources.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">2</div>
                                    Secure Access
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Each member requires a unique email and matching secure passwords to activate their account.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">3</div>
                                    Information Management
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Click any member row to view detailed profile information, contact details, and account metadata.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-2 border border-muted">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">4</div>
                                    System Security
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Efficiently remove members when they leave the firm to instantly revoke all system access privileges.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Pro Tip</h5>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Use the search and role filters to quickly manage specific groups of employees or verify access levels.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setLearnMoreOpen(false)}>Got it, thanks!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
