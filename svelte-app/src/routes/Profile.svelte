<!-- Profile.svelte -->
<script>
    import { onDestroy } from 'svelte';
    import { userStore, userTenders } from '../userStore'; // Import the stores

    let user;
    let tenders = [];

    // Subscribe to userStore
    const unsubscribeUser = userStore.subscribe(value => {
        user = value; // Get user data
    });

    // Subscribe to userTenders
    const unsubscribeTenders = userTenders.subscribe(value => {
        tenders = value; // Get user's tenders
    });

    onDestroy(() => {
        unsubscribeUser();
        unsubscribeTenders();
    });
</script>

<section>
    <h1>My Profile</h1>
    <div class="profile-details">
        {#if user}
            <p><strong>Name:</strong> {user.user_metadata.full_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Organization:</strong> {user.user_metadata.organization || 'N/A'}</p>
            <p><strong>Role:</strong> {user.user_metadata.role || 'N/A'}</p>
        {:else}
            <p>Please log in to see your profile.</p>
        {/if}
    </div>
    <h2>Your Submissions</h2>
    <ul>
        {#each tenders as tender}
            <li>{tender.title}</li>
        {/each}
    </ul>
    <button on:click={() => alert('Edit Profile feature coming soon!')}>Edit Profile</button>
</section>

<style>
    section {
        padding: 1rem;
    }
    .profile-details {
        background-color: #f8f8f8;
        padding: 1rem;
        border-radius: 8px;
    }
    button {
        margin-top: 1rem;
    }
</style>
