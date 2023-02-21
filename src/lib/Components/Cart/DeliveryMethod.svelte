<script>
  import { DELIVERY_OPTIONS, HARD_DRIVE_OPTIONS } from "../../constants";

  // Uncomment below to use formRef passed from Wizard
  //export let formRef;

  let delOpt;
  let showHDDSelect;

  const showHardDriveSelectFn = (opt) => {
    if (opt == DELIVERY_OPTIONS[0].value) {
      return false;
    }
    if (opt == DELIVERY_OPTIONS[1].value) {
      return true;
    }
    if (opt == DELIVERY_OPTIONS[2].value) {
      return true;
    }
    if (opt == DELIVERY_OPTIONS[3].value) {
      return true;
    }
    return false;
  };

  $: {
    showHDDSelect = showHardDriveSelectFn(delOpt);
  }

</script>

<label for="data-delivery-method" class="required">
  Delivery Method
  <select
    bind:value={delOpt}
    id="data-delivery-method"
    name="data-delivery-method"
    required
  >
    {#each DELIVERY_OPTIONS as deliveryOption}
      <option value={deliveryOption.value}>{deliveryOption.label}</option>
    {/each}
  </select>
</label>

{#if showHDDSelect}
  <label for="data-hard-drive" class="required">
    Hard Drive Options
    <select id="data-hard-drive" name="data-hard-drive" required>
      {#each HARD_DRIVE_OPTIONS as hardDrive}
        <option value={hardDrive.value}>{hardDrive.label}</option>
      {/each}
    </select>
  </label>
{/if}
