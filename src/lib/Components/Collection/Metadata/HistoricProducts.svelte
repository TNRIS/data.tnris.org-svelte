<script>
  export let metadata = {};

  let products = JSON.parse("[" + metadata?.products + "]");

  $: {
    console.log(products);
  }
</script>

<section>
  <h2>products</h2>
  <p>
    Historic imagery projects occasionally produced multiple printed photographs of the same imagery varying in scale, frame size, medium, and print type. The available printed photograph products for this dataset are listed below.
  </p>
  <div class="historic-products">
    {#each products as p}
      <div class="historic-product">
        <h3>{p.medium}</h3>
        {p.print_type}
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  section {
    padding-bottom: 0.5rem;
    border-bottom: solid 1px #ccc;

    .historic-products {
      .historic-product {
        padding: 0rem 0.5rem;
        border-top: solid 1px #ccc;
      }
    }
  }
</style>
