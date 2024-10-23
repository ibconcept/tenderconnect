<script>
    let tenders = [
        { id: 1, title: "Laptop Supply", closeDate: "2024-11-01", status: "Open" },
        { id: 2, title: "Office Chairs", closeDate: "2024-12-05", status: "Open" },
    ];

    function applyToTender(id) {
        alert(`Applying to tender ID: ${id}`);
    }
</script>

<section>
    <h1>Live Tenders</h1>
    <ul>
        {#each tenders as tender (tender.id)}
            {#if tender.status === "Open"}
                <li>
                    <strong>{tender.title}</strong> - Closes: {tender.closeDate}
                    <button on:click={() => applyToTender(tender.id)}>Apply</button>
                </li>
            {/if}
        {/each}
    </ul>
</section>

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin: 1rem 0;
        padding: 1rem;
        background-color: #e9f7e9;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button {
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
    }
</style>

