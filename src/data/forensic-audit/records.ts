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
    { id: "FA-006", date: "2024-02-28", clientName: "Aurora Solutions", paymentStatus: "Paid", process: "Reporting", branch: "West", assignment: "Corporate espionage investigation", periodNumber: "2", periodType: "Month" },
    { id: "FA-007", date: "2024-03-05", clientName: "Nebula Partners", paymentStatus: "Partial", process: "Meeting Complete", branch: "Central", assignment: "Procurement fraud audit", periodNumber: "2024", periodType: "Year" },
    { id: "FA-008", date: "2024-03-12", clientName: "Quest Global", paymentStatus: "Unpaid", process: "-", branch: "Northeast", assignment: "Intellectual property theft probe", periodNumber: "5", periodType: "Date" },
    { id: "FA-009", date: "2024-03-18", clientName: "Apex Limited", paymentStatus: "Paid", process: "Reporting", branch: "South", assignment: "Financial statement reconstruction", periodNumber: "3", periodType: "Month" },
    { id: "FA-010", date: "2024-03-25", clientName: "Summit Corp", paymentStatus: "Partial", process: "Meeting Complete", branch: "West", assignment: "Money laundering risk assessment", periodNumber: "2024", periodType: "Year" },
    { id: "FA-011", date: "2024-04-02", clientName: "Vantage Group", paymentStatus: "Unpaid", process: "-", branch: "Central", assignment: "Vendor kickback investigation", periodNumber: "4", periodType: "Month" },
    { id: "FA-012", date: "2024-04-10", clientName: "Evolve Systems", paymentStatus: "Paid", process: "Reporting", branch: "Northeast", assignment: "Digital forensics for breach analysis", periodNumber: "12", periodType: "Date" },
    { id: "FA-013", date: "2024-04-18", clientName: "Origin Services", paymentStatus: "Partial", process: "Meeting Complete", branch: "South", assignment: "Payroll fraud detection", periodNumber: "2024", periodType: "Year" },
    { id: "FA-014", date: "2024-04-25", clientName: "Matrix Industries", paymentStatus: "Unpaid", process: "-", branch: "West", assignment: "Asset tracing for legal dispute", periodNumber: "2023", periodType: "Year" },
    { id: "FA-015", date: "2024-05-01", clientName: "Prism Retail", paymentStatus: "Paid", process: "Reporting", branch: "Central", assignment: "Counterfeit goods investigation", periodNumber: "5", periodType: "Month" },
    { id: "FA-016", date: "2024-05-08", clientName: "Flux Energy", paymentStatus: "Partial", process: "Meeting Complete", branch: "Northeast", assignment: "Corruption and bribery audit", periodNumber: "15", periodType: "Date" },
    { id: "FA-017", date: "2024-05-15", clientName: "Zenith Tech", paymentStatus: "Unpaid", process: "-", branch: "South", assignment: "Insider trading investigation", periodNumber: "2024", periodType: "Year" },
    { id: "FA-018", date: "2024-05-22", clientName: "Orbit Logistics", paymentStatus: "Paid", process: "Reporting", branch: "West", assignment: "Insurance claim verification", periodNumber: "6", periodType: "Month" },
    { id: "FA-019", date: "2024-06-01", clientName: "Vista Finances", paymentStatus: "Partial", process: "Meeting Complete", branch: "Central", assignment: "Whistleblower allegation review", periodNumber: "2024", periodType: "Year" },
    { id: "FA-020", date: "2024-06-10", clientName: "Core Dynamics", paymentStatus: "Unpaid", process: "-", branch: "Northeast", assignment: "Data tampering investigation", periodNumber: "10", periodType: "Date" },
    { id: "FA-021", date: "2024-06-15", clientName: "Bridge Partners", paymentStatus: "Paid", process: "Reporting", branch: "South", assignment: "Regulatory compliance forensic audit", periodNumber: "2024", periodType: "Year" },
    { id: "FA-022", date: "2024-06-25", clientName: "Scope Systems", paymentStatus: "Partial", process: "Meeting Complete", branch: "West", assignment: "Conflict of interest probe", periodNumber: "7", periodType: "Month" },
    { id: "FA-023", date: "2024-07-01", clientName: "Trend Micro", paymentStatus: "Unpaid", process: "-", branch: "Central", assignment: "Phishing attack source tracing", periodNumber: "2024", periodType: "Year" },
    { id: "FA-024", date: "2024-07-10", clientName: "Rapid Results", paymentStatus: "Paid", process: "Reporting", branch: "Northeast", assignment: "Financial fraud background check", periodNumber: "25", periodType: "Date" },
    { id: "FA-025", date: "2024-07-20", clientName: "Safe Harbours", paymentStatus: "Partial", process: "Meeting Complete", branch: "South", assignment: "Tax evasion investigation support", periodNumber: "8", periodType: "Month" }
]
