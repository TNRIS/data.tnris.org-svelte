<script>
  import { cartStore } from "../../Api/Cart/cartStore";
  import InfoBox from "../General/InfoBox.svelte";

  let wizSlide;
</script>

<div id="cart-items" bind:this={wizSlide}>
  {#key $cartStore}
    {#if $cartStore}
      {@const itemKeys = Object.keys($cartStore)}
      {#if itemKeys && itemKeys.length == 0}
        <InfoBox>There are not any items in your cart.</InfoBox>
      {:else}
        <div class="cart-item">
          {#each itemKeys as itemKey}
            <div class="cart-item">
              <div class="cart-item-description">
                {#each Object.keys($cartStore[itemKey]) as label}
                  <div class="cart-item-value">
                    <strong>
                      {#if label == "data-description" && $cartStore[itemKey]["data-description-type"] && $cartStore[itemKey]["data-description-type"].length && $cartStore[itemKey]["data-description-type"] !== "Text"}
                        {
                          label
                          .replaceAll("data-", "")
                          .replaceAll("-", " ")
                        }
                        : <span class="limit">File Attachments</span>
                      {:else}
                        {
                        label
                          .replaceAll("data-", "")
                          .replaceAll("-", " ")
                        }
                      : {$cartStore[itemKey][label]}
                      {/if}
                    </strong>
                  </div>
                {/each}
              </div>
            </div>

            <button
              class="danger"
              on:click={() => cartStore.deleteItem(itemKey)}
            >
              remove from cart
            </button>
          {/each}
        </div>
      {/if}
    {/if}
  {/key}
</div>

<style lang="scss">
  .cart-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: solid 1px #ccc;
  }
</style>
