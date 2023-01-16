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
      {:else}{#each itemKeys as itemKey}
          {#each Object.keys($cartStore[itemKey]) as label}
            <div>{label}: {$cartStore[itemKey][label]}</div>
          {/each}
          <button on:click={() => cartStore.deleteItem(itemKey)}
            >delete item</button
          >
        {/each}
      {/if}
    {/if}
  {/key}
  <button
    on:click={() => {
      if (wizSlide) {
        let inputs = [
          ...wizSlide.getElementsByTagName("input"),
          ...wizSlide.getElementsByTagName("textarea"),
          ...wizSlide.getElementsByTagName("select"),
        ];

        inputs.forEach((i) => {
          console.log(i, i.validity);
        });
      }
    }}>test</button
  >
  <input type="tel" required pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"} />
</div>
