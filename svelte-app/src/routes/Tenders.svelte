<!-- <script>
    let tenders = [
        { id: 1, title: "Supply of Laptops", status: "Closed" },
        { id: 2, title: "Cafeteria Services", status: "Open" }
    ];

    function viewTenderDetails(id) {
        alert(`Viewing details for tender ID: ${id}`);
    }
</script>

<section>
    <h1>My Tenders</h1>
    <ul>
        {#each tenders as tender}
            <li>
                <strong>{tender.title}</strong> - Status: {tender.status}
                <button on:click={() => viewTenderDetails(tender.id)}>View Details</button>
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
        background-color: #f1f1f1;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
 -->
