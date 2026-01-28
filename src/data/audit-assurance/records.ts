export interface Record {
    id: string
    date: string
    clientName: string
    paymentStatus: "Paid" | "Unpaid" | "Partial"
    process: string
    branch?: string
}

export const mockRecords: Record[] = [
    { id: "REC-001", date: "2024-01-15", clientName: "Acme Corp", paymentStatus: "Paid", process: "Bookkeep", branch: "South" },
    { id: "REC-002", date: "2024-01-16", clientName: "Beta LLC", paymentStatus: "Unpaid", process: "Draft", branch: "West" },
    { id: "REC-003", date: "2024-01-18", clientName: "Gamma Inc", paymentStatus: "Partial", process: "Finalize", branch: "Central" },
    { id: "REC-004", date: "2024-01-20", clientName: "Delta Co", paymentStatus: "Paid", process: "Handover", branch: "Northeast" },
    { id: "REC-005", date: "2024-02-05", clientName: "Epsilon Enterprises", paymentStatus: "Unpaid", process: "Submit", branch: "South" },
    { id: "REC-006", date: "2024-02-10", clientName: "Zeta Partners", paymentStatus: "Partial", process: "Bookkeep", branch: "West" },
    { id: "REC-007", date: "2024-02-15", clientName: "Eta Solutions", paymentStatus: "Paid", process: "Return", branch: "Central" },
    { id: "REC-008", date: "2024-03-01", clientName: "Theta Group", paymentStatus: "Unpaid", process: "Draft", branch: "Northeast" },
    { id: "REC-009", date: "2024-03-05", clientName: "Iota Holdings", paymentStatus: "Paid", process: "Handover", branch: "South" },
    { id: "REC-010", date: "2024-03-10", clientName: "Kappa Systems", paymentStatus: "Partial", process: "Finalize", branch: "West" },
    { id: "REC-011", date: "2024-03-15", clientName: "Lambda Tech", paymentStatus: "Unpaid", process: "Submit", branch: "Central" },
    { id: "REC-012", date: "2024-04-01", clientName: "Mu Industries", paymentStatus: "Paid", process: "Return", branch: "Northeast" },
    { id: "REC-013", date: "2024-04-05", clientName: "Nu Ventures", paymentStatus: "Partial", process: "Bookkeep", branch: "South" },
    { id: "REC-014", date: "2024-04-10", clientName: "Xi Logistics", paymentStatus: "Paid", process: "Draft", branch: "West" },
    { id: "REC-015", date: "2024-04-20", clientName: "Omicron Retail", paymentStatus: "Unpaid", process: "Handover", branch: "Central" },
    { id: "REC-016", date: "2024-05-01", clientName: "Pi Consultants", paymentStatus: "Paid", process: "Finalize", branch: "Northeast" },
    { id: "REC-017", date: "2024-05-15", clientName: "Rho Traders", paymentStatus: "Partial", process: "Submit", branch: "South" },
    { id: "REC-018", date: "2024-06-01", clientName: "Sigma Data", paymentStatus: "Unpaid", process: "Bookkeep", branch: "West" },
    { id: "REC-019", date: "2024-06-10", clientName: "Tau Finances", paymentStatus: "Paid", process: "Draft", branch: "Central" },
    { id: "REC-020", date: "2024-06-20", clientName: "Upsilon Services", paymentStatus: "Unpaid", process: "Return", branch: "Northeast" },
    { id: "REC-021", date: "2024-07-01", clientName: "Phi Manufacturing", paymentStatus: "Partial", process: "Handover", branch: "South" },
    { id: "REC-022", date: "2024-07-05", clientName: "Chi Electronics", paymentStatus: "Paid", process: "Bookkeep", branch: "West" },
    { id: "REC-023", date: "2024-07-10", clientName: "Psi Aerospace", paymentStatus: "Unpaid", process: "Draft", branch: "Central" },
    { id: "REC-024", date: "2024-07-15", clientName: "Omega Energy", paymentStatus: "Paid", process: "Finalize", branch: "Northeast" },
    { id: "REC-025", date: "2024-07-20", clientName: "Alpha Logistics", paymentStatus: "Partial", process: "Handover", branch: "South" }
]
