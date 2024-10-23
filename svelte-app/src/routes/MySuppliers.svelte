<script>
    let suppliers = [
        { id: 1, name: "Tech Supplies Inc.", contact: "tech@example.com" },
        { id: 2, name: "Catering Co.", contact: "catering@example.com" }
    ];

    function contactSupplier(id) {
        alert(`Contacting supplier ID: ${id}`);
    }
</script>

<section>
    <h1>My Suppliers</h1>
    <ul>
        {#each suppliers as supplier}
            <li>
                <strong>{supplier.name}</strong> - {supplier.contact}
                <button on:click={() => contactSupplier(supplier.id)}>Contact</button>
            </li>
        {/each}
    </ul>
</section>

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin: 0.5rem 0;
        padding: 1rem;
        background-color: #f8f8f8;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button {
        padding: 0.5rem 1rem;
        border: none;
        background-color: #007BFF;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }
</style>

