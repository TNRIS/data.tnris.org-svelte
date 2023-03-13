<style>
    .success, .failure, .standard {
        font-weight: bold;
        font-size: 18px;
    }
    .success {
        color: green;
    }
    .failure {
        color: red;
    }
</style>

<script>
    let status_msg = "";
    document.body.onload = function() {
        const urlParams = new URLSearchParams(window.location.search);
        
        if(urlParams.has('status')) {
            status_msg = urlParams.get("status")
        }

        setTimeout(function() {
            window.location.replace("https://www.data.tnris.org");
        }, 5000)
    }


</script>

{#if status_msg == "success"}
    <p class="success">
        Payment is a Success! You are now being redirected.
    </p>
{:else if status_msg == "failure"}
    <p class="failure">
        Payment has failed. You are now being redirected.
    </p>
{:else if status_msg == "duplicate"}
<p class="failure">
    Your order is a duplicate. You are now being redirected.
</p>
{:else if status_msg == "cancel"}
    <p class="standard">
        Your order has been canceled. You are now being redirected.
    </p>
{:else}
    <p class="standard">
        You are now being redirected.
    </p>
{/if}

