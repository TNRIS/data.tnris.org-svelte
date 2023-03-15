<script lang="ts">
  export let checked: boolean = false;

  let toggle = () => (checked = !checked);
</script>

<div class="switch-container">
  <input type="checkbox" class="switch" bind:checked />
  <label on:click={toggle} on:keydown={() => {}} for="switch">Toggle</label>
</div>

<style lang="scss">
  // centering
  .switch-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 40px;

    input[type="checkbox"] {
      height: 0;
      width: 0;
      visibility: hidden;
      display: none;
    }

    label {
      cursor: pointer;
      text-indent: -9999px;
      width: 50px;
      height: 16px;
      background: grey;
      display: block;
      position: relative;
    }

    label:after {
      content: "";
      position: absolute;
      top: -2px;
      left: 0;
      width: 20px;
      height: 20px;
      background: #fff;
      transition: 0.3s;
      box-shadow: 0px 0px 4px #33333380;
    }

    input:checked + label {
      background: $primaryColor;
    }

    input:checked + label:after {
      left: calc(100% - 0px);
      transform: translateX(-100%);
    }

    label:active:after {
      width: 40px;
    }
  }
</style>
