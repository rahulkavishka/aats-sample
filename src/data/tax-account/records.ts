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
    },
    { id: "TX-006", date: "2024-04-01", clientName: "Quantum Quest", assignment: "Sarah Jenkins", paymentStatus: "Paid", process: "Submit", branch: "Main Branch", subTotal: 1500, discount: 0, totalPayment: 1500, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-007", date: "2024-04-05", clientName: "Pulse Partners", assignment: "Michael Chen", paymentStatus: "Partial", process: "Tax Amount", branch: "City Center", subTotal: 2200, discount: 100, totalPayment: 2100, paymentOption: "Cash", sourceDocuments: [] },
    { id: "TX-008", date: "2024-04-10", clientName: "Future Flow", assignment: "Dennis Thompson", paymentStatus: "Unpaid", process: "Bookkeep", branch: "West Side", subTotal: 800, discount: 0, totalPayment: 800, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-009", date: "2024-04-15", clientName: "Global Grid", assignment: "Sarah Jenkins", paymentStatus: "Paid", process: "Finalize", branch: "Main Branch", subTotal: 3100, discount: 200, totalPayment: 2900, paymentOption: "Cheque", chequeDetails: { bankName: "City Bank", chequeNumber: "CHQ11223", chequeDate: "2024-04-15" }, sourceDocuments: [] },
    { id: "TX-010", date: "2024-04-20", clientName: "Bright Build", assignment: "Michael Chen", paymentStatus: "Partial", process: "Tax Paid", branch: "City Center", subTotal: 4600, discount: 0, totalPayment: 4600, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-011", date: "2024-05-01", clientName: "Streamline Soft", assignment: "Dennis Thompson", paymentStatus: "Unpaid", process: "Submit", branch: "West Side", subTotal: 1900, discount: 100, totalPayment: 1800, paymentOption: "Cash", sourceDocuments: [] },
    { id: "TX-012", date: "2024-05-05", clientName: "Peak Port", assignment: "Sarah Jenkins", paymentStatus: "Paid", process: "Tax Amount", branch: "Main Branch", subTotal: 2700, discount: 0, totalPayment: 2700, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-013", date: "2024-05-10", clientName: "Iron Image", assignment: "Michael Chen", paymentStatus: "Partial", process: "Bookkeep", branch: "City Center", subTotal: 1300, discount: 50, totalPayment: 1250, paymentOption: "Cheque", chequeDetails: { bankName: "Global Bank", chequeNumber: "CHQ44556", chequeDate: "2024-05-10" }, sourceDocuments: [] },
    { id: "TX-014", date: "2024-05-20", clientName: "Soft System", assignment: "Dennis Thompson", paymentStatus: "Unpaid", process: "Finalize", branch: "West Side", subTotal: 3400, discount: 0, totalPayment: 3400, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-015", date: "2024-06-01", clientName: "Quick Quest", assignment: "Sarah Jenkins", paymentStatus: "Paid", process: "Tax Paid", branch: "Main Branch", subTotal: 5200, discount: 500, totalPayment: 4700, paymentOption: "Cash", sourceDocuments: [] },
    { id: "TX-016", date: "2024-06-05", clientName: "True Trust", assignment: "Michael Chen", paymentStatus: "Partial", process: "Submit", branch: "City Center", subTotal: 2100, discount: 0, totalPayment: 2100, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-017", date: "2024-06-10", clientName: "Blue Bird", assignment: "Dennis Thompson", paymentStatus: "Unpaid", process: "Tax Amount", branch: "West Side", subTotal: 1600, discount: 100, totalPayment: 1500, paymentOption: "Cheque", chequeDetails: { bankName: "First National", chequeNumber: "CHQ77889", chequeDate: "2024-06-10" }, sourceDocuments: [] },
    { id: "TX-018", date: "2024-06-20", clientName: "Red Rocket", assignment: "Sarah Jenkins", paymentStatus: "Paid", process: "Bookkeep", branch: "Main Branch", subTotal: 4400, discount: 400, totalPayment: 4000, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-019", date: "2024-07-01", clientName: "Green Growth", assignment: "Michael Chen", paymentStatus: "Partial", process: "Finalize", branch: "City Center", subTotal: 3800, discount: 0, totalPayment: 3800, paymentOption: "Cash", sourceDocuments: [] },
    { id: "TX-020", date: "2024-07-05", clientName: "Sky Scraper", assignment: "Dennis Thompson", paymentStatus: "Unpaid", process: "Tax Paid", branch: "West Side", subTotal: 2500, discount: 200, totalPayment: 2300, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-021", date: "2024-07-10", clientName: "Deep Dive", assignment: "Sarah Jenkins", paymentStatus: "Paid", process: "Submit", branch: "Main Branch", subTotal: 6000, discount: 600, totalPayment: 5400, paymentOption: "Cheque", chequeDetails: { bankName: "City Bank", chequeNumber: "CHQ99001", chequeDate: "2024-07-10" }, sourceDocuments: [] },
    { id: "TX-022", date: "2024-07-15", clientName: "Fast Track", assignment: "Michael Chen", paymentStatus: "Partial", process: "Tax Amount", branch: "City Center", subTotal: 1700, discount: 0, totalPayment: 1700, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-023", date: "2024-07-20", clientName: "Solid State", assignment: "Dennis Thompson", paymentStatus: "Unpaid", process: "Bookkeep", branch: "West Side", subTotal: 1100, discount: 50, totalPayment: 1050, paymentOption: "Cash", sourceDocuments: [] },
    { id: "TX-024", date: "2024-07-25", clientName: "Liquid Logic", assignment: "Sarah Jenkins", paymentStatus: "Paid", process: "Finalize", branch: "Main Branch", subTotal: 4800, discount: 300, totalPayment: 4500, paymentOption: "Online", sourceDocuments: [] },
    { id: "TX-025", date: "2024-07-30", clientName: "Fire Fly", assignment: "Michael Chen", paymentStatus: "Partial", process: "Tax Paid", branch: "City Center", subTotal: 3300, discount: 0, totalPayment: 3300, paymentOption: "Cheque", chequeDetails: { bankName: "Global Bank", chequeNumber: "CHQ22334", chequeDate: "2024-07-30" }, sourceDocuments: [] }
];
