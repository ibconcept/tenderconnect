// main.js
import App from './App.svelte';
import './styles.css';
import './netlifyIdentity.js';

const app = new App({
    target: document.getElementById('app'),
    props: {
        tenders: [], // Pass any initial tenders if needed
        newTenderTitle: "",
        newTenderDescription: "",
        newTenderInstitution: "",
        newTenderOpenDate: "",
        newTenderCloseDate: "",
        newTenderContactPerson: "",
        newTenderCompanyRegCert: "",
        newTenderKraPin: "",
        newTenderIdCard: "",
        newTenderPosition: "",
        newTenderTerms: "",
    },
});

export default app;
