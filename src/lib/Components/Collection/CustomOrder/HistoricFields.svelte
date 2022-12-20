<script>
  let historicFormat = [];
  const historicImageryFormatOptions = [
    { label: "Paper 8x11", value: "8X11" },
    { label: "Paper 11x17", value: "11x17" },
    { label: "Digital Scan", value: "Scan" },
    { label: "Georeferences", value: "Georeferenced" },
  ];
</script>

<label for="data-historic-format" class="required">
  Select the desired formats for the historic imagery. Hold Ctrl and click to select multiple.
  <select id="data-historic-format" name="data-historic-format" multiple bind:value={historicFormat} required>
    {#each historicImageryFormatOptions as opt}
      <option value={opt.value}>{opt.label}</option>
    {/each}
  </select>
</label>
