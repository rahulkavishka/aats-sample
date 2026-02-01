export interface FileData {
    id: string
    name: string
    size?: string
    url?: string
    desc?: string
}

export interface TINData {
    description?: string
    processFiles: FileData[]
    approvedFiles: FileData[]
    pinFiles: FileData[]
    ssidFiles: FileData[]
}

export interface CompanyRegistrationRecord {
    id: string
    date: string
    clientName: string
    companyName: string
    paymentStatus: "Paid" | "Unpaid" | "Partial"
    process: string
    type?: string
    address?: string
    email?: string
    phoneNo?: string
    directors?: { name: string; position: string }[]
    secretary?: { name: string; position: string }[]
    directors2?: { name: string; position: string }[]
    other?: { name: string; position: string }[]
    nicFiles?: FileData[]
    tinData?: TINData
}

export interface EpfEtfRecord {
    id: string
    date: string
    clientName: string
    companyName: string
    noOfStaffs: number
    process: string
}

export interface TradeMarkRecord {
    id: string
    date: string
    clientName: string
    companyName: string
    code?: string
    documents?: FileData[]
}

export interface TradeLicenseRecord {
    id: string
    date: string
    clientName: string
    companyName: string
    code?: string
    assignment?: string
    documents?: FileData[]
}

export const companyRegistrationRecords: CompanyRegistrationRecord[] = [
    {
        id: "CR-001",
        date: "2024-01-15",
        clientName: "Alice Smith",
        companyName: "Alice's Bakery",
        paymentStatus: "Paid",
        process: "Completed",
        type: "Private Limited",
        address: "123 Bakery Lane, Colombo 03",
        email: "alice@example.com",
        phoneNo: "0771234567",
        directors: [{ name: "Alice Smith", position: "Managing Director" }],
        secretary: [{ name: "Bob Brown", position: "Secretary" }],
        nicFiles: [
            { id: "nic-1", name: "Alice_NIC.pdf", size: "2.5MB" }
        ],
        tinData: {
            processFiles: [{ id: "pf-1", name: "Process_Doc.pdf", size: "1.2MB" }],
            approvedFiles: [],
            pinFiles: [],
            ssidFiles: []
        }
    },
    { id: "CR-002", date: "2024-01-20", clientName: "Bob Jones", companyName: "Tech Solutions", paymentStatus: "Unpaid", process: "Pending", nicFiles: [] },
    { id: "CR-003", date: "2024-02-10", clientName: "Charlie Brown", companyName: "Charlie's Design", paymentStatus: "Partial", process: "In Progress", nicFiles: [] },
    { id: "CR-004", date: "2024-03-05", clientName: "David Wilson", companyName: "Wilson Logistics", paymentStatus: "Paid", process: "Review", nicFiles: [] },
    { id: "CR-005", date: "2024-03-12", clientName: "Eva Martinez", companyName: "Eva's Event Planning", paymentStatus: "Unpaid", process: "Draft", nicFiles: [] },
    { id: "CR-006", date: "2024-03-18", clientName: "Frank Thomas", companyName: "Thomas Construction", paymentStatus: "Partial", process: "In Progress", nicFiles: [] },
    { id: "CR-007", date: "2024-03-22", clientName: "Grace Lee", companyName: "Graceful Gardens", paymentStatus: "Paid", process: "Completed", nicFiles: [] },
    { id: "CR-008", date: "2024-04-01", clientName: "Henry White", companyName: "White & Co", paymentStatus: "Paid", process: "Submitted", nicFiles: [] },
    { id: "CR-009", date: "2024-04-10", clientName: "Ivy Green", companyName: "Ivy Tech", paymentStatus: "Unpaid", process: "Pending", nicFiles: [] },
    { id: "CR-010", date: "2024-04-15", clientName: "Jack Black", companyName: "Jack's Diner", paymentStatus: "Partial", process: "Issue Raised", nicFiles: [] },
    { id: "CR-011", date: "2024-04-20", clientName: "Karen Scott", companyName: "Scott Realty", paymentStatus: "Paid", process: "Completed", nicFiles: [] },
    { id: "CR-012", date: "2024-05-02", clientName: "Leo King", companyName: "King Fishery", paymentStatus: "Paid", process: "Finalizing", nicFiles: [] },
    { id: "CR-013", date: "2024-05-08", clientName: "Mia Young", companyName: "Young Creators", paymentStatus: "Unpaid", process: "Draft", nicFiles: [] },
    { id: "CR-014", date: "2024-05-15", clientName: "Nathan Drake", companyName: "Uncharted Explorations", paymentStatus: "Paid", process: "Completed", nicFiles: [] },
    { id: "CR-015", date: "2024-05-20", clientName: "Olivia Pope", companyName: "Pope & Associates", paymentStatus: "Unpaid", process: "Pending", nicFiles: [] },
    { id: "CR-016", date: "2024-06-01", clientName: "Peter Parker", companyName: "Parker Photography", paymentStatus: "Partial", process: "In Progress", nicFiles: [] },
    { id: "CR-017", date: "2024-06-05", clientName: "Quinn Fabray", companyName: "Fabray Arts", paymentStatus: "Paid", process: "Review", nicFiles: [] },
    { id: "CR-018", date: "2024-06-10", clientName: "Rachel Green", companyName: "Green Fashion", paymentStatus: "Unpaid", process: "Draft", nicFiles: [] },
    { id: "CR-019", date: "2024-06-15", clientName: "Steve Rogers", companyName: "Rogers Gym", paymentStatus: "Partial", process: "In Progress", nicFiles: [] },
    { id: "CR-020", date: "2024-06-20", clientName: "Tony Stark", companyName: "Stark Industries", paymentStatus: "Paid", process: "Completed", nicFiles: [] },
    { id: "CR-021", date: "2024-07-01", clientName: "Ursula Buffay", companyName: "Buffay Events", paymentStatus: "Paid", process: "Submitted", nicFiles: [] },
    { id: "CR-022", date: "2024-07-05", clientName: "Victor Von Doom", companyName: "Doom Robotics", paymentStatus: "Unpaid", process: "Pending", nicFiles: [] },
    { id: "CR-023", date: "2024-07-10", clientName: "Wanda Maximoff", companyName: "Maximoff Reality", paymentStatus: "Partial", process: "Issue Raised", nicFiles: [] },
    { id: "CR-024", date: "2024-07-15", clientName: "Xander Cage", companyName: "Cage Stunts", paymentStatus: "Paid", process: "Completed", nicFiles: [] },
    { id: "CR-025", date: "2024-07-20", clientName: "Yennefer Vengerberg", companyName: "Vengerberg Magic", paymentStatus: "Paid", process: "Finalizing", nicFiles: [] },
    { id: "CR-026", date: "2024-07-25", clientName: "Zack Morris", companyName: "Bayside Burgers", paymentStatus: "Unpaid", process: "Draft", nicFiles: [] },
    { id: "CR-027", date: "2024-08-01", clientName: "Adam Levine", companyName: "Levine Music", paymentStatus: "Paid", process: "Completed", nicFiles: [] },
    { id: "CR-028", date: "2024-08-05", clientName: "Bruce Banner", companyName: "Banner Labs", paymentStatus: "Partial", process: "In Progress", nicFiles: [] },
    { id: "CR-029", date: "2024-08-10", clientName: "Clark Kent", companyName: "Planet News", paymentStatus: "Paid", process: "Review", nicFiles: [] },
    { id: "CR-030", date: "2024-08-15", clientName: "Diana Prince", companyName: "Themyscira Antiques", paymentStatus: "Unpaid", process: "Pending", nicFiles: [] },
    { id: "CR-031", date: "2024-08-20", clientName: "Ethan Hunt", companyName: "IMF Solutions", paymentStatus: "Paid", process: "Completed", nicFiles: [] },
    { id: "CR-032", date: "2024-08-25", clientName: "Frodo Baggins", companyName: "Shire Logistics", paymentStatus: "Partial", process: "Finalizing", nicFiles: [] },
    { id: "CR-033", date: "2024-09-01", clientName: "Gandalf Grey", companyName: "Fireworks Inc", paymentStatus: "Paid", process: "Submitted", nicFiles: [] }]

