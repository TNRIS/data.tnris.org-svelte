<script>
  export let href = "#";
  export let title = "link";
  export let isPlaintext = false;
  export let buttonText = "Copy Link";
</script>

<div class="copy-link">
  {#if isPlaintext != true}
    <a id="s3-uri-link" {href} target="_blank" rel="noreferrer">
      {href}
    </a>
    <button
      on:click={() => {
        let txt = href;
        navigator.clipboard.writeText(txt);
      }}><i class="material-icons">content_copy</i> {buttonText}</button
    >
  {:else}
    <p>{title}</p>
    <button
      on:click={() => {
        let txt = title;
        navigator.clipboard.writeText(txt);
      }}><i class="material-icons">content_copy</i> {buttonText}</button
    >
  {/if}
</div>

<style lang="scss">
  div.copy-link {
    padding: 0.25rem;
    border: solid 1px #ccc;
    display: grid;
    a {
      padding: 0.25rem;
      overflow-wrap: anywhere;
    }
    button.copy-link-button {
      margin-top: 0.5rem;
      color: white;
      background: $primaryColor;
    }
  }
</style>
