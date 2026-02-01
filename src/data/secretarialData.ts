// Mock data for Secretarial and Advisory module

export interface SecretarialRecord {
    id: string
    date: string
    clientName: string
    paymentStatus: "Paid" | "Partial" | "Unpaid"
    companyName: string
    address: string
    email: string
    phoneNo: string
    type: string
    directors: string[]
    secretary: string[]
    directors2: string[]
    other: string[]
    nicFiles: { id: string; name: string; url?: string }[]
    tinData?: {
        processFiles: { id: string; name: string; size: string }[]
        approvedFiles: { id: string; name: string; size: string }[]
        pinFiles: { id: string; name: string; size: string }[]
        ssidFiles: { id: string; name: string; size: string }[]
        description: string
        nicDescription: string
    }
}

export const secretarialRecords: SecretarialRecord[] = [
    {
        id: "00012",
        date: "02/03/2026",
        clientName: "UNIVERSAL",
        paymentStatus: "Paid",
        companyName: "UNIVERSAL TRADERS",
        address: "000/0, KATUGASTHOTA, KANDY",
        email: "UNI@GMAIL.COM",
        phoneNo: "077 546 4455",
        type: "FINANCIAL AUDIT",
        directors: ["ARJUN", "RAJIV"],
        secretary: ["ARJUN"],
        directors2: ["ARJUN", "ARJUN"],
        other: ["ARJUN"],
        nicFiles: [],
        tinData: {
            processFiles: [],
            approvedFiles: [],
            pinFiles: [],
            ssidFiles: [],
            description: "",
            nicDescription: ""
        }
    },
    {
        id: "00015",
        date: "15/03/2026",
        clientName: "APEX HOLDINGS",
        paymentStatus: "Partial",
        companyName: "APEX HOLDINGS LTD",
        address: "789/C, GALLE ROAD, COLOMBO",
        email: "INFO@APEXHOLDINGS.LK",
        phoneNo: "077 234 5678",
        type: "COMPANY SECRETARIAL",
        directors: ["SILVA", "FERNANDO"],
        secretary: ["PERERA"],
        directors2: ["JAYAWARDENA", "WICKRAMASINGHE"],
        other: ["GUNARATNE"],
        nicFiles: [],
        tinData: {
            processFiles: [],
            approvedFiles: [],
            pinFiles: [],
            ssidFiles: [],
            description: "",
            nicDescription: ""
        }
    },
    {
        id: "00016",
        date: "20/03/2026",
        clientName: "BRIGHT FUTURE",
        paymentStatus: "Unpaid",
        companyName: "BRIGHT FUTURE CONSULTANTS",
        address: "321/D, NEGOMBO ROAD, COLOMBO",
        email: "CONTACT@BRIGHTFUTURE.COM",
        phoneNo: "077 345 6789",
        type: "ADVISORY SERVICES",
        directors: ["MENDIS", "RATHNAYAKE"],
        secretary: ["DISSANAYAKE"],
        directors2: ["BANDARA"],
        other: ["SAMARAWEERA", "GUNASEKARA"],
        nicFiles: [],
        tinData: {
            processFiles: [],
            approvedFiles: [],
            pinFiles: [],
            ssidFiles: [],
            description: "",
            nicDescription: ""
        }
    },
    {
        id: "00017",
        date: "25/03/2026",
        clientName: "METRO SOLUTIONS",
        paymentStatus: "Paid",
        companyName: "METRO SOLUTIONS PVT LTD",
        address: "456/E, MAIN STREET, KANDY",
        email: "ADMIN@METROSOLUTIONS.LK",
        phoneNo: "077 456 7890",
        type: "COMPLIANCE ADVISORY",
        directors: ["WIJESINGHE", "AMARASINGHE"],
        secretary: ["KUMARASINGHE"],
        directors2: ["RAJAPAKSE", "HERATH"],
        other: ["LIYANAGE"],
        nicFiles: [],
        tinData: {
            processFiles: [],
            approvedFiles: [],
            pinFiles: [],
            ssidFiles: [],
            description: "",
            nicDescription: ""
        }
    },
    {
        id: "00018",
        date: "28/03/2026",
        clientName: "GLOBAL VENTURES",
        paymentStatus: "Partial",
        companyName: "GLOBAL VENTURES INTERNATIONAL",
        address: "654/F, DUPLICATION ROAD, COLOMBO",
        email: "INFO@GLOBALVENTURES.COM",
        phoneNo: "077 567 8901",
        type: "CORPORATE ADVISORY",
        directors: ["FERNANDO", "SILVA"],
        secretary: ["PERERA"],
        directors2: ["JAYAWARDENA"],
        other: ["WICKRAMASINGHE", "GUNARATNE"],
        nicFiles: [],
        tinData: {
            processFiles: [],
            approvedFiles: [],
            pinFiles: [],
            ssidFiles: [],
            description: "",
            nicDescription: ""
        }
    },
    {
        id: "00019",
        date: "01/04/2026",
        clientName: "UNIVERSAL",
        paymentStatus: "Paid",
        companyName: "UNIVERSAL TRADERS",
        address: "000/0, KATUGASTHOTA, KANDY",
        email: "UNI@GMAIL.COM",
        phoneNo: "077 546 4455",
        type: "EPF/ETF",
        directors: ["ARJUN"],
        secretary: ["RAJIV"],
        directors2: [],
        other: [],
        nicFiles: [],
    },
    {
        id: "00020",
        date: "05/04/2026",
        clientName: "GLOBAL LOGISTICS",
        paymentStatus: "Partial",
        companyName: "GLOBAL LOGISTICS LTD",
        address: "123/A, HARBOR ROAD, COLOMBO",
        email: "GL@LOGISTICS.LK",
        phoneNo: "071 222 3333",
        type: "TRADE MARK",
        directors: ["PERERA"],
        secretary: ["DE SILVA"],
        directors2: [],
        other: [],
        nicFiles: [],
    },
    {
        id: "00021",
        date: "10/04/2026",
        clientName: "CITY RETAIL",
        paymentStatus: "Unpaid",
        companyName: "CITY RETAIL STORES",
        address: "456/B, MARKET STREET, GALLE",
        email: "CITYRETAIL@GMAIL.COM",
        phoneNo: "091 444 5555",
        type: "TRADE LICENSE",
        directors: ["GUNARATNE"],
        secretary: ["FERNANDO"],
        directors2: [],
        other: [],
        nicFiles: [],
    }
]
