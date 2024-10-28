<script>

// import tenders that one has applied to here ... also add crud features

    let tenders = [
        { id: 1, title: "Supply of Desks", openDate: "2024-10-15", closeDate: "2024-11-15" },
        { id: 2, title: "School Renovation", openDate: "2024-09-10", closeDate: "2024-12-01" }
    ];

    function viewTenderDetails(id) {
        alert(`Viewing details for tender ID: ${id}`);
    }
</script>

<section>
    <h1>List My Tenders</h1>
    <ul>
        {#each tenders as tender}
            <li>
                <strong>{tender.title}</strong>
                <p>Open: {tender.openDate} | Close: {tender.closeDate}</p>
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
        margin: 1rem 0;
        padding: 1rem;
        background-color: orange;
        border-radius: 8px;
    }
</style>

