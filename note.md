
<!-- app.svelte -->
<script>
    import { onMount, onDestroy } from "svelte";
    import { Router, Route, Link } from "svelte-routing";

    import Auth from "./Auth.svelte"; // Import the Auth component


    import { userTenders } from './userStore';

    import ListTenders from "./routes/ListTenders.svelte";
    import LiveTenders from "./routes/LiveTenders.svelte";
    import Profile from "./routes/Profile.svelte";
    import Suppliers from "./routes/Suppliers.svelte";
    import TenderCategories from "./routes/TenderCategories.svelte";
    import Tenders from "./routes/Tenders.svelte";

    // Application state variables
    let isLoggedIn = false;

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
        const storedTenders = localStorage.getItem("tenders");
        tenders = storedTenders
            ? JSON.parse(storedTenders)
            : [
                  {
                      id: 1,
                      title: "Tender for School Supplies",
                      description:
                          "Supply of educational materials for the upcoming term.",
                      institution: "ABC Primary School",
                      openDate: "2024-01-01",
                      closeDate: "2024-01-15",
                      contactPerson: "John Doe",
                      image: null,
                  },
                  {
                      id: 2,
                      title: "Hospital Equipment Tender",
                      description:
                          "Provision of medical equipment for XYZ Hospital.",
                      institution: "XYZ Hospital",
                      openDate: "2024-02-01",
                      closeDate: "2024-02-20",
                      contactPerson: "Jane Smith",
                      image: null,
                  },
                  {
                      id: 3,
                      title: "Community Project Development",
                      description:
                          "Construction of community center in downtown.",
                      institution: "City Council",
                      openDate: "2024-03-01",
                      closeDate: "2024-03-15",
                      contactPerson: "Alice Johnson",
                      image: null,
                  },
                  {
                      id: 4,
                      title: "IT Services Tender",
                      description:
                          "Provision of IT support services for local government.",
                      institution: "Local Government Office",
                      openDate: "2024-04-01",
                      closeDate: "2024-04-15",
                      contactPerson: "Bob Brown",
                      image: null,
                  },
              ];
    }

    onMount(() => {
        loadTenders();

        function handleClickOutside(event) {
            const menu = document.querySelector(".menu");
            const hamburger = document.querySelector(".hamburger");
            if (
                menu &&
                !menu.contains(event.target) &&
                !hamburger.contains(event.target)
            ) {
                showMenu = false;
            }
        }

        document.addEventListener("click", handleClickOutside);
        onDestroy(() => {
            document.removeEventListener("click", handleClickOutside);
        });
    });

    function toggleMenu() {
        showMenu = !showMenu; // Toggle the menu visibility
    }

    function viewTender(tenderId) {
        selectedTender = tenders.find((t) => t.id === tenderId);
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
        terms: newTenderTerms,
    };

    // Update the userTenders store
    userTenders.update(tenders => [...tenders, newTender]);

    // Optional: You may still want to store tenders in local storage
    const storedTenders = localStorage.getItem("tenders");
    const allTenders = storedTenders ? JSON.parse(storedTenders) : [];
    allTenders.push(newTender);
    localStorage.setItem("tenders", JSON.stringify(allTenders));

    // Reset the form and load tenders if needed
    showPostTenderForm = false;
    resetTenderForm();
    loadTenders(); // You may not need to load from localStorage if using store
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

    function hideMenu() {
        showMenu = false; // Hides the menu
    }

    // Function to set login state
    function setLoginState(state) {
        isLoggedIn = state;
    }



</script>

<header>
    <div class="logo-container">
        <a href="https://ibconcept.github.io/tenderconnect/">
            <img src="../logo.PNG" alt="Tender Portal Logo" />
        </a>
    </div>
    <h1>TenderConnect</h1>
    <button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
        ☰
    </button>
</header>

