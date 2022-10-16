<script lang="ts">
  export let routes;
</script>

<div id="main-navbar-header">
  <div id="main-navbar-container">
    {#each routes as route}
      <div class="navbar-item-header">{route}</div>
    {/each}
  </div>
</div>

<style lang="scss">
  #main-navbar-header {
    padding: 1rem;
    background: $primaryColor;
    color: white;
    
    #main-navbar-container {
      display: grid;
      grid-auto-flow: column;
      justify-content: space-between;
      gap: 1rem;
      margin: auto;
      max-width: 1600px;
    }
  }
</style>
