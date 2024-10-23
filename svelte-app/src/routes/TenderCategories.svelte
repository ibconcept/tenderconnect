<script>
    let categories = ["Construction", "IT Supplies", "Healthcare", "Education"];

    function viewCategory(category) {
        alert(`Viewing tenders in ${category} category`);
    }
</script>

<section>
    <h1>Tender Categories</h1>
    <ul>
        {#each categories as category}
            <li>
                {category}
                <button on:click={() => viewCategory(category)}>View Tenders</button>
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
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
    }
</style>

