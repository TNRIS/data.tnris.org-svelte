<script>
  export let formRef;

  let formValues;

  $: {
    if (formRef) {
      let fd = new FormData(formRef);
      formValues = Object.fromEntries(fd);
    }
  }
</script>

{#if formValues}
  {#each Object.entries(formValues) as value}
    {#if value[0] != "g-recaptcha-response"}
      <strong>{value[0].replaceAll("data-", "").replaceAll("-", " ")}:</strong>
      <p>{value[1]}</p>
    {/if}
  {/each}
{/if}

<button type="submit">Submit</button>
