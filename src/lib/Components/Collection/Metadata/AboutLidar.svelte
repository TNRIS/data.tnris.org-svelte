<script>
  export let metadata = {};
</script>

{#if metadata?.category?.includes("Lidar")}
  <section>
    <h2>About Lidar Data</h2>
    <p>
      Lidar data for Texas is available online through the use of <a
        href="https://rapidlasso.com/product-overview/"
        target="_blank"
      >
        LASTools</a
      >, an open-source collection of tools for lidar data viewing and
      manipulation.
    </p>
    <p>
      Click <a
        href="https://tnris-data-warehouse.s3.us-east-1.amazonaws.com/LCD/collection/lidar_availability/Availability-Index/txgio-lidar-index.zip"
        >here</a
      > to download a complete index of all available lidar data at TxGIO.
    </p>
  </section>
{/if}

<style lang="scss">
  section {
    border-bottom: solid 1px #ccc;
  }
</style>
