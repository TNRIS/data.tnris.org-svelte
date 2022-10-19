<script>
  import Tabs from "./Tabs.svelte";
  import { useLocation } from "svelte-navigator";

  const location = useLocation();
  const search = new URLSearchParams($location.search) 
</script>

<div id="collection-info-container">
  <div id="collection-info-header"><h1>{ search.get("c") }</h1></div>
  <Tabs />
</div>

<style lang="scss">
  #collection-info-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;

    #collection-info-header {
      padding: .25rem .5rem;
    }
  }
</style>
