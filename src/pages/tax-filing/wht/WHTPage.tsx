import React, { useState } from 'react';
import WHTForm, { type WHTFormData } from './WHTForm';
import WHTTable from './WHTTable';
import { subDays } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClientDetailsDrawer from '@/components/tax/ClientDetailsDrawer';
import { useTaxPersistence } from '@/hooks/useTaxPersistence';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export type WHTStatus = 'Paid' | 'Pending' | 'IRD Paid';
export type Branch = 'South' | 'West' | 'Central' | 'Northeast';

export interface WHTRecord {
    id: string;
    clientName: string;
    clientId: string;
    whtNo: string;
    taxPeriod: string;
    status: WHTStatus;
    branch: Branch;
    date: Date;
}

// Mock initial data
const INITIAL_DATA: WHTRecord[] = [
    {
        id: 'WHT-2024-001',
        clientName: 'Gamma Services',
        clientId: 'CL-401',
        whtNo: 'WHT-777888',
        taxPeriod: '2024-01',
        status: 'Paid',
        branch: 'South',
        date: subDays(new Date(), 2),
    },
    {
        id: 'WHT-2024-002',
        clientName: 'Lambda Corp',
        clientId: 'CL-402',
        whtNo: 'WHT-555666',
        taxPeriod: '2024 Q1',
        status: 'Pending',
        branch: 'West',
        date: subDays(new Date(), 12),
    },
    {
        id: 'WHT-2024-003',
        clientName: 'Sigma Inc',
        clientId: 'CL-403',
        whtNo: 'WHT-333444',
        taxPeriod: '2023 Annual',
        status: 'IRD Paid',
        branch: 'Central',
        date: subDays(new Date(), 30),
    },
];

const WHTPage: React.FC = () => {
    const { records, addRecord, deleteRecord, deleteRecords } = useTaxPersistence<WHTRecord>('wht_records', INITIAL_DATA);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: string | null; isBulk?: boolean }>({ isOpen: false, id: null });
    const [viewRecord, setViewRecord] = useState<WHTRecord | null>(null);

    const handleAddRecord = (data: WHTFormData) => {
        const newRecord: WHTRecord = {
            id: `WHT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            clientName: data.clientName,
            clientId: data.clientId,
            whtNo: data.whtNo,
            taxPeriod: `${data.period} ${data.periodUnit}`,
            status: data.status,
            branch: ['South', 'West', 'Central', 'Northeast'][Math.floor(Math.random() * 4)] as Branch,
            date: new Date(),
        };

        addRecord(newRecord);
    };

    const handleDeleteSelected = () => {
        setDeleteConfirmation({ isOpen: true, id: null, isBulk: true });
    };

    const confirmDelete = () => {
        if (deleteConfirmation.isBulk) {
            deleteRecords(Array.from(selectedRows));
            setSelectedRows(new Set());
        } else if (deleteConfirmation.id) {
            deleteRecord(deleteConfirmation.id);
        }
        setDeleteConfirmation({ isOpen: false, id: null });
    };

    return (
        <div className="flex flex-col min-h-full">
            <div className="container py-6 px-4 sm:px-8 space-y-8 flex-1">
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Withholding Tax (WHT)</h1>
                        <p className="text-muted-foreground mt-1">Manage and track your withholding tax filings.</p>
                    </div>
                </div>

                <section aria-label="New Record Entry">
                    <WHTForm onSubmit={handleAddRecord} />
                </section>

                <section aria-label="Records Table">
                    <WHTTable
                        data={records}
                        selectedRows={selectedRows}
                        onSelectionChange={setSelectedRows}
                        onDelete={(id) => setDeleteConfirmation({ isOpen: true, id })}
                        onBulkDelete={handleDeleteSelected}
                        onRowClick={(record) => setViewRecord(record)}
                    />
                </section>

                <ClientDetailsDrawer
                    open={!!viewRecord}
                    onClose={() => setViewRecord(null)}
                    record={viewRecord}
                />
            </div>



            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && setDeleteConfirmation({ isOpen: false, id: null })}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
                            <Trash2 className="h-6 w-6 text-destructive" />
                        </div>
                        <DialogTitle className="text-center">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            {deleteConfirmation.isBulk
                                ? `Are you sure you want to delete ${selectedRows.size} selected records? This action cannot be undone.`
                                : "Are you sure you want to delete this record? This action cannot be undone."
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteConfirmation({ isOpen: false, id: null })}
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
        </div>
    );
};

export default WHTPage;
