export interface SourceDocument {
    id: string
    name: string
    description: string
    date: string
    size?: string
}

export interface Record {
    id: string
    date: string
    clientName: string
    paymentStatus: "Paid" | "Unpaid" | "Partial"
    process: string
    branch?: string
    clientLogo?: string
    assignment?: string
    paymentOption?: string
    sourceDocuments: SourceDocument[]
}

export const managementAccountRecords: Record[] = [
    {
        id: "MA-001",
        date: "2024-01-10",
        clientName: "Solaris Corp",
        paymentStatus: "Paid",
        process: "Bookkeep",
        branch: "South",
        assignment: "Annual management accounts preparation",
        paymentOption: "Online",
        sourceDocuments: [
            { id: "doc-1", name: "Bank_Statement_Jan.pdf", description: "January bank statements", date: "2024-01-15", size: "1.2MB" }
        ]
    },
    {
        id: "MA-002",
        date: "2024-01-12",
        clientName: "Luna Logistics",
        paymentStatus: "Unpaid",
        process: "Finalize",
        branch: "West",
        assignment: "Quarterly review and bookkeeping",
        paymentOption: "Cash",
        sourceDocuments: []
    },
    {
        id: "MA-003",
        date: "2024-02-05",
        clientName: "Nova Retail",
        paymentStatus: "Partial",
        process: "-",
        branch: "Central",
        assignment: "Monthly payroll and management reporting",
        paymentOption: "Cheque",
        sourceDocuments: [
            { id: "doc-2", name: "Invoices_Q1.zip", description: "Vendor invoices for Q1", date: "2024-02-06", size: "4.5MB" }
        ]
    },
    {
        id: "MA-004",
        date: "2024-02-20",
        clientName: "Apex Solutions",
        paymentStatus: "Paid",
        process: "Handover",
        branch: "Northeast",
        assignment: "Strategic financial planning accounts",
        paymentOption: "Online",
        sourceDocuments: [
            { id: "doc-3", name: "Final_Report.pdf", description: "Finalized management account report", date: "2024-02-21", size: "850KB" }
        ]
    },
]