<Router>
    <nav>
        {#if showMenu}
            <ul class="menu">
                <li><Link to="/profile" on:click={hideMenu}>Profile</Link></li>
                <li>
                    <Link to="/list-tenders" on:click={hideMenu}
                        >List Tenders</Link
                    >
                </li>
                <li>
                    <Link to="/live-tenders" on:click={hideMenu}
                        >Live Tenders</Link
                    >
                </li>
                <li>
                    <Link to="/suppliers" on:click={hideMenu}>Suppliers</Link>
                </li>
                <li>
                    <Link to="/tender-categories" on:click={hideMenu}
                        >Tender Categories</Link
                    >
                </li>
                <li><Link to="/" on:click={hideMenu}>Tenders</Link></li>
            </ul>
        {/if}
    </nav>

    <!-- Only render the current route's component -->
    <main>

        <Route path="/auth" component={Auth} props={{ setLoginState }} />
        <Route path="/profile" component={Profile} />
        <Route path="/list-tenders" component={ListTenders} />
        <Route path="/live-tenders" component={LiveTenders} />
        <Route path="/suppliers" component={Suppliers} />
        <Route path="/tender-categories" component={TenderCategories} />
        <Route path="/" component={Tenders} />
    </main>
</Router>
  

{#if !isLoggedIn}
    <div id="auth">
        <h2>Login  to join</h2>
        <button on:click={() => (isLoggedIn = true)}>Login</button>
    </div>
{:else if showPostTenderForm}
    <div id="post-tender-form">
        <h3>Upload a New Tender</h3>
        <form on:submit={submitTender}>
            <label for="institution">Institution Name</label>
            <input
                type="text"
                id="institution"
                bind:value={newTenderInstitution}
                required
            />

            <label for="title">Tender Title</label>
            <input
                type="text"
                id="title"
                bind:value={newTenderTitle}
                required
            />

            <label for="description">Tender Description</label>
            <textarea
                id="description"
                bind:value={newTenderDescription}
                required
            ></textarea>

            <label for="openDate">Opening Date</label>
            <input
                type="date"
                id="openDate"
                bind:value={newTenderOpenDate}
                required
            />

            <label for="closeDate">Closing Date</label>
            <input
                type="date"
                id="closeDate"
                bind:value={newTenderCloseDate}
                required
            />

            <label for="contactPerson">Contact Person</label>
            <input
                type="text"
                id="contactPerson"
                bind:value={newTenderContactPerson}
                required
            />

            <label for="companyRegCert">Company Registration Certificate</label>
            <input
                type="file"
                id="companyRegCert"
                accept=".pdf,image/jpeg,image/png"
                bind:value={newTenderCompanyRegCert}
                required
            />

            <label for="kraPin">KRA PIN</label>
            <input
                type="text"
                id="kraPin"
                bind:value={newTenderKraPin}
                required
            />

            <label for="idCard">Person of Interest ID Card</label>
            <input
                type="file"
                id="idCard"
                accept=".pdf,image/jpeg,image/png"
                bind:value={newTenderIdCard}
                required
            />

            <label for="position">Position of the Person</label>
            <input
                type="text"
                id="position"
                bind:value={newTenderPosition}
                required
            />

            <label for="terms">Tender Contract Agreement Terms</label>
            <textarea id="terms" bind:value={newTenderTerms} required
            ></textarea>

            <button type="submit">Submit Tender</button>
            <button type="button" on:click={() => (showPostTenderForm = false)}
                >Back</button
            >
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
            <img
                src={selectedTender.image}
                alt={selectedTender.title}
                width="200"
            />
        {/if}
        <h3>Apply for Tender</h3>
        <form on:submit={submitQuote}>
            <textarea placeholder="Enter your quote"></textarea>
            <input type="file" id="quote-file" />
            <button type="submit">Submit Quote</button>
        </form>
        <button on:click={() => (selectedTender = null)}>Back to Tenders</button
        >
    </div>
{:else}
    <h2>
        Your gateway to opportunities for schools, hospitals, and community
        projects.
    </h2>
    <h3
        style="border: 2px orange dotted; width: 50%; margin: 0 auto; border-radius:5px;"
    >
        Apply for available Tenders
    </h3>
    <div id="tender-items">
        {#each tenders as tender}
            <button
                class="tender-item"
                on:click={() => viewTender(tender.id)}
                aria-label={`View tender: ${tender.title}`}
            >
                <h3>{tender.title}</h3>
                <p>{tender.description}</p>
                <p><strong>Institution:</strong> {tender.institution}</p>
                {#if tender.image}
                    <img src={tender.image} alt={tender.title} width="100" />
                {/if}
            </button>
        {/each}
    </div>
{/if}

<!-- Call to Action Button -->
<div class="cta">
    <button on:click={() => (showPostTenderForm = true)}>Submit Tender</button>
</div>




<!-- add my docment route //documents
also add crud features
fiebrebase vs supabase //
when you go to list it show the tenders you have applied.  -->
also the submit part . should have the tender  ask the supplier the document he like or like proof of capcity
also requiremnts  both parties need to state the requiremnent
doct part for the send the quotaion or another route for this
<!-- on exceptions and  EMAIL DOMAINS TO BE PREFERED // VERIFICATION AND VALIDITY CHCKING VALIDATIONS -->
postgress db
