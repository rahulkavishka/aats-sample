import React, { useState } from 'react';
import CITForm, { type CITFormData } from './CITForm';
import CITTable from './CITTable';
import { addDays, subDays } from 'date-fns';
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

export type CITStatus = 'Paid' | 'Pending' | 'IRD Paid';
export type Branch = 'South' | 'West' | 'Central' | 'Northeast';

export interface CITRecord {
    id: string;
    clientName: string;
    clientId: string;
    dinNo: string;
    taxPeriod: string;
    status: CITStatus;
    branch: Branch;
    date: Date;
}

// Mock initial data
const INITIAL_DATA: CITRecord[] = [
    {
        id: 'CIT-2024-001',
        clientName: 'Acme Corp',
        clientId: 'CL-001',
        dinNo: 'DIN-8821',
        taxPeriod: '2024-01',
        status: 'Paid',
        branch: 'South',
        date: subDays(new Date(), 2),
    },
    {
        id: 'CIT-2024-002',
        clientName: 'Globex Inc',
        clientId: 'CL-002',
        dinNo: 'DIN-9932',
        taxPeriod: '2024 Q1',
        status: 'Pending',
        branch: 'West',
        date: subDays(new Date(), 15),
    },
    {
        id: 'CIT-2024-003',
        clientName: 'Soylent Corp',
        clientId: 'CL-003',
        dinNo: 'DIN-1123',
        taxPeriod: '2023 Annual',
        status: 'IRD Paid',
        branch: 'Central',
        date: subDays(new Date(), 45),
    },
    {
        id: 'CIT-2024-004',
        clientName: 'Initech',
        clientId: 'CL-004',
        dinNo: 'DIN-4451',
        taxPeriod: '2024-02',
        status: 'Paid',
        branch: 'Northeast',
        date: new Date(),
    },
    {
        id: 'CIT-2024-005',
        clientName: 'Umbrella Corp',
        clientId: 'CL-005',
        dinNo: 'DIN-6672',
        taxPeriod: '2024 Q2',
        status: 'Pending',
        branch: 'South',
        date: addDays(new Date(), 5),
    },
];

const CITPage: React.FC = () => {
    const { records, addRecord, deleteRecord, deleteRecords } = useTaxPersistence<CITRecord>('cit_records', INITIAL_DATA);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: string | null; isBulk?: boolean }>({ isOpen: false, id: null });
    const [viewRecord, setViewRecord] = useState<CITRecord | null>(null);

    const handleAddRecord = (data: CITFormData) => {
        const newRecord: CITRecord = {
            id: `CIT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            clientName: data.clientName,
            clientId: data.clientId,
            dinNo: data.dinNo,
            taxPeriod: `${data.period} ${data.periodUnit}`,
            status: data.status,
            // Randomly assign branch for demo as it's not in the form spec
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
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Corporate Income Tax (CIT)</h1>
                        <p className="text-muted-foreground mt-1">Manage and track your corporate tax filings.</p>
                    </div>
                </div>

                <section aria-label="New Record Entry">
                    <CITForm onSubmit={handleAddRecord} />
                </section>

                <section aria-label="Records Table">
                    <CITTable
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

export default CITPage;
