<script>
  export let percent = 0;
</script>

<div class="track">
  <div class="meter" style="width: {percent}%;" />
</div>

<style lang="scss">
  .track {
    height: 0.5rem;
    width: 100%;
    border: solid 1px #ccc;
    border-radius: 0.25rem;

    .meter {
      background-color: $primaryColor;
      height: 100%;
      border-radius: 0.25rem;
    }
  }
</style>
