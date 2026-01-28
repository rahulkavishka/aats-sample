import React, { useState } from 'react';
import SSCLForm, { type SSCLFormData } from './SSCLForm';
import SSCLTable from './SSCLTable';
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

export type SSCLStatus = 'Paid' | 'Pending' | 'IRD Paid';
export type Branch = 'South' | 'West' | 'Central' | 'Northeast';

export interface SSCLRecord {
    id: string;
    clientName: string;
    clientId: string;
    ssclNo: string;
    taxPeriod: string;
    status: SSCLStatus;
    branch: Branch;
    date: Date;
}

// Mock initial data
const INITIAL_DATA: SSCLRecord[] = [
    {
        id: 'SSCL-2024-001',
        clientName: 'Omega Industries',
        clientId: 'CL-301',
        ssclNo: 'SSCL-555444',
        taxPeriod: '2024-01',
        status: 'Paid',
        branch: 'South',
        date: subDays(new Date(), 2),
    },
    {
        id: 'SSCL-2024-002',
        clientName: 'Delta Corp',
        clientId: 'CL-302',
        ssclNo: 'SSCL-333222',
        taxPeriod: '2024 Q1',
        status: 'Pending',
        branch: 'West',
        date: subDays(new Date(), 8),
    },
    {
        id: 'SSCL-2024-003',
        clientName: 'Theta Solutions',
        clientId: 'CL-303',
        ssclNo: 'SSCL-111000',
        taxPeriod: '2023 Annual',
        status: 'IRD Paid',
        branch: 'Central',
        date: subDays(new Date(), 25),
    },
];

const SSCLPage: React.FC = () => {
    const { records, addRecord, deleteRecord, deleteRecords } = useTaxPersistence<SSCLRecord>('sscl_records', INITIAL_DATA);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: string | null; isBulk?: boolean }>({ isOpen: false, id: null });
    const [viewRecord, setViewRecord] = useState<SSCLRecord | null>(null);

    const handleAddRecord = (data: SSCLFormData) => {
        const newRecord: SSCLRecord = {
            id: `SSCL-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            clientName: data.clientName,
            clientId: data.clientId,
            ssclNo: data.ssclNo,
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
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Social Security Contribution Levy (SSCL)</h1>
                        <p className="text-muted-foreground mt-1">Manage and track your social security tax filings.</p>
                    </div>
                </div>

                <section aria-label="New Record Entry">
                    <SSCLForm onSubmit={handleAddRecord} />
                </section>

                <section aria-label="Records Table">
                    <SSCLTable
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

export default SSCLPage;
