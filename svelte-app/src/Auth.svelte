<!-- Auth.svelte -->
<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { userStore, userTenders } from './userStore'; // Import the store
  import { initNetlifyIdentity, login, logout, signup } from './netlifyIdentity';

  let user;

  onMount(() => {
    initNetlifyIdentity(userStore, navigate);
    
    // Subscribe to user store to get user updates
    userStore.subscribe(value => {
      user = value;
    });
  });
</script>

{#if user}
  <div>
      <p>Welcome, {user.user_metadata.full_name}</p>
      <button on:click={logout}>Logout</button>
  </div>
{:else}
  <button on:click={login}>Login</button>
  <button on:click={signup}>Sign Up</button> <!-- Add signup button -->
{/if}

{#if user}
  <div>
      <p>Welcome, {user.user_metadata.full_name}</p>
      <button on:click={logout}>Logout</button> <!-- Ensure this is included -->
  </div>
{:else}
  <button on:click={login}>Login</button>
  <button on:click={signup}>Sign Up</button>
{/if}
