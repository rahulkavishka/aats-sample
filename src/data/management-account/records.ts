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
    { id: "MA-005", date: "2024-03-01", clientName: "Quantum Leap", paymentStatus: "Unpaid", process: "Bookkeep", branch: "South", assignment: "General ledger maintenance", paymentOption: "Cash", sourceDocuments: [] },
    { id: "MA-006", date: "2024-03-05", clientName: "Pulse Media", paymentStatus: "Paid", process: "Finalize", branch: "West", assignment: "Monthly P&L reporting", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-007", date: "2024-03-10", clientName: "Future Flow", paymentStatus: "Partial", process: "-", branch: "Central", assignment: "Cash flow optimization", paymentOption: "Cheque", sourceDocuments: [] },
    { id: "MA-008", date: "2024-03-15", clientName: "Global Goods", paymentStatus: "Paid", process: "Handover", branch: "Northeast", assignment: "Year-end projections", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-009", date: "2024-03-22", clientName: "Bright Beam", paymentStatus: "Unpaid", process: "Bookkeep", branch: "South", assignment: "AR/AP reconciliation", paymentOption: "Cash", sourceDocuments: [] },
    { id: "MA-010", date: "2024-04-01", clientName: "Streamline Co", paymentStatus: "Paid", process: "Finalize", branch: "West", assignment: "Budgeting and forecasting", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-011", date: "2024-04-05", clientName: "Peak Power", paymentStatus: "Partial", process: "-", branch: "Central", assignment: "Cost reduction analysis", paymentOption: "Cheque", sourceDocuments: [] },
    { id: "MA-012", date: "2024-04-10", clientName: "Iron Works", paymentStatus: "Paid", process: "Handover", branch: "Northeast", assignment: "Capital expenditure audit", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-013", date: "2024-04-20", clientName: "Soft Serve", paymentStatus: "Unpaid", process: "Bookkeep", branch: "South", assignment: "Subscription revenue tracking", paymentOption: "Cash", sourceDocuments: [] },
    { id: "MA-014", date: "2024-05-01", clientName: "Quick Quest", paymentStatus: "Paid", process: "Finalize", branch: "West", assignment: "EBITDA analysis", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-015", date: "2024-05-08", clientName: "True Trust", paymentStatus: "Partial", process: "-", branch: "Central", assignment: "Trust fund accounting", paymentOption: "Cheque", sourceDocuments: [] },
    { id: "MA-016", date: "2024-05-15", clientName: "Blue Bird", paymentStatus: "Paid", process: "Handover", branch: "Northeast", assignment: "Dividends calculation", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-017", date: "2024-05-22", clientName: "Red Rocket", paymentStatus: "Unpaid", process: "Bookkeep", branch: "South", assignment: "Inventory valuation", paymentOption: "Cash", sourceDocuments: [] },
    { id: "MA-018", date: "2024-06-01", clientName: "Green Growth", paymentStatus: "Paid", process: "Finalize", branch: "West", assignment: "Sustainability reporting", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-019", date: "2024-06-10", clientName: "Sky Scraper", paymentStatus: "Partial", process: "-", branch: "Central", assignment: "Fixed asset register", paymentOption: "Cheque", sourceDocuments: [] },
    { id: "MA-020", date: "2024-06-15", clientName: "Deep Dive", paymentStatus: "Paid", process: "Handover", branch: "Northeast", assignment: "Deep margin analysis", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-021", date: "2024-06-25", clientName: "Fast Track", paymentStatus: "Unpaid", process: "Bookkeep", branch: "South", assignment: "Express audit prep", paymentOption: "Cash", sourceDocuments: [] },
    { id: "MA-022", date: "2024-07-01", clientName: "Solid State", paymentStatus: "Paid", process: "Finalize", branch: "West", assignment: "Quarterly tax strategy", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-023", date: "2024-07-05", clientName: "Liquid Logic", paymentStatus: "Partial", process: "-", branch: "Central", assignment: "Liquidity ratio analysis", paymentOption: "Cheque", sourceDocuments: [] },
    { id: "MA-024", date: "2024-07-10", clientName: "Fire Fly", paymentStatus: "Paid", process: "Handover", branch: "Northeast", assignment: "Burn rate assessment", paymentOption: "Online", sourceDocuments: [] },
    { id: "MA-025", date: "2024-07-15", clientName: "Cool Calm", paymentStatus: "Partial", process: "Bookkeep", branch: "South", assignment: "Risk mitigation accounts", paymentOption: "Online", sourceDocuments: [] }
]
