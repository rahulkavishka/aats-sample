export interface Record {
    id: string;
    date: string;
    clientName: string;
    assignment: string;
    periodNumber: string;
    periodType: 'Date' | 'Month' | 'Year';
    paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
    process: 'Reporting' | 'Meeting Complete' | '';
    branch: string;
    subTotal: number;
    discount: number;
    totalPayment: number;
    paymentOption: 'Cash' | 'Online' | 'Cheque';
    chequeDetails?: {
        bankName: string;
        chequeNumber: string;
        chequeDate: string;
        status: 'Pending' | 'Cleared' | 'Return';
    };
    partialPaymentDetails?: {
        paidAmount: number;
        remainingAmount: number;
    };
    notes?: string;
}

export const internalControlRecords: Record[] = [
    {
        id: "IC-001",
        date: "2024-03-10",
        clientName: "Alpha Manufacturing",
        assignment: "Internal control audit for inventory management systems.",
        periodNumber: "1",
        periodType: "Year",
        paymentStatus: "Paid",
        process: "Meeting Complete",
        branch: "Main Branch",
        subTotal: 8000,
        discount: 800,
        totalPayment: 7200,
        paymentOption: "Online",
    },
    {
        id: "IC-002",
        date: "2024-03-12",
        clientName: "Beta Services",
        assignment: "Outsourcing of payroll processing for Q1.",
        periodNumber: "3",
        periodType: "Month",
        paymentStatus: "Partial",
        process: "Reporting",
        branch: "City Center",
        subTotal: 4500,
        discount: 0,
        totalPayment: 4500,
        paymentOption: "Cheque",
        chequeDetails: {
            bankName: "First National",
            chequeNumber: "CHQ99112",
            chequeDate: "2024-03-12",
            status: "Pending"
        },
        partialPaymentDetails: {
            paidAmount: 2500,
            remainingAmount: 2000
        }
    },
    {
        id: "IC-003",
        date: "2024-03-15",
        clientName: "Gamma Retailers",
        assignment: "Review of point-of-sale internal controls.",
        periodNumber: "20",
        periodType: "Date",
        paymentStatus: "Unpaid",
        process: "",
        branch: "Main Branch",
        subTotal: 1500,
        discount: 50,
        totalPayment: 1450,
        paymentOption: "Cash"
    },
    { id: "IC-004", date: "2024-03-20", clientName: "Quantum Quest", assignment: "IT security controls audit", periodNumber: "1", periodType: "Year", paymentStatus: "Paid", process: "Meeting Complete", branch: "City Center", subTotal: 5000, discount: 0, totalPayment: 5000, paymentOption: "Online" },
    { id: "IC-005", date: "2024-03-25", clientName: "Pulse Partners", assignment: "Payroll outsourcing service", periodNumber: "4", periodType: "Month", paymentStatus: "Partial", process: "Reporting", branch: "Main Branch", subTotal: 3000, discount: 100, totalPayment: 2900, paymentOption: "Cheque", chequeDetails: { bankName: "City Bank", chequeNumber: "CHQ55110", chequeDate: "2024-03-25", status: "Cleared" } },
    { id: "IC-006", date: "2024-04-01", clientName: "Future Flow", assignment: "Internal control documentation", periodNumber: "15", periodType: "Date", paymentStatus: "Unpaid", process: "", branch: "City Center", subTotal: 1200, discount: 0, totalPayment: 1200, paymentOption: "Cash" },
    { id: "IC-007", date: "2024-04-05", clientName: "Global Grid", assignment: "Risk management framework review", periodNumber: "2024", periodType: "Year", paymentStatus: "Paid", process: "Meeting Complete", branch: "Main Branch", subTotal: 7500, discount: 500, totalPayment: 7000, paymentOption: "Online" },
    { id: "IC-008", date: "2024-04-10", clientName: "Bright Build", assignment: "Fixed asset control audit", periodNumber: "2", periodType: "Month", paymentStatus: "Partial", process: "Reporting", branch: "City Center", subTotal: 4000, discount: 0, totalPayment: 4000, paymentOption: "Online" },
    { id: "IC-009", date: "2024-04-15", clientName: "Streamline Soft", assignment: "Inventory control assessment", periodNumber: "10", periodType: "Date", paymentStatus: "Unpaid", process: "", branch: "Main Branch", subTotal: 1800, discount: 50, totalPayment: 1750, paymentOption: "Cash" },
    { id: "IC-010", date: "2024-05-01", clientName: "Peak Port", assignment: "Procurement outsourcing review", periodNumber: "2023", periodType: "Year", paymentStatus: "Paid", process: "Meeting Complete", branch: "City Center", subTotal: 6200, discount: 0, totalPayment: 6200, paymentOption: "Online" },
    { id: "IC-011", date: "2024-05-05", clientName: "Iron Image", assignment: "Data privacy control audit", periodNumber: "5", periodType: "Month", paymentStatus: "Partial", process: "Reporting", branch: "Main Branch", subTotal: 3500, discount: 200, totalPayment: 3300, paymentOption: "Cheque", chequeDetails: { bankName: "Global Bank", chequeNumber: "CHQ33445", chequeDate: "2024-05-05", status: "Pending" } },
    { id: "IC-012", date: "2024-05-10", clientName: "Soft System", assignment: "Financial reporting controls", periodNumber: "30", periodType: "Date", paymentStatus: "Unpaid", process: "", branch: "City Center", subTotal: 2000, discount: 0, totalPayment: 2000, paymentOption: "Cash" },
    { id: "IC-013", date: "2024-05-15", clientName: "Quick Quest", assignment: "HR function outsourcing audit", periodNumber: "2024", periodType: "Year", paymentStatus: "Paid", process: "Meeting Complete", branch: "Main Branch", subTotal: 5800, discount: 300, totalPayment: 5500, paymentOption: "Online" },
    { id: "IC-014", date: "2024-05-20", clientName: "True Trust", assignment: "Internal audit function review", periodNumber: "6", periodType: "Month", paymentStatus: "Partial", process: "Reporting", branch: "City Center", subTotal: 4200, discount: 0, totalPayment: 4200, paymentOption: "Online" },
    { id: "IC-015", date: "2024-06-01", clientName: "Blue Bird", assignment: "Compliance control mapping", periodNumber: "25", periodType: "Date", paymentStatus: "Unpaid", process: "", branch: "Main Branch", subTotal: 1400, discount: 100, totalPayment: 1300, paymentOption: "Cash" },
    { id: "IC-016", date: "2024-06-05", clientName: "Red Rocket", assignment: "Logistics outsourcing oversight", periodNumber: "2023", periodType: "Year", paymentStatus: "Paid", process: "Meeting Complete", branch: "City Center", subTotal: 9000, discount: 1000, totalPayment: 8000, paymentOption: "Online" },
    { id: "IC-017", date: "2024-06-10", clientName: "Green Growth", assignment: "Operational efficiency audit", periodNumber: "3", periodType: "Month", paymentStatus: "Partial", process: "Reporting", branch: "Main Branch", subTotal: 3800, discount: 0, totalPayment: 3800, paymentOption: "Cheque", chequeDetails: { bankName: "First National", chequeNumber: "CHQ22334", chequeDate: "2024-06-10", status: "Cleared" } },
    { id: "IC-018", date: "2024-06-15", clientName: "Sky Scraper", assignment: "E-commerce control framework", periodNumber: "12", periodType: "Date", paymentStatus: "Unpaid", process: "", branch: "City Center", subTotal: 2500, discount: 0, totalPayment: 2500, paymentOption: "Cash" },
    { id: "IC-019", date: "2024-07-01", clientName: "Deep Dive", assignment: "Environmental control audit", periodNumber: "2024", periodType: "Year", paymentStatus: "Paid", process: "Meeting Complete", branch: "Main Branch", subTotal: 7000, discount: 700, totalPayment: 6300, paymentOption: "Online" },
    { id: "IC-020", date: "2024-07-05", clientName: "Fast Track", assignment: "Supply chain risk controls", periodNumber: "7", periodType: "Month", paymentStatus: "Partial", process: "Reporting", branch: "City Center", subTotal: 4500, discount: 0, totalPayment: 4500, paymentOption: "Online" },
    { id: "IC-021", date: "2024-07-10", clientName: "Solid State", assignment: "Internal control maturity model", periodNumber: "20", periodType: "Date", paymentStatus: "Unpaid", process: "", branch: "Main Branch", subTotal: 3200, discount: 200, totalPayment: 3000, paymentOption: "Cash" },
    { id: "IC-022", date: "2024-07-15", clientName: "Liquid Logic", assignment: "Quality management controls", periodNumber: "2024", periodType: "Year", paymentStatus: "Paid", process: "Meeting Complete", branch: "City Center", subTotal: 5500, discount: 0, totalPayment: 5500, paymentOption: "Online" },
    { id: "IC-023", date: "2024-07-20", clientName: "Fire Fly", assignment: "Brand protection controls", periodNumber: "4", periodType: "Month", paymentStatus: "Partial", process: "Reporting", branch: "Main Branch", subTotal: 2800, discount: 100, totalPayment: 2700, paymentOption: "Cheque", chequeDetails: { bankName: "Global Bank", chequeNumber: "CHQ77889", chequeDate: "2024-07-20", status: "Pending" } },
    { id: "IC-024", date: "2024-07-25", clientName: "Cool Calm", assignment: "Crisis management controls", periodNumber: "18", periodType: "Date", paymentStatus: "Unpaid", process: "", branch: "City Center", subTotal: 1600, discount: 0, totalPayment: 1600, paymentOption: "Cash" },
    { id: "IC-025", date: "2024-07-30", clientName: "Alpha Omega", assignment: "Ultimate control review", periodNumber: "2024", periodType: "Year", paymentStatus: "Paid", process: "Meeting Complete", branch: "Main Branch", subTotal: 10000, discount: 1500, totalPayment: 8500, paymentOption: "Online" }
];
