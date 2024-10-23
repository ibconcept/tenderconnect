import App from './App.svelte';
import './styles.css';





// Example tender data (you can replace this with dynamic data from your server or state management)
const initialTenders = [
    {
        id: 1,
        title: "Tender for Construction",
        description: "Looking for contractors for a new building project.",
        image: null, // Add image property
        institution: "ABC Construction Ltd.", // Add institution
        openDate: "2024-01-01",
        closeDate: "2024-02-01",
        contactPerson: "John Doe" // Add contactPerson
    },
    {
        id: 2,
        title: "School Renovation",
        description: "Renovation of classrooms and facilities.",
        image: null,
        institution: "Green Valley School",
        openDate: "2024-10-01",
        closeDate: "2024-10-15",
        contactPerson: "Alice Johnson"
    },
    {
        id: 3,
        title: "Hospital Equipment Supply",
        description: "Supply of medical equipment for the new wing.",
        image: null,
        institution: "City Hospital",
        openDate: "2024-10-05",
        closeDate: "2024-10-20",
        contactPerson: "Dr. Mark Lee"
    },
    {
        id: 4,
        title: "Community Center Construction",
        description: "Building a new community center for local events.",
        image: null,
        institution: "Sunny Community Center",
        openDate: "2024-10-10",
        closeDate: "2024-10-25",
        contactPerson: "John Smith"
    },
    {
        id: 5,
        title: "Tender for IT Services",
        description: "Seeking proposals for IT support services.",
        image: null,
        institution: "Tech Solutions Inc.", // Add institution
        openDate: "2024-01-15",
        closeDate: "2024-03-15",
        contactPerson: "Jane Doe" // Add contactPerson
    }
];


// Create a new Svelte app instance and mount it to the document body
const app = new App({
    target: document.body,
    props: {
        
        tenders2: initialTenders,
        tenderClass: "tender-item" // Passing the initial tender data to the App component
    },
});

// Optional: Handle app-level events or state management here
// Cleanup on app destruction (optional)
export default app;
