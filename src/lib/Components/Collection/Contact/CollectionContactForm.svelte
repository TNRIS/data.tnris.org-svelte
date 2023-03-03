<script>
  import InfoBox from "../../General/InfoBox.svelte";

  const softwareList = [
    "ArcMap",
    "ENVI",
    "ERDAS",
    "Global Mapper",
    "Integraph",
    "LP360",
    "Microstation",
    "PostGIS",
    "QGIS",
    "Other",
  ];
</script>

<form
  id="collection-contact-form"
  on:submit|preventDefault={(d) => console.log(d)}
>
  <label for="first_name" class="required">
    First Name
    <input
      type="text"
      id="first_name"
      name="first_name"
      maxlength={40}
      minlength={2}
      required
    /></label
  >
  <label for="last_name" class="required">
    Last Name
    <input
      type="text"
      id="last_name"
      name="last_name"
      maxlength={40}
      minlength={2}
      required
    /></label
  >
  <label for="email" class="required">
    Email
    <input
      type="email"
      id="email"
      name="email"
      maxlength={40}
      minlength={2}
      required
    /></label
  >
  <label for="software" class="required">
    Software
    <select id="software" name="software" required>
      {#each softwareList as s}
        <option value={s.replace(" ", "_")}>{s}</option>
      {/each}
    </select></label
  >
  <label for="comment" class="required">
    Comment
    <textarea
      id="comment"
      name="comment"
      maxlength={400}
      minlength={10}
      required
    />
  </label>
</form>

<style lang="scss">
</style>
