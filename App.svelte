<script>
    let isLoggedIn = true;
    let tenders = [
        {
            id: 1,
            title: "School Renovation",
            description: "Renovation of classrooms and facilities.",
            image: null,
            institution: "Green Valley School",
            openDate: "2024-10-01",
            closeDate: "2024-10-15",
            contactPerson: "Alice Johnson"
        },
        {
            id: 2,
            title: "Hospital Equipment Supply",
            description: "Supply of medical equipment for the new wing.",
            image: null,
            institution: "City Hospital",
            openDate: "2024-10-05",
            closeDate: "2024-10-20",
            contactPerson: "Dr. Mark Lee"
        },
        {
            id: 3,
            title: "Community Center Construction",
            description: "Building a new community center for local events.",
            image: null,
            institution: "Sunny Community Center",
            openDate: "2024-10-10",
            closeDate: "2024-10-25",
            contactPerson: "John Smith"
        }
    ];
    let selectedTender = null;
    let showPostTenderForm = false;
    let newTenderTitle = "";
    let newTenderDescription = "";
    let newTenderImage = null;
    let newTenderInstitution = "";
    let newTenderOpenDate = "";
    let newTenderCloseDate = "";
    let newTenderContactPerson = "";
    let tenderCounter = 3; // Set to the current highest ID

    // Load tenders from Local Storage
    function loadTendersFromLocalStorage() {
        const storedTenders = JSON.parse(localStorage.getItem('tenders'));
        if (storedTenders) {
            tenders = storedTenders;
            tenderCounter = tenders.length > 0 ? tenders[tenders.length - 1].id : 0;
        }
    }

    // Save tenders to Local Storage
    function saveTendersToLocalStorage() {
        localStorage.setItem('tenders', JSON.stringify(tenders));
    }

    // Load tenders on component mount
    loadTendersFromLocalStorage();

    function viewTender(tenderId) {
        selectedTender = tenders.find(t => t.id === tenderId);
    }

    function submitQuote(event) {
        event.preventDefault();
        alert("Quote submitted for tender.");
        selectedTender = null; // Return to tender list
    }

    function submitTender(event) {
        event.preventDefault();
        const newTender = {
            id: ++tenderCounter,
            title: newTenderTitle,
            description: newTenderDescription,
            image: newTenderImage ? URL.createObjectURL(newTenderImage) : null,
            institution: newTenderInstitution,
            openDate: newTenderOpenDate,
            closeDate: newTenderCloseDate,
            contactPerson: newTenderContactPerson
        };
        tenders.push(newTender);
        saveTendersToLocalStorage(); // Save to Local Storage
        showPostTenderForm = false; // Hide the form after submission
        // Reset fields
        newTenderTitle = "";
        newTenderDescription = "";
        newTenderImage = null;
        newTenderInstitution = "";
        newTenderOpenDate = "";
        newTenderCloseDate = "";
        newTenderContactPerson = "";
    }

    // Handle file input change
    function handleImageUpload(event) {
        newTenderImage = event.target.files[0];
    }
</script>

<header>
    <h1>Tender Portal</h1>
    <p>Your gateway to opportunities for schools, hospitals, and community projects.</p>
    <img src="logo.png" alt="Tender Portal Logo" />
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
            <input type="text" bind:value={newTenderInstitution} placeholder="Institution Name" required />
            <input type="text" bind:value={newTenderTitle} placeholder="Tender Title" required />
            <textarea bind:value={newTenderDescription} placeholder="Tender Description" required></textarea>
            <input type="date" bind:value={newTenderOpenDate} placeholder="Open Date" required />
            <input type="date" bind:value={newTenderCloseDate} placeholder="Close Date" required />
            <input type="text" bind:value={newTenderContactPerson} placeholder="Contact Person" required />
            <input type="file" accept="image/*" on:change={handleImageUpload} />
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
            <img src={selectedTender.image} alt="Tender Image" width="200" />
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
    <div id="tender-list">
        <h2>Available Tenders</h2>
        <button on:click={() => loadTendersFromLocalStorage()}>Refresh Tenders</button>
        <button on:click={() => showPostTenderForm = true}>Post Tender</button>
        
        <div id="tender-items">
            {#each tenders as tender}
                <button class="tender-item" on:click={() => viewTender(tender.id)}>
                    <h3>{tender.title}</h3>
                    <p>{tender.description}</p>
                    <p><strong>Institution:</strong> {tender.institution}</p>
                    {#if tender.image}
                        <img src={tender.image} alt="Tender Image" width="100" />
                    {/if}
                </button>
            {/each}
        </div>
    </div>
{/if}

<style>
    body { font-family: "Poppins", sans-serif; background-color: #f4f4f9; color: #333; }
    header { text-align: center; padding: 20px; background-color: #4CAF50; color: white; }
    #auth, #tender-list, #tender-detail, #post-tender-form { margin: 20px; padding: 15px; border-radius: 5px; background-color: #fff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
    button { margin: 5px; background-color: #4CAF50; color: rgb(0, 0, 0); border: none; border-radius: 5px; padding: 10px 15px; cursor: pointer; }
    button:hover { background-color: #45a049; }
    .tender-item { cursor: pointer; border: 1px solid #ccc; padding: 10px; margin: 5px; display: inline; border-radius: 5px; background-color: #f9f9f9; }
</style>
