<script lang="ts">
  type InfoBoxClass = "info" | "success" | "caution" | "danger";
  export let infoClass: InfoBoxClass = "info";
</script>

<div
  class="info-box"
  class:info={infoClass == "info"}
  class:success={infoClass == "success"}
  class:caution={infoClass == "caution"}
  class:danger={infoClass == "danger"}
>
  {#if infoClass == "info"}
    <i class="material-icons">info</i>
  {:else if infoClass == "caution"}
    <i class="material-icons">warning</i>
  {:else if infoClass == "danger"}
    <i class="material-icons">error</i>
  {:else if infoClass == "success"}
    <i class="material-icons">check_circle</i>
  {/if}
  <div class="info-box-text">
    <slot />
  </div>
</div>

<style lang="scss">
  .info-box {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    padding: 0.5rem;
    border: solid 1px #ccc;

    i {
      display: grid;
      grid-template-rows: 1fr;
      justify-content: center;
      align-self: center;
      font-size: 1.75rem !important;
    }

    &.info {
      color: hsl(199, 73%, 44%);
      border-left: solid .2rem hsl(199, 70%, 44%);
    }
    &.success {
      color: hsl(140, 60%, 30%);
      border-left: solid .2rem hsl(140, 60%, 30%);
    }
    &.caution {
      color: hsl(44, 80%, 30%);
      border-left: solid .2rem (44, 80%, 30%);
    }
    &.danger {
      color: hsl(0, 80%, 30%);
      border-left: solid .2rem hsl(0, 80%, 30%);
    }
  }
</style>