export const epfEtfRecords: EpfEtfRecord[] = [
    { id: "EPF-001", date: "2024-01-18", clientName: "Alice Smith", companyName: "Alice's Bakery", noOfStaffs: 5, process: "Submitted" },
    { id: "EPF-002", date: "2024-02-05", clientName: "David Lee", companyName: "Data Corp", noOfStaffs: 12, process: "Draft" },
    { id: "EPF-003", date: "2024-02-15", clientName: "Sarah Connor", companyName: "SkyNet Systems", noOfStaffs: 150, process: "Processing" },
    { id: "EPF-004", date: "2024-02-20", clientName: "John Doe", companyName: "Doe Logistics", noOfStaffs: 25, process: "Completed" },
    { id: "EPF-005", date: "2024-03-01", clientName: "Jane Smith", companyName: "Smith & Sons", noOfStaffs: 8, process: "Pending" },
    { id: "EPF-006", date: "2024-03-10", clientName: "Mike Ross", companyName: "Pearson Hardman", noOfStaffs: 45, process: "Submitted" },
    { id: "EPF-007", date: "2024-03-15", clientName: "Harvey Specter", companyName: "Specter Litt", noOfStaffs: 60, process: "Review" },
    { id: "EPF-008", date: "2024-03-22", clientName: "Louis Litt", companyName: "Litt Up", noOfStaffs: 10, process: "Draft" },
    { id: "EPF-009", date: "2024-04-05", clientName: "Rachel Zane", companyName: "Zane Legal", noOfStaffs: 5, process: "Completed" },
    { id: "EPF-010", date: "2024-04-12", clientName: "Donna Paulsen", companyName: "Donna Corp", noOfStaffs: 3, process: "Pending" },
    { id: "EPF-011", date: "2024-04-18", clientName: "Jessica Pearson", companyName: "Pearson Consulting", noOfStaffs: 20, process: "Processing" },
    { id: "EPF-012", date: "2024-04-25", clientName: "Alex Williams", companyName: "Williams Tech", noOfStaffs: 30, process: "Submitted" },
    { id: "EPF-013", date: "2024-05-01", clientName: "Barry Allen", companyName: "Flash Couriers", noOfStaffs: 15, process: "Draft" },
    { id: "EPF-014", date: "2024-05-05", clientName: "Bruce Wayne", companyName: "Wayne Enterprises", noOfStaffs: 500, process: "Submitted" },
    { id: "EPF-015", date: "2024-05-10", clientName: "Clark Kent", companyName: "Daily Planet", noOfStaffs: 120, process: "Processing" },
    { id: "EPF-016", date: "2024-05-15", clientName: "Diana Prince", companyName: "Museum of History", noOfStaffs: 25, process: "Completed" },
    { id: "EPF-017", date: "2024-05-20", clientName: "Eddie Brock", companyName: "Brock Media", noOfStaffs: 8, process: "Pending" },
    { id: "EPF-018", date: "2024-05-25", clientName: "Frank Castle", companyName: "Castle Security", noOfStaffs: 5, process: "Submitted" },
    { id: "EPF-019", date: "2024-06-01", clientName: "Gwen Stacy", companyName: "Stacy Science", noOfStaffs: 12, process: "Review" },
    { id: "EPF-020", date: "2024-06-05", clientName: "Harry Osborn", companyName: "Oscorp", noOfStaffs: 300, process: "Draft" },
    { id: "EPF-021", date: "2024-06-10", clientName: "Iris West", companyName: "Central City Picture", noOfStaffs: 4, process: "Completed" },
    { id: "EPF-022", date: "2024-06-15", clientName: "James Gordon", companyName: "GCPD Consultants", noOfStaffs: 50, process: "Pending" },
    { id: "EPF-023", date: "2024-06-20", clientName: "Kara Danvers", companyName: "Catco Media", noOfStaffs: 80, process: "Processing" },
    { id: "EPF-024", date: "2024-06-25", clientName: "Lex Luthor", companyName: "LexCorp", noOfStaffs: 250, process: "Submitted" },
    { id: "EPF-025", date: "2024-07-01", clientName: "Matt Murdock", companyName: "Nelson & Murdock", noOfStaffs: 3, process: "Draft" },
    { id: "EPF-026", date: "2024-07-05", clientName: "Natasha Romanoff", companyName: "Romanoff Ballet", noOfStaffs: 10, process: "Submitted" },
    { id: "EPF-027", date: "2024-07-10", clientName: "Oliver Queen", companyName: "Queen Industries", noOfStaffs: 100, process: "Processing" },
    { id: "EPF-028", date: "2024-07-15", clientName: "Peter Parker", companyName: "Web Designs", noOfStaffs: 2, process: "Completed" },
    { id: "EPF-029", date: "2024-07-20", clientName: "Quicksilver", companyName: "Maximoff Speeds", noOfStaffs: 6, process: "Pending" },
    { id: "EPF-030", date: "2024-07-25", clientName: "Reed Richards", companyName: "Baxter Building", noOfStaffs: 8, process: "Submitted" },
    { id: "EPF-031", date: "2024-08-01", clientName: "Steve Rogers", companyName: "Brooklyn Gym", noOfStaffs: 5, process: "Review" },
    { id: "EPF-032", date: "2024-08-05", clientName: "Tony Stark", companyName: "Stark Tech", noOfStaffs: 1000, process: "Draft" }
]

