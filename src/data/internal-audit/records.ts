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

export const internalAuditRecords: Record[] = [
    { id: "IA-001", date: "2024-01-15", clientName: "Global Tech", paymentStatus: "Paid", process: "Reporting", branch: "South", assignment: "Internal audit for Q1 2024", periodNumber: "1", periodType: "Month" },
    { id: "IA-002", date: "2024-01-16", clientName: "Nexus Corp", paymentStatus: "Unpaid", process: "Meeting Complete", branch: "West", assignment: "Risk assessment and verification", periodNumber: "2024", periodType: "Year" },
    { id: "IA-003", date: "2024-01-18", clientName: "Vertex Solutions", paymentStatus: "Partial", process: "-", branch: "Central", assignment: "Financial controls review", periodNumber: "15", periodType: "Date" },
    { id: "IA-004", date: "2024-01-20", clientName: "Skyline Ventures", paymentStatus: "Paid", process: "Reporting", branch: "Northeast", assignment: "Compliance audit", periodNumber: "2", periodType: "Month" },
    { id: "IA-005", date: "2024-02-05", clientName: "Oceanic Ltd", paymentStatus: "Unpaid", process: "-", branch: "South", assignment: "Operational audit", periodNumber: "3", periodType: "Month" },
]
