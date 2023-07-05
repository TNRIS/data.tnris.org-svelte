<script>
    let body = {}
    fetch("https://api.tnris.org/api/v1/tnris_org/metrics", {
        method: "POST",
        body: JSON.stringify({
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })  .then((response) => response.json())
  .then((json) => body = json.message);
</script>
    <div id="mbox">{@html body}</div>
<style>
    #mbox {
        position: fixed;
        width: 100%;
        height: auto;
        top: 51px;
        overflow: auto;
        bottom: 65px;
    }
    #mbox::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    #mbox {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>