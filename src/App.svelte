<script lang="ts">
  import Footer from "./lib/Components/Footer.svelte";
  import Header from "./lib/Components/Header.svelte";
  import Main from "./lib/Components/Main.svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";

  const queryClient = new QueryClient();
</script>

<main id="app">
  <QueryClientProvider client={queryClient}>
    <Header />
    <Main />
    <Footer routes={["Footer", "Routes"]} />
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
