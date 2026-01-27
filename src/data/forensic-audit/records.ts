export interface Record {
    id: string
    date: string
    clientName: string
    paymentStatus: "Paid" | "Unpaid" | "Partial"
    process: string
    branch?: string
    clientLogo?: string
    assignment?: string
    periodNumber?: string
    periodType?: string
}

export const forensicAuditRecords: Record[] = [
    { id: "FA-001", date: "2024-01-20", clientName: "Titan Industries", paymentStatus: "Paid", process: "Reporting", branch: "South", assignment: "Fraud investigation for manufacturing division", periodNumber: "1", periodType: "Month" },
    { id: "FA-002", date: "2024-01-22", clientName: "Astra Finance", paymentStatus: "Unpaid", process: "Meeting Complete", branch: "West", assignment: "Anti-money laundering compliance review", periodNumber: "2024", periodType: "Year" },
    { id: "FA-003", date: "2024-02-01", clientName: "Ember Logistics", paymentStatus: "Partial", process: "-", branch: "Central", assignment: "Asset misappropriation audit", periodNumber: "15", periodType: "Date" },
    { id: "FA-004", date: "2024-02-10", clientName: "Solar Systems", paymentStatus: "Paid", process: "Reporting", branch: "Northeast", assignment: "Litigation support and data recovery", periodNumber: "2", periodType: "Month" },
    { id: "FA-005", date: "2024-02-15", clientName: "Velvet Retail", paymentStatus: "Unpaid", process: "-", branch: "South", assignment: "Inventory shrinkage investigation", periodNumber: "2023", periodType: "Year" },
]
