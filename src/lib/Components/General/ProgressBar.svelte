<script>
  export let percent = 0;

  $: {
    percent = percent;
  }
</script>

<div class="track">
  <div class="meter" style="width: {percent}%;" />
</div>

<style lang="scss">
  .track {
    height: 0.5rem;
    width: 100%;
    border: solid 1px #ccc;

    .meter {
      background-color: $primaryColor;
      height: 100%;
    }
  }
</style>
