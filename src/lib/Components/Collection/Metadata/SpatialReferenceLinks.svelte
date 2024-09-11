<script>
    export let field;
    export let collection;
    export let showLink = false; // Overwrite this to true in the Component initializer if you want to add a hyperlink to epsg.io

    /**
     * get a promise to display either a human readable string for the epsg code or false;
     * @returns {Promise<[string, string] | boolean>} returns an array with a hyperlink and a name; [name, hypserlink]
     */
    let getEpsgReadablePromise = async () => {
      // Ensure spatial reference is defined
      if(!(collection?.spatial_reference && collection.spatial_reference.length)) return false;

      try {
        const link = `https://epsg.io/${collection.spatial_reference}`;

        // Connect and parse the info from epsg.io.
        const res = await fetch(`${link}.json`);
        const text = await res.text()
        const epsg_info = JSON.parse(text);

        // Return the 
        if(epsg_info && typeof epsg_info?.name == "string" && epsg_info?.name?.length) {
          return [epsg_info.name, link];
        } else {
          return false;
        }
      } catch(err) {
          console.log("Problem getting human readable name from epsg.io. Falling back to just the code instead.")
          return false;
      }
    }
</script>


<section class="metadata-section">
    {#await getEpsgReadablePromise()}
      <h2>{field.label}</h2>
      {@html collection[field.key]}
    {:then readable_name}
        <h2>{field.label}</h2>
        {#if readable_name}
          {#if showLink}
            <div>
              <a href={readable_name[1]} rel="noreferrer" target="_blank">
                {readable_name[0]}
              </a>
            </div>
          {:else} 
            <div>
              {readable_name[0]}
            </div>
          {/if}
        {:else}
          {@html collection[field.key]}
        {/if}
    {/await}
  </section>
  

  <style lang="scss">
    h2 {
      text-transform: capitalize;
    }

    .metadata-section {
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.5rem;
    }
  </style>
  