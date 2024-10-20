
<script>
    import { onMount } from "svelte";
    import StarRating from "./StarRating.svelte"; // Assuming this is in your components
    import TenderList from "./TenderList.svelte"; // Assuming this is another component
    import TenderDetail from "./TenderDetail.svelte"; // Assuming this is another component
  
    let isLoggedIn = true;
    let tenders = [];
    let selectedTender = null;
    let showPostTenderForm = false;
    let newTender = {
      title: "",
      description: "",
      institution: "",
      openDate: "",
      closeDate: "",
      contactPerson: "",
      image: null,
      likes: 0,
      comments: [],
      rating: 0,
    };
  
    // Load initial tenders from LocalStorage
    onMount(() => {
      const storedTenders = JSON.parse(localStorage.getItem("tenders")) || [];
      const currentDate = new Date().toISOString().split("T")[0];
      const validTenders = storedTenders.filter((tender) => tender.closeDate >= currentDate);
      tenders = validTenders;
    });
  
    const saveTendersToLocalStorage = (updatedTenders) => {
      localStorage.setItem("tenders", JSON.stringify(updatedTenders));
    };
  
    const toggleLike = (tenderId) => {
      tenders = tenders.map((tender) =>
        tender.id === tenderId ? { ...tender, likes: tender.likes === 0 ? 1 : 0 } : tender
      );
      saveTendersToLocalStorage(tenders);
    };
  
    const addComment = (tenderId, comment) => {
      tenders = tenders.map((tender) =>
        tender.id === tenderId ? { ...tender, comments: [...(tender.comments || []), comment] } : tender
      );
      saveTendersToLocalStorage(tenders);
    };
  
    const handleStarRating = (tenderId, rating) => {
      tenders = tenders.map((tender) =>
        tender.id === tenderId ? { ...tender, rating } : tender
      );
      saveTendersToLocalStorage(tenders);
    };
  
    const handleSelectTender = (tender) => {
      selectedTender = tender;
    };
  
    const handleTenderChange = (e) => {
      const { name, value } = e.target;
      newTender = { ...newTender, [name]: value };
    };
  
    const handleImageUpload = (e) => {
      newTender = { ...newTender, image: URL.createObjectURL(e.target.files[0]) };
    };
  
    const submitTender = (e) => {
      e.preventDefault();
      const tenderWithId = { ...newTender, id: tenders.length + 1 };
      tenders = [...tenders, tenderWithId];
      saveTendersToLocalStorage(tenders);
      showPostTenderForm = false;
      newTender = {
        title: "",
        description: "",
        institution: "",
        openDate: "",
        closeDate: "",
        contactPerson: "",
        image: null,
        likes: 0,
        comments: [],
        rating: 0,
      };
    };
  </script>
  
  <!-- Assuming styles are in 'styles.css' -->
  <link rel="stylesheet" href="/styles.css" />
  
  <div class="container">
    <header>
      <img src="/logo.PNG" alt="Logo" width="100" height="100" />
      <h2>Tender Portal</h2>
      <p>Your gateway to verified tender opportunities.</p>
      <nav>
        <button on:click={() => (window.location.href = '/profile')}>My Profile</button>
        <button on:click={() => (window.location.href = '/my-tenders')}>My Tenders</button>
        <button on:click={() => (window.location.href = '/suppliers')}>Suppliers</button>
      </nav>
    </header>
  
    {#if !isLoggedIn}
      <div id="auth">
        <h2>Login with OAuth</h2>
        <button on:click={() => (isLoggedIn = true)}>Login</button>
      </div>
    {:else if showPostTenderForm}
      <div id="post-tender-form">
        <h3>Post a New Tender</h3>
        <form on:submit={submitTender}>
          <input type="text" name="institution" bind:value={newTender.institution} placeholder="Institution Name" required />
          <input type="text" name="title" bind:value={newTender.title} placeholder="Tender Title" required />
          <textarea name="description" bind:value={newTender.description} placeholder="Tender Description" required></textarea>
          <input type="date" name="openDate" bind:value={newTender.openDate} required />
          <input type="date" name="closeDate" bind:value={newTender.closeDate} required />
          <input type="text" name="contactPerson" bind:value={newTender.contactPerson} placeholder="Contact Person" required />
          <input type="file" on:change={handleImageUpload} accept="image/*" required />
          <button type="submit">Post Tender</button>
        </form>
        <button on:click={() => (showPostTenderForm = false)}>Cancel</button>
      </div>
    {:else}
      <button on:click={() => (showPostTenderForm = true)}>Post a Tender</button>
      <TenderList {tenders} {toggleLike} {handleStarRating} {handleSelectTender} />
    {/if}
  
    {#if selectedTender}
      <TenderDetail
        {tender}
        toggleLike={toggleLike}
        handleStarRating={handleStarRating}
        addComment={addComment}
        setSelectedTender={() => (selectedTender = null)}
      />
    {/if}
  </div>
  