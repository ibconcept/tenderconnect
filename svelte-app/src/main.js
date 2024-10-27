import App from './App.svelte';
import './styles.css';

const app = new App({
    target: document.body,
    props: {
        isLoggedIn: false,
        tenders: [],
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
