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
    }
];