export const tradeMarkRecords: TradeMarkRecord[] = [
    {
        id: "TM-001",
        date: "2024-01-10",
        clientName: "Eve White",
        companyName: "Eve's Fashion",
        code: "867958",
        documents: [
            { id: "nic", name: "NIC.pdf", size: "2.5MB" },
            { id: "br", name: "BR.pdf", size: "1.8MB" },
            { id: "r1", name: "R1.pdf", size: "1.2MB" },
            { id: "art", name: "ART.pdf", size: "3.2MB" },
            { id: "logo", name: "LOGO-TM.pdf", size: "5.0MB" },
            { id: "no", name: "NO.pdf", size: "1.0MB" },
            { id: "cat", name: "CATEGORY.pdf", size: "0.5MB" }
        ]
    },
    { id: "TM-002", date: "2024-03-15", clientName: "Frank Green", companyName: "Green Energy" },
    { id: "TM-003", date: "2024-04-01", clientName: "George Miller", companyName: "Miller's Brew" },
    { id: "TM-004", date: "2024-04-05", clientName: "Hannah Baker", companyName: "Baker's Dozen" },
    { id: "TM-005", date: "2024-04-12", clientName: "Ian Wright", companyName: "Wright Architects" },
    { id: "TM-006", date: "2024-04-20", clientName: "Julia Roberts", companyName: "Star Productions" },
    { id: "TM-007", date: "2024-05-01", clientName: "Kevin Hart", companyName: "Hart Mechanics" },
    { id: "TM-008", date: "2024-05-10", clientName: "Laura Croft", companyName: "Tomb Raiders Ltd" },
    { id: "TM-009", date: "2024-05-15", clientName: "Mark Twain", companyName: "Twain Publishing" },
    { id: "TM-010", date: "2024-05-22", clientName: "Nancy Drew", companyName: "Drew Detectives" },
    { id: "TM-011", date: "2024-06-01", clientName: "Oscar Wilde", companyName: "Wilde Arts" },
    { id: "TM-012", date: "2024-06-05", clientName: "Paul Atreides", companyName: "Dune Spice" },
    { id: "TM-013", date: "2024-06-10", clientName: "Quinton Beck", companyName: "Mysterio FX" },
    { id: "TM-014", date: "2024-06-15", clientName: "Arthur Curry", companyName: "Atlantis Seafood" },
    { id: "TM-015", date: "2024-06-20", clientName: "Bruce Banner", companyName: "Gamma Radiation" },
    { id: "TM-016", date: "2024-06-25", clientName: "Carol Danvers", companyName: "Starforce Travels" },
    { id: "TM-017", date: "2024-07-01", clientName: "Doctor Strange", companyName: "Sanctum Spells" },
    { id: "TM-018", date: "2024-07-05", clientName: "Erik Lensherr", companyName: "Magneto Metals" },
    { id: "TM-019", date: "2024-07-10", clientName: "Felicia Hardy", companyName: "Black Cat Security" },
    { id: "TM-020", date: "2024-07-15", clientName: "Groot", companyName: "I Am Groot Basics" },
    { id: "TM-021", date: "2024-07-20", clientName: "Hank Pym", companyName: "Pym Particles" },
    { id: "TM-022", date: "2024-07-25", clientName: "Iceman", companyName: "Drake Frozen Goods" },
    { id: "TM-023", date: "2024-08-01", clientName: "Jean Grey", companyName: "Phoenix Rising" },
    { id: "TM-024", date: "2024-08-05", clientName: "Kitty Pryde", companyName: "Phase Through Walls" },
    { id: "TM-025", date: "2024-08-10", clientName: "Logan", companyName: "X-Force Training" },
    { id: "TM-026", date: "2024-08-15", clientName: "Miles Morales", companyName: "Brooklyn Beats" },
    { id: "TM-027", date: "2024-08-20", clientName: "Nick Fury", companyName: "Shield Consultants" },
    { id: "TM-028", date: "2024-08-25", clientName: "Ororo Munroe", companyName: "Storm Weather Control" },
    { id: "TM-029", date: "2024-09-01", clientName: "Peter Quill", companyName: "Star Lord Tracks" },
    { id: "TM-030", date: "2024-09-05", clientName: "Rocket Raccoon", companyName: "Guardian Weapons" },
    { id: "TM-031", date: "2024-09-10", clientName: "Scott Lang", companyName: "Ant-Man Exterminators" },
    { id: "TM-032", date: "2024-09-15", clientName: "T'Challa", companyName: "Wakanda Tech" }
]

