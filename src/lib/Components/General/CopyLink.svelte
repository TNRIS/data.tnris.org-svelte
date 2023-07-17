<script>
  export let href = "#";
  export let title = "link";
  export let buttonText = "Copy Link";

  let link = href.replace(".org/arcgis/", ".org/arcgis/rest/");
  link = href.replace("/server/services/", "/server/rest/services/")
</script>

<div class="copy-link">
  <a id="s3-uri-link" href={link} target="_blank" rel="noreferrer">
    {link}
  </a>
  <button
    on:click={() => {
      let txt = href;
      navigator.clipboard.writeText(txt);
    }}><i class="material-icons">content_copy</i> {buttonText}</button
  >
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
