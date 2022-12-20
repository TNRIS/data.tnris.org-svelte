<script>
  export let loadingMessage = "Loading...";
</script>

<div class="loading-indicator">
  <div class="loading-indicator-container">
    <i class="material-icons loading-indicator-image" alt="loading indicator"
      >sync</i
    >
    <p class="loading-indicator-message">{loadingMessage}</p>
  </div>
</div>

<style lang="scss">
  .loading-indicator {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
    margin: auto;

    .loading-indicator-container {
      margin: auto;
      display: grid;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    .loading-indicator-message {
      margin: auto;
    }

    .loading-indicator-image {
      &.material-icons {
        font-size: 3rem !important;
        color: $primaryColor;
        margin: auto;
      }

      @-moz-keyframes spin {
        from {
          -moz-transform: rotate(0deg);
        }
        to {
          -moz-transform: rotate(360deg);
        }
      }
      @-webkit-keyframes spin {
        from {
          -webkit-transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      animation-name: spin;
      animation-duration: 4000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;

      -webkit-animation-name: spin;
      -webkit-animation-duration: 4000ms;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-timing-function: linear;

      -moz-animation-name: spin;
      -moz-animation-duration: 4000ms;
      -moz-animation-iteration-count: infinite;
      -moz-animation-timing-function: linear;

      -ms-animation-name: spin;
      -ms-animation-duration: 400ms;
      -ms-animation-iteration-count: infinite;
      -ms-animation-timing-function: linear;

      transition: rotate(360000deg);
      -o-transition: rotate(360000deg);
    }
  }
</style>
