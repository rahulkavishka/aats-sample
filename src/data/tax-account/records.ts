export interface SourceDocument {
    id: string;
    name: string;
    uploadDate: string;
    description?: string;
}

export interface Record {
    id: string;
    date: string;
    clientName: string;
    assignment: string;
    paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
    process: 'Bookkeep' | 'Tax Amount' | 'Finalize' | 'Tax Paid' | 'Submit';
    branch: string;
    subTotal: number;
    discount: number;
    totalPayment: number;
    paymentOption: 'Cash' | 'Online' | 'Cheque';
    chequeDetails?: {
        bankName: string;
        chequeNumber: string;
        chequeDate: string;
    };
    partialPaymentDetails?: {
        paidAmount: number;
        remainingAmount: number;
    };
    sourceDocuments: SourceDocument[];
}

export const taxRecords: Record[] = [
    {
        id: "TX-001",
        date: "2024-03-15",
        clientName: "Green Energy Corp",
        assignment: "Sarah Jenkins",
        paymentStatus: "Paid",
        process: "Submit",
        branch: "Main Branch",
        subTotal: 5000,
        discount: 500,
        totalPayment: 4500,
        paymentOption: "Online",
        sourceDocuments: [
            { id: "doc-1", name: "Q1_Tax_Returns.pdf", uploadDate: "2024-03-15", description: "Final tax returns for Q1" }
        ],
    },
    {
        id: "TX-002",
        date: "2024-03-18",
        clientName: "Blue Ocean Logistics",
        assignment: "Michael Chen",
        paymentStatus: "Partial",
        process: "Tax Amount",
        branch: "City Center",
        subTotal: 3500,
        discount: 0,
        totalPayment: 3500,
        paymentOption: "Cheque",
        chequeDetails: {
            bankName: "Global Bank",
            chequeNumber: "CHQ88221",
            chequeDate: "2024-03-18"
        },
        partialPaymentDetails: {
            paidAmount: 2000,
            remainingAmount: 1500
        },
        sourceDocuments: [],
    },
    {
        id: "TX-003",
        date: "2024-03-20",
        clientName: "TechNova Solutions",
        assignment: "Sarah Jenkins",
        paymentStatus: "Unpaid",
        process: "Bookkeep",
        branch: "Main Branch",
        subTotal: 1200,
        discount: 100,
        totalPayment: 1100,
        paymentOption: "Cash",
        sourceDocuments: [],
    },
    {
        id: "TX-004",
        date: "2024-03-22",
        clientName: "Sunrise Retail",
        assignment: "Dennis Thompson",
        paymentStatus: "Paid",
        process: "Finalize",
        branch: "West Side",
        subTotal: 2800,
        discount: 280,
        totalPayment: 2520,
        paymentOption: "Online",
        sourceDocuments: [
            { id: "doc-2", name: "Invoices_Batch_A.zip", uploadDate: "2024-03-22" }
        ],
    },
    {
        id: "TX-005",
        date: "2024-03-25",
        clientName: "Pioneer Manufacturing",
        assignment: "Michael Chen",
        paymentStatus: "Unpaid",
        process: "Tax Paid",
        branch: "City Center",
        subTotal: 4200,
        discount: 0,
        totalPayment: 4200,
        paymentOption: "Cheque",
        chequeDetails: {
            bankName: "First National",
            chequeNumber: "CHQ55110",
            chequeDate: "2024-03-25"
        },
        sourceDocuments: [],
    }
];
