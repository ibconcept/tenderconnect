<script>
    import { onMount } from 'svelte';

    let isLoggedIn = true;
    let tenders = [];
    let selectedTender = null;
    let showPostTenderForm = false;
    
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
    let showMenu = false; 

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
        showMenu = !showMenu;
    }
</script>

<header>
    <div class="logo-container">
        <a href="https://ibconcept.github.io/tenderconnect/">
            <img src="../logo.PNG" alt="Tender Portal Logo" />
        </a>
    </div>
    
    <div class="site-info">
        <h1>Tender Portal</h1>
        <h2>Your gateway to opportunities for schools, hospitals, and community projects.</h2>
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

<!-- Tenders Button with Accessibility Fix -->
<a href="/post-tender" class="cta">Post a Tender</a>

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
        <h2>Apply for available Tenders</h2>
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
