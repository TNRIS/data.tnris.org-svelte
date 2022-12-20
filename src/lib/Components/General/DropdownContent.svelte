<script>
</script>

<div class="dropdown-content">
  <slot />
</div>

<style lang="scss">
  .dropdown-content {
    display: grid;
    position: absolute;
    background: white;
    padding: 0.5rem;
    border: solid 1px $borderColor;
    border-radius: 0.25rem;
    box-shadow: 1px 1px 4px $borderColor, 2px 2px 0.5rem $borderColor;
  }
</style>
