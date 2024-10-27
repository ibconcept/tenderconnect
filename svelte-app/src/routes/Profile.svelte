<script>
    let profile = {
        name: "John Doe",
        email: "john@example.com",
        organization: "Example Org",
        role: "Project Manager",
    };

    // Future enhancement: Fetch the profile data from an API or backend
</script>

<section>
    <h1>My Profile</h1>
    <div class="profile-details">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Organization:</strong> {profile.organization}</p>
        <p><strong>Role:</strong> {profile.role}</p>
    </div>
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

