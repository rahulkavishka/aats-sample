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
    { id: "IA-006", date: "2024-02-10", clientName: "Peak performance", paymentStatus: "Paid", process: "Reporting", branch: "West", assignment: "Quarterly Review", periodNumber: "1", periodType: "Month" },
    { id: "IA-007", date: "2024-02-15", clientName: "Swift Systems", paymentStatus: "Partial", process: "Meeting Complete", branch: "Central", assignment: "IT Control Audit", periodNumber: "2024", periodType: "Year" },
    { id: "IA-008", date: "2024-03-01", clientName: "Golden Gate", paymentStatus: "Unpaid", process: "-", branch: "Northeast", assignment: "Compliance Check", periodNumber: "10", periodType: "Date" },
    { id: "IA-009", date: "2024-03-05", clientName: "Silver Lining", paymentStatus: "Paid", process: "Reporting", branch: "South", assignment: "Annual Audit", periodNumber: "2023", periodType: "Year" },
    { id: "IA-010", date: "2024-03-10", clientName: "Bronze Age", paymentStatus: "Partial", process: "Meeting Complete", branch: "West", assignment: "Inventory Audit", periodNumber: "6", periodType: "Month" },
    { id: "IA-011", date: "2024-03-15", clientName: "Platinum Plus", paymentStatus: "Unpaid", process: "-", branch: "Central", assignment: "Financial Review", periodNumber: "2024", periodType: "Year" },
    { id: "IA-012", date: "2024-04-01", clientName: "Diamond Diggers", paymentStatus: "Paid", process: "Reporting", branch: "Northeast", assignment: "External Audit Prep", periodNumber: "4", periodType: "Month" },
    { id: "IA-013", date: "2024-04-05", clientName: "Emerald City", paymentStatus: "Partial", process: "Meeting Complete", branch: "South", assignment: "Process Optimization", periodNumber: "12", periodType: "Date" },
    { id: "IA-014", date: "2024-04-10", clientName: "Ruby Rails", paymentStatus: "Unpaid", process: "-", branch: "West", assignment: "Safety Audit", periodNumber: "2024", periodType: "Year" },
    { id: "IA-015", date: "2024-04-20", clientName: "Sapphire Sun", paymentStatus: "Paid", process: "Reporting", branch: "Central", assignment: "HR Audit", periodNumber: "5", periodType: "Month" },
    { id: "IA-016", date: "2024-05-01", clientName: "Topaz Tech", paymentStatus: "Partial", process: "Meeting Complete", branch: "Northeast", assignment: "Supply Chain Audit", periodNumber: "2023", periodType: "Year" },
    { id: "IA-017", date: "2024-05-15", clientName: "Opal Office", paymentStatus: "Unpaid", process: "-", branch: "South", assignment: "Asset Management Review", periodNumber: "8", periodType: "Month" },
    { id: "IA-018", date: "2024-06-01", clientName: "Quartz Quality", paymentStatus: "Paid", process: "Reporting", branch: "West", assignment: "Quality Assurance", periodNumber: "20", periodType: "Date" },
    { id: "IA-019", date: "2024-06-10", clientName: "Zircon Zephyr", paymentStatus: "Partial", process: "Meeting Complete", branch: "Central", assignment: "Tax Compliance", periodNumber: "2024", periodType: "Year" },
    { id: "IA-020", date: "2024-06-20", clientName: "Amber Alert", paymentStatus: "Unpaid", process: "-", branch: "Northeast", assignment: "Security Review", periodNumber: "9", periodType: "Month" },
    { id: "IA-021", date: "2024-07-01", clientName: "Jet Stream", paymentStatus: "Paid", process: "Reporting", branch: "South", assignment: "Marketing Audit", periodNumber: "2024", periodType: "Year" },
    { id: "IA-022", date: "2024-07-05", clientName: "Coral Reef", paymentStatus: "Partial", process: "Meeting Complete", branch: "West", assignment: "Environmental Audit", periodNumber: "3", periodType: "Month" },
    { id: "IA-023", date: "2024-07-10", clientName: "Pearl Port", paymentStatus: "Unpaid", process: "-", branch: "Central", assignment: "Logistics Review", periodNumber: "14", periodType: "Date" },
    { id: "IA-024", date: "2024-07-15", clientName: "Jade Junction", paymentStatus: "Paid", process: "Reporting", branch: "Northeast", assignment: "Strategic Audit", periodNumber: "2024", periodType: "Year" },
    { id: "IA-025", date: "2024-07-20", clientName: "Onyx Online", paymentStatus: "Partial", process: "Meeting Complete", branch: "South", assignment: "Digital Transformation Review", periodNumber: "7", periodType: "Month" }
]
