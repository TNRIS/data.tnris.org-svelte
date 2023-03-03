<script lang="ts">
  import { INDUSTRIES_OPTIONS, STATES_NAMES } from "../../constants";

  export const formRef: HTMLFormElement | null = null;
</script>

<label for="data-first-name" class="required">
  First Name
  <input id="data-first-name" name="data-first-name" maxlength={40} required />
</label>

<label for="data-last-name" class="required">
  Last Name
  <input id="data-last-name" name="data-last-name" maxlength={40} required />
</label>

<label for="data-address" class="required">
  Address
  <input id="data-address" name="data-address" required />
</label>

<label for="data-city" class="required">
  City
  <input id="data-city" name="data-city" required />
</label>

<label for="data-state" class="required">
  State
  <select id="data-state" name="data-state" value="TX" required>
    {#each STATES_NAMES as state}
      <option value={state.value}>{state.label}</option>
    {/each}
  </select>
</label>

<label for="data-zipcode" class="required">
  5 Digit Zipcode
  <input id="data-zipcode" name="data-zipcode" pattern={"[0-9]{5}"} required />
</label>

<label for="data-phonenumber" class="required">
  Phone Number <span>( formatted like 555-555-5555 )</span>

  <input
    id="data-phonenumber"
    name="data-phonenumber"
    type="tel"
    pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
    required
  />
</label>

<label for="data-email" class="required">
  Email Address
  <input id="data-email" name="data-email" type="email" required />
</label>

<label for="data-organization" class="required">
  Organization
  <input id="data-organization" name="data-organization" required />
</label>

<label for="data-industry" class="required">
  Industry
  <select id="data-state" name="data-industry" required>
    {#each INDUSTRIES_OPTIONS as industry}
      <option value={industry}>{industry}</option>
    {/each}
  </select>
</label>

<label for="data-notes">
  General notes or comments about this order
  <textarea id="data-notes" name="data-notes" />
</label>

<style lang="scss">
</style>
