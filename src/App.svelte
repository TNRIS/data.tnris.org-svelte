<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import { click } from "svelte-pathfinder";
  import Footer from "./lib/Components/Footer.svelte";
  import Header from "./lib/Components/Header.svelte";
  import Main from "./lib/Components/Main.svelte";
  const queryClient = new QueryClient();
</script>

<!-- 
  <svelte:window on:click={click} />
 -->
<main id="app">
  <QueryClientProvider client={queryClient}>
    <Header />
    <Main />
    <Footer />
  </QueryClientProvider>
</main>

<style lang="scss">
  #app {
    display: grid;
    grid-template-rows: auto 1fr auto;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }
</style>
