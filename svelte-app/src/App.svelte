<script>
    import { onMount, onDestroy } from 'svelte';   
   



    // Application state variables: manages user login, tenders, selected tender, and UI visibility
    let isLoggedIn = true;
    let tenders = [];
    let selectedTender = null;
    let showPostTenderForm = false;
    let showMenu = false;  

    // Declare variables for the tender form
    let newTenderTitle = "";
    let newTenderDescription = "";
    let newTenderImage = null;
    let newTenderInstitution = ""; 
    let newTenderOpenDate = "";
    let newTenderCloseDate = "";
    let newTenderContactPerson = "";
    let newTenderCompanyRegCert = ""; 
    let newTenderKraPin = ""; 
    let newTenderIdCard = ""; 
    let newTenderPosition = ""; 
    let newTenderTerms = ""; 

    // Load sample tenders from Local Storage
    
    function loadTenders() {
    const storedTenders = localStorage.getItem('tenders');
    tenders = storedTenders ? JSON.parse(storedTenders) : [
        {
            id: 1,
            title: "Tender for School Supplies",
            description: "Supply of educational materials for the upcoming term.",
            institution: "ABC Primary School",
            openDate: "2024-01-01",
            closeDate: "2024-01-15",
            contactPerson: "John Doe",
            image: null
        },
        {
            id: 2,
            title: "Hospital Equipment Tender",
            description: "Provision of medical equipment for XYZ Hospital.",
            institution: "XYZ Hospital",
            openDate: "2024-02-01",
            closeDate: "2024-02-20",
            contactPerson: "Jane Smith",
            image: null
        },
        {
            id: 3,
            title: "Community Project Development",
            description: "Construction of community center in downtown.",
            institution: "City Council",
            openDate: "2024-03-01",
            closeDate: "2024-03-15",
            contactPerson: "Alice Johnson",
            image: null
        },
        {
            id: 4,
            title: "IT Services Tender",
            description: "Provision of IT support services for local government.",
            institution: "Local Government Office",
            openDate: "2024-04-01",
            closeDate: "2024-04-15",
            contactPerson: "Bob Brown",
            image: null
        }
    ];
}


// Lifecycle function to load tenders and set up event listeners

    onMount(() => {
        loadTenders();

        function handleClickOutside(event) {
            const menu = document.querySelector('.menu');
            const hamburger = document.querySelector('.hamburger');
            if (menu && !menu.contains(event.target) && !hamburger.contains(event.target)) {
                showMenu = false;
            }
        }

        document.addEventListener('click', handleClickOutside);

        onDestroy(() => {
            document.removeEventListener('click', handleClickOutside);
        });
    });

    function viewTender(tenderId) {
        selectedTender = tenders.find(t => t.id === tenderId);
    }

    async function submitQuote(event) {
        event.preventDefault();
        alert("Quote submitted for tender.");
        selectedTender = null; 
    }

    async function submitTender(event) {
        event.preventDefault();
        const newTender = {
            id: Date.now(),
            title: newTenderTitle,
            description: newTenderDescription,
            image: newTenderImage,
            institution: newTenderInstitution,
            openDate: newTenderOpenDate,
            closeDate: newTenderCloseDate,
            contactPerson: newTenderContactPerson,
            companyRegCert: newTenderCompanyRegCert,
            kraPin: newTenderKraPin,
            idCard: newTenderIdCard,
            position: newTenderPosition,
            terms: newTenderTerms
        };

        tenders.push(newTender);
        localStorage.setItem('tenders', JSON.stringify(tenders));
        showPostTenderForm = false;
        resetTenderForm();
        loadTenders();
    }

    function resetTenderForm() {
        newTenderTitle = "";
        newTenderDescription = "";
        newTenderImage = null;
        newTenderInstitution = "";
        newTenderOpenDate = "";
        newTenderCloseDate = "";
        newTenderContactPerson = "";
        newTenderCompanyRegCert = ""; 
        newTenderKraPin = ""; 
        newTenderIdCard = ""; 
        newTenderPosition = ""; 
        newTenderTerms = ""; 
    }

    function handleImageUpload(event) {
        newTenderImage = event.target.files[0];
    }

    function toggleMenu() {
        showMenu = !showMenu; // Toggle the menu visibility
    }
</script>


<!-- Main layout including header, navigation, and content area -->