export const tradeLicenseRecords: TradeLicenseRecord[] = [
    {
        id: "TL-001",
        date: "2024-01-22",
        clientName: "Grace Hall",
        companyName: "Grace's Salon",
        code: "867958",
        assignment: "FINANCE",
        documents: [
            { id: "nic", name: "NIC.pdf", desc: "National Identity Card", size: "2.5MB" }
        ]
    },
    { id: "TL-002", date: "2024-02-14", clientName: "Henry Ford", companyName: "Ford Motors" },
    { id: "TL-003", date: "2024-03-01", clientName: "Irene Adler", companyName: "Adler Investigations" },
    { id: "TL-004", date: "2024-03-10", clientName: "Jack Sparrow", companyName: "Black Pearl Shipping" },
    { id: "TL-005", date: "2024-03-20", clientName: "Katherine Pierce", companyName: "Pierce Imports" },
    { id: "TL-006", date: "2024-04-05", clientName: "Luke Skywalker", companyName: "Jedi Academy" },
    { id: "TL-007", date: "2024-04-15", clientName: "Marty McFly", companyName: "Future Time Travel" },
    { id: "TL-008", date: "2024-04-25", clientName: "Natasha Romanoff", companyName: "Black Widow Security" },
    { id: "TL-009", date: "2024-05-01", clientName: "Oliver Queen", companyName: "Queen Consolidated" },
    { id: "TL-010", date: "2024-05-10", clientName: "Peter Parker", companyName: "Daily Bugle Photos" },
    { id: "TL-011", date: "2024-05-20", clientName: "Quentin Tarantino", companyName: "Pulp Fiction Studios" },
    { id: "TL-012", date: "2024-06-01", clientName: "Rachel Green", companyName: "Central Perk Cafe" },
    { id: "TL-013", date: "2024-06-10", clientName: "Sherlock Holmes", companyName: "Baker Street Consulting" },
    { id: "TL-014", date: "2024-06-15", clientName: "Tom Cruise", companyName: "Top Gun Flight School" },
    { id: "TL-015", date: "2024-06-20", clientName: "Uma Thurman", companyName: "Kill Bill Swords" },
    { id: "TL-016", date: "2024-06-25", clientName: "Vin Diesel", companyName: "Fast Cars Workshop" },
    { id: "TL-017", date: "2024-07-01", clientName: "Will Smith", companyName: "Fresh Prince Music" },
    { id: "TL-018", date: "2024-07-05", clientName: "Xena", companyName: "Warrior Princess Gym" },
    { id: "TL-019", date: "2024-07-10", clientName: "Yoda", companyName: "Jedi Consultancy" },
    { id: "TL-020", date: "2024-07-15", clientName: "Zorro", companyName: "Masked Avenger Services" },
    { id: "TL-021", date: "2024-07-20", clientName: "Arnold Schwarzenegger", companyName: "Terminator Security" },
    { id: "TL-022", date: "2024-07-25", clientName: "Brad Pitt", companyName: "Fight Club Dojo" },
    { id: "TL-023", date: "2024-08-01", clientName: "Chris Hemsworth", companyName: "Thor Hammers" },
    { id: "TL-024", date: "2024-08-05", clientName: "Daniel Radcliffe", companyName: "Hogwarts Magic Shop" },
    { id: "TL-025", date: "2024-08-10", clientName: "Emma Watson", companyName: "Granger Library" },
    { id: "TL-026", date: "2024-08-15", clientName: "Finn Wolfhard", companyName: "Stranger Things Inc" },
    { id: "TL-027", date: "2024-08-20", clientName: "Gal Gadot", companyName: "Wonder Woman Fitness" },
    { id: "TL-028", date: "2024-08-25", clientName: "Harrison Ford", companyName: "Indiana Jones Archaeology" },
    { id: "TL-029", date: "2024-09-01", clientName: "Ian McKellen", companyName: "Magneto Metals" },
    { id: "TL-030", date: "2024-09-05", clientName: "Johnny Depp", companyName: "Pirate Ships Ltd" },
    { id: "TL-031", date: "2024-09-10", clientName: "Keanu Reeves", companyName: "Matrix Solutions" },
    { id: "TL-032", date: "2024-09-15", clientName: "Leonardo DiCaprio", companyName: "Inception Dreams" }
]
