import React, { useState, useEffect } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from '@/components/ui/input';
import { User, FileText, ChevronRight, Printer, Download, Edit, Save, X } from 'lucide-react';

interface ClientDetailsDrawerProps {
    open: boolean;
    onClose: () => void;
    record: any; // Type 'any' for now to support various record types, or can be made generic
}

const ClientDetailsDrawer: React.FC<ClientDetailsDrawerProps> = ({ open, onClose, record }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>(record || {});

    useEffect(() => {
        if (open && record) {
            setFormData(record);
            setIsEditing(false);
        }
    }, [open, record]);

    if (!record) return null;

    const handleSave = () => {
        // Here you would typically call an API to save changes
        console.log("Saving changes:", formData);
        setIsEditing(false);
        // Currently just mocking save by closing edit mode
    };

    const handleCancel = () => {
        setFormData(record);
        setIsEditing(false);
    };

    // Helper to determine status color (reusing logic or hardcoding for now based on design)
    const getStatusColor = (status: string) => {
        const s = status?.toLowerCase() || '';
        if (s === 'paid') return 'bg-green-100 text-green-700 hover:bg-green-100 border-transparent';
        if (s === 'pending') return 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-transparent';
        if (s === 'ird paid' || s === 'ird') return 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-transparent';
        return 'secondary';
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col" hideClose>
                <ScrollArea className="flex-1 h-full">
                    {/* Header Section */}
                    <div className="p-6 border-b">
                        <SheetHeader className="mb-4">
                            <SheetTitle className="sr-only">Client Details</SheetTitle> {/* Accessibility */}
                            <div className="flex items-start gap-4">
                                <div className="h-16 w-16 rounded-full bg-indigo-100 overflow-hidden flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.clientName || 'User'}`}
                                        alt="Avatar"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-xl font-bold text-foreground truncate pr-8">{record.clientName}</h2>
                                    <div className="text-sm text-muted-foreground mt-1">TIN: {record.dinNo || record.tpin || record.vatNo || record.whtNo || record.ssclNo || 'N/A'}</div>
                                    <div className="text-xs text-muted-foreground">ID: #{record.id?.split('-')[2] || '001'}</div>
                                </div>
                                <Button variant="ghost" size="icon" className="shrink-0 -mr-2" onClick={onClose}>
                                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                                </Button>
                            </div>
                        </SheetHeader>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Client Information Section */}
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="p-4 border-b bg-muted/30 flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <h3 className="font-semibold text-sm">Client Information</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="text-sm font-medium text-muted-foreground">Individual Name:</span>
                                    <div className="col-span-2">
                                        {isEditing ? (
                                            <Input
                                                value={formData.clientName || ''}
                                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                                className="h-8"
                                            />
                                        ) : (
                                            <span className="text-sm">{formData.clientName}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <span className="text-sm font-medium text-muted-foreground">Director ID (DIN No):</span>
                                    <div className="col-span-2">
                                        {isEditing ? (
                                            <Input
                                                value={formData.dinNo || ''}
                                                onChange={(e) => setFormData({ ...formData, dinNo: e.target.value })}
                                                className="h-8"
                                            />
                                        ) : (
                                            <span className="text-sm">{formData.dinNo || 'N/A'}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tax Filing Details Section */}
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="p-4 border-b bg-muted/30 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <h3 className="font-semibold text-sm">Tax Filing Details</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="grid grid-cols-3 gap-4 items-center">
                                    <span className="text-sm font-medium text-muted-foreground">Status:</span>
                                    <div className="col-span-2">
                                        {isEditing ? (
                                            <Input
                                                value={formData.status || ''}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="h-8"
                                                placeholder="Paid, Pending, IRD Paid..."
                                            />
                                        ) : (
                                            <Badge className={getStatusColor(formData.status)} variant="outline">
                                                {formData.status?.toUpperCase() || 'UNKNOWN'}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="text-sm font-medium text-muted-foreground">Assessment Year:</span>
                                    <div className="col-span-2">
                                        {isEditing ? (
                                            <Input
                                                value={formData.assessmentYear || '2024/2025'} // Default if missing
                                                onChange={(e) => setFormData({ ...formData, assessmentYear: e.target.value })}
                                                className="h-8"
                                            />
                                        ) : (
                                            <span className="text-sm">{formData.assessmentYear || '2024/2025'}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="text-sm font-medium text-muted-foreground">Current Period:</span>
                                    <div className="col-span-2">
                                        {isEditing ? (
                                            <Input
                                                value={formData.taxPeriod || ''}
                                                onChange={(e) => setFormData({ ...formData, taxPeriod: e.target.value })}
                                                className="h-8"
                                            />
                                        ) : (
                                            <span className="text-sm">{formData.taxPeriod}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <span className="text-sm font-medium text-muted-foreground block">Auditor Notes:</span>
                                    <div className="relative">
                                        <Textarea
                                            placeholder="Add notes..."
                                            className="min-h-[80px] text-sm resize-none bg-muted/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                            value={formData.notes || ''} // Assuming record might have notes field, or defaulting to empty
                                            defaultValue={undefined} // Remove defaultValue to control it
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                        {!isEditing && <Edit className="h-4 w-4 absolute bottom-3 right-3 text-muted-foreground opacity-50" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Footer Section */}
                <div className="p-6 border-t bg-muted/10 mt-auto">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                                <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                                <Printer className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <Button variant="outline" onClick={handleCancel} className="gap-2">
                                        <X className="h-4 w-4" /> CANCEL
                                    </Button>
                                    <Button onClick={handleSave} className="gap-2 min-w-[100px]">
                                        <Save className="h-4 w-4" /> SAVE
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive gap-2">
                                        DELETE
                                    </Button>
                                    <Button onClick={() => setIsEditing(true)} className="gap-2 min-w-[100px]">
                                        <Edit className="h-4 w-4" /> EDIT
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ClientDetailsDrawer;
