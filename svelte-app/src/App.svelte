<script>
    export let tenders2; // Import the 'tenders' prop

    import { onMount } from 'svelte';

    let isLoggedIn = true;
    let tenders = [];
    let selectedTender = null;
    let showPostTenderForm = false;
    
    // Declare variables for the tender form
    let newTenderTitle = "";
    let newTenderDescription = "";
    let newTenderImage = null;
    let newTenderInstitution = ""; // This variable was missing
    let newTenderOpenDate = "";
    let newTenderCloseDate = "";
    let newTenderContactPerson = "";
    let newTenderCompanyRegCert = ""; // New input for company registration certificate
    let newTenderKraPin = ""; // New input for KRA PIN
    let newTenderIdCard = ""; // New input for ID card
    let newTenderPosition = ""; // New input for person's position
    let newTenderTerms = ""; // New input for tender agreement terms
    let showMenu = false; // To toggle hamburger menu

    // Load tenders from Local Storage
    function loadTenders() {
        const storedTenders = localStorage.getItem('tenders');
        tenders = storedTenders ? JSON.parse(storedTenders) : [];
    }

    onMount(() => {
        loadTenders();
    });

    function viewTender(tenderId) {
        selectedTender = tenders.find(t => t.id === tenderId);
    }

    async function submitQuote(event) {
        event.preventDefault();
        alert("Quote submitted for tender.");
        selectedTender = null; // Return to tender list
    }

    async function submitTender(event) {
        event.preventDefault();
        const newTender = {
            id: Date.now(), // Use timestamp as a unique ID
            title: newTenderTitle,
            description: newTenderDescription,
            image: newTenderImage,
            institution: newTenderInstitution,
            openDate: newTenderOpenDate,
            closeDate: newTenderCloseDate,
            contactPerson: newTenderContactPerson,
            companyRegCert: newTenderCompanyRegCert, // New input for company registration certificate
            kraPin: newTenderKraPin, // New input for KRA PIN
            idCard: newTenderIdCard, // New input for ID card
            position: newTenderPosition, // New input for person's position
            terms: newTenderTerms // New input for tender agreement terms
        };

        // Add the new tender to the existing array
        tenders.push(newTender);
        // Save the updated tenders array to Local Storage
        localStorage.setItem('tenders', JSON.stringify(tenders));

        // Reset fields and hide the form after submission
        showPostTenderForm = false;
        resetTenderForm();
        loadTenders(); // Refresh the tender list
    }

    // Reset the tender form fields
    function resetTenderForm() {
        newTenderTitle = "";
        newTenderDescription = "";
        newTenderImage = null;
        newTenderInstitution = "";
        newTenderOpenDate = "";
        newTenderCloseDate = "";
        newTenderContactPerson = "";
        newTenderCompanyRegCert = ""; // Reset new input
        newTenderKraPin = ""; // Reset new input
        newTenderIdCard = ""; // Reset new input
        newTenderPosition = ""; // Reset new input
        newTenderTerms = ""; // Reset new input
    }

    // Handle file input change
    function handleImageUpload(event) {
        newTenderImage = event.target.files[0];
    }

    // Toggle hamburger menu visibility
    function toggleMenu() {
        showMenu = !showMenu;
    }
</script>

<header>
    <div class="logo-container">
        <a href="../index.html">
            <img src="../logo.PNG" alt="Tender Portal Logo" />
        </a>
    </div>
    
    <div class="site-info" >
        <h1>Tender Portal</h1>
        <h2>Your gateway to opportunities for schools, hospitals, and community projects.</h2>
    </div>
    <nav>
        <button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
            ☰
        </button>
        
        {#if showMenu}
            <ul class="menu">
                <li>My Profile</li>
                <li>My Tenders</li>
                <li>My Suppliers</li>
                <li>Tender Categories</li>
                <li><button on:click={() => showPostTenderForm = true}>My List Tenders</button></li>
                <li><button on:click={() => showPostTenderForm = true}>My Live Tenders</button></li>
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
        <h3>Post a New Tender</h3>
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
            <button type="button" on:click={() => showPostTenderForm = false}>Cancel</button>
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
        <h2>Available Tenders</h2>
        <div id="tender-items">
            {#each tenders as tender}
                <div class="tender-item" on:click={() => viewTender(tender.id)}>
                    <h3>{tender.title}</h3>
                    <p>{tender.description}</p>
                    <p><strong>Institution:</strong> {tender.institution}</p>
                    {#if tender.image}
                        <img src={tender.image} alt={tender.title} width="100" />
                    {/if}
                </div>
            {/each}
        </div>
    </main>
{/if}

<!-- Call to Action Button -->
<div class="cta">
    <button on:click={() => showPostTenderForm = true}>Post a Tender</button>
</div>
 