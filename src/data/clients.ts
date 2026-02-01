export type Client = {
    id: string;
    clientName: string;
    email: string;
    phone: string;
    category: "Corporate" | "Individual" | "SME";
    status: "Active" | "Inactive" | "Pending";
    lastActive: string;
    totalRevenue: number;
    outstandingBalance: number;
    // Relationship manager or other fields could go here
};

export const mockClients: Client[] = [
    {
        id: "CLT-001",
        clientName: "Titan Industries",
        email: "titan.industries@example.com",
        phone: "+94 77 XXX XXXX",
        category: "SME",
        status: "Active",
        lastActive: "2023-09-25",
        totalRevenue: 1250000,
        outstandingBalance: 59200
    },
    {
        id: "CLT-002",
        clientName: "Astra Finance",
        email: "info@astrafinance.com",
        phone: "+94 71 XXX XXXX",
        category: "Corporate",
        status: "Active",
        lastActive: "2023-11-17",
        totalRevenue: 2500000,
        outstandingBalance: 0
    },
    {
        id: "CLT-003",
        clientName: "Ember Logistics",
        email: "info@emberlogistics.com",
        phone: "+94 11 XXX XXXX",
        category: "Corporate",
        status: "Active",
        lastActive: "2023-10-10",
        totalRevenue: 4500000,
        outstandingBalance: 0
    },
    {
        id: "CLT-004",
        clientName: "Solar Systems",
        email: "info@solarsystems.lk",
        phone: "+94 11 XXX XXXX",
        category: "Corporate",
        status: "Active",
        lastActive: "2023-12-20",
        totalRevenue: 8500000,
        outstandingBalance: 500000
    },
    {
        id: "CLT-005",
        clientName: "Velvet Retail",
        email: "info@velvetretail.lk",
        phone: "+94 11 XXX XXXX",
        category: "Corporate",
        status: "Active",
        lastActive: "2023-11-05",
        totalRevenue: 6200000,
        outstandingBalance: 0
    },
    {
        id: "CLT-006",
        clientName: "Evolve Systems",
        email: "info@evolvesystems.lk",
        phone: "+94 76 XXX XXXX",
        category: "SME",
        status: "Active",
        lastActive: "2023-08-12",
        totalRevenue: 950000,
        outstandingBalance: 0
    },
    {
        id: "CLT-007",
        clientName: "Prism Retail",
        email: "info@prismretail.lk",
        phone: "+94 75 XXX XXXX",
        category: "SME",
        status: "Active",
        lastActive: "2023-07-20",
        totalRevenue: 600000,
        outstandingBalance: 0
    },
    {
        id: "CLT-008",
        clientName: "Orbit Logistics",
        email: "info@orbitlogistics.lk",
        phone: "+94 91 XXX XXXX",
        category: "SME",
        status: "Inactive",
        lastActive: "2023-01-15",
        totalRevenue: 350000,
        outstandingBalance: 0
    },
    {
        id: "CLT-009",
        clientName: "Bridge Partners",
        email: "info@bridgepartners.lk",
        phone: "+94 21 XXX XXXX",
        category: "SME",
        status: "Active",
        lastActive: "2024-01-10",
        totalRevenue: 2800000,
        outstandingBalance: 500000
    }
];
