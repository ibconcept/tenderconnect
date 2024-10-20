import App from './App.svelte';
import './styles.css';


// Example tender data (you can replace this with dynamic data from your server or state management)
const initialTenders = [
    {
        id: 1,
        title: 'Tender for Construction',
        description: 'Looking for contractors for a new building project.',
        openDate: '2024-01-01',
        closeDate: '2024-02-01',
    },
    {
        id: 2,
        title: 'Tender for IT Services',
        description: 'Seeking proposals for IT support services.',
        openDate: '2024-01-15',
        closeDate: '2024-03-15',
    },
];

// Create a new Svelte app instance and mount it to the document body
const app = new App({
    target: document.body,
    props: {
        tenders2: initialTenders, // Passing the initial tender data to the App component
    },
});

// Optional: Handle app-level events or state management here
// Cleanup on app destruction (optional)
export default app;
