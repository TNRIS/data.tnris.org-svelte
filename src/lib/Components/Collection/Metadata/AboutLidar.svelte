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
        href="https://portal.geographic.texas.gov/portal/apps/experiencebuilder/experience/?id=283a3b9907134c63b43a5538bf12066c&_gl=1*jdv0pb*_ga*MjExMjI2MTAwMC4xNzY5MTg1NTAx*_ga_CGH7RBEG6M*czE3NjkxODU1MDgkbzEkZzEkdDE3NjkxODU5NTQkajU2JGwwJGgw"
        >here</a
      > to view a complete index of all available lidar data at TxGIO.
    </p>
  </section>
{/if}

<style lang="scss">
  section {
    border-bottom: solid 1px #ccc;
  }
</style>
