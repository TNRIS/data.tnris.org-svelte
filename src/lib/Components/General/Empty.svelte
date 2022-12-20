<script>
  export let message = "Aww, shucks! No results found.";
  export let icon = "heart_broken";
</script>

<div class="empty-results-container">
  <div class="empty-results">
    <i class="material-icons empty-results">{icon}</i>
    <p>{message}</p>
  </div>
</div>

<style lang="scss">
  .empty-results-container {
    display: grid;
    grid-template-rows: auto auto;
    justify-content: center;
    align-items: center;

    .empty-results {
        display: grid;
        align-items: center;
        justify-content: center;
    }

    .material-icons.empty-results {
      font-size: 2.5rem !important;
      color: $primaryColor;
    }

    p {
      font-size: 1rem;
      color: $primaryColor;
    }
  }
</style>
