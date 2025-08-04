<script>
  let body = {};
  import { BASE_URL } from "../../constants.js";

  fetch(`${BASE_URL}/api/v1/tnris_org/metrics`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    cache: "no-cache"
  })
    .then((response) => response.json())
    .then((json) => (body = json.message));
</script>

<div id="metrics-wrapper">
  <div id="metrics-container">
    {@html body}
  </div>
</div>

<style lang="scss">
  #metrics-wrapper {
    display: flex;
    gap: 1rem;
    padding: 1.5rem 0.5rem;
    width: 100%;
    height: 100%;
    max-width: 1600px;
    margin: auto;
    overflow: scroll;

    #metrics-container {
      height: 100%;
      padding: 0.5rem 1rem;
    }
  }
</style>