<header>
    <div class="logo-container">
        <a href="https://ibconcept.github.io/tenderconnect/">
            <img src="../logo.PNG" alt="Tender Portal Logo" />
        </a>
    </div>
    
    <div>
        <h1>TenderConnect</h1>
       
    </div>
    <nav>
        <button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
            ☰
        </button>
        
        {#if showMenu}
            <ul class="menu">
                <li><a href="/profile">My Profile</a></li>
                <li><a href="/tenders">My Tenders</a></li>
                <li><a href="/suppliers">My Suppliers</a></li>
                <li><a href="/categories">Tender Categories</a></li>
                <li><a href="/my-list-tenders">My List Tenders</a></li>
                <li><a href="/my-live-tenders">My Live Tenders</a></li>
            </ul>
        {/if}
    </nav>
</header>

{#if !isLoggedIn}
    <div id="auth">
        <h2>Login with OAuth</h2>
        <button on:click={() => isLoggedIn = true}>Login</button>
    </div>
{:else if showPostTenderForm}
    <div id="post-tender-form">
        <h3>Upload a New Tender</h3>
        <form on:submit={submitTender}>
            <label for="institution">Institution Name</label>
            <input type="text" id="institution" bind:value={newTenderInstitution} required />
            
            <label for="title">Tender Title</label>
            <input type="text" id="title" bind:value={newTenderTitle} required />
            
            <label for="description">Tender Description</label>
            <textarea id="description" bind:value={newTenderDescription} required></textarea>

            <label for="openDate">Opening Date</label>
            <input type="date" id="openDate" bind:value={newTenderOpenDate} required />
            
            <label for="closeDate">Closing Date</label>
            <input type="date" id="closeDate" bind:value={newTenderCloseDate} required />
            
            <label for="contactPerson">Contact Person</label>
            <input type="text" id="contactPerson" bind:value={newTenderContactPerson} required />
            
            <label for="companyRegCert">Company Registration Certificate</label>
            <input type="file" id="companyRegCert" accept=".pdf,image/jpeg,image/png" bind:value={newTenderCompanyRegCert} required />
            
            <label for="kraPin">KRA PIN</label>
            <input type="text" id="kraPin" bind:value={newTenderKraPin} required />
            
            <label for="idCard">Person of Interest ID Card</label>
            <input type="file" id="idCard" accept=".pdf,image/jpeg,image/png" bind:value={newTenderIdCard} required />
            
            <label for="position">Position of the Person</label>
            <input type="text" id="position" bind:value={newTenderPosition} required />
            
            <label for="terms">Tender Contract Agreement Terms</label>
            <textarea id="terms" bind:value={newTenderTerms} required></textarea>
            
            <button type="submit">Submit Tender</button>
            <button type="button" on:click={() => showPostTenderForm = false}>Back</button>
        </form>
    </div>
{:else if selectedTender}
    <div id="tender-detail">
        <h2>{selectedTender.title} Details</h2>
        <p><strong>Institution:</strong> {selectedTender.institution}</p>
        <p><strong>Open Date:</strong> {selectedTender.openDate}</p>
        <p><strong>Close Date:</strong> {selectedTender.closeDate}</p>
        <p><strong>Contact Person:</strong> {selectedTender.contactPerson}</p>
        <p>{selectedTender.description}</p>
        {#if selectedTender.image}
            <img src={selectedTender.image} alt={selectedTender.title} width="200" />
        {/if}
        <h3>Apply for Tender</h3>
        <form on:submit={submitQuote}>
            <textarea placeholder="Enter your quote"></textarea>
            <input type="file" id="quote-file" />
            <button type="submit">Submit Quote</button>
        </form>
        <button on:click={() => selectedTender = null}>Back to Tenders</button>
    </div>
{:else}
    <main>
        <h2>Your gateway to opportunities for schools, hospitals, and community projects.</h2>
        <h3 style="border: 2px orange dotted;">Apply for available Tenders</h3>
        <div id="tender-items">
            {#each tenders as tender}
                <button class="tender-item" on:click={() => viewTender(tender.id)} aria-label={`View tender: ${tender.title}`}>
                    <h3>{tender.title}</h3>
                    <p>{tender.description}</p>
                    <p><strong>Institution:</strong> {tender.institution}</p>
                    {#if tender.image}
                        <img src={tender.image} alt={tender.title} width="100" />
                    {/if}
                </button>
            {/each}
        </div>
    </main>
{/if}



<!-- Call to Action Button -->

<div class="cta">
    <button on:click={() => showPostTenderForm = true}>Submit Tender</button>
</div>
