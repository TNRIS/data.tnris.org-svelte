<script>
    export let value;
    export let callback;
</script>


<select bind:value={value} on:change={() => callback(value)}>
  <option value="-acquisition_date">NEWEST</option>
  <option value="acquisition_date">OLDEST</option>
  <option value="name">A-Z</option>
  <option value="-name">Z-A</option>
</select>
