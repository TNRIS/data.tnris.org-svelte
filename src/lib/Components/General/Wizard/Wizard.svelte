<script lang="ts">
  import type { SvelteComponentTyped } from "svelte";
  import ProgressBar from "../ProgressBar.svelte";
  import InfoBox from "../InfoBox.svelte";

  export let onSubmit = (e) => {
    let fd = new FormData(e.target);
    /* console.log(Object.fromEntries(fd));
    console.log(e.target.checkValidity());
    console.log(e.target.reportValidity()); */
  };

  export let steps: WizardSlide[] | [] = [];
  export let stepIdx = 0;
  //optional validator
  export let val = null;

  interface WizardSlide {
    component: new (...args: any) => SvelteComponentTyped<{}>;
    title: string;
  }
  let wizForm = null;

  $: percent = Math.floor(((stepIdx + 1) / steps.length) * 100);

  // Optional error message to arbitrarily say something.
  export let error_message = "";

  // Store this variable outside of Interactions to conditionally render based on it.
  let allowNext = val ? val(): true;
</script>

<div class="wizard-container">
  <div class="wizard-header">
    <ProgressBar {percent} />
    {#if steps.length > 0}
      <div class="step-title-bar">
        <h2>{steps[stepIdx].title}</h2>
        <strong>( Step {stepIdx + 1} / {steps.length} )</strong>
      </div>
    {/if}
  </div>
  <div class="wizard-content">
    {#if error_message}
      <InfoBox>{error_message}</InfoBox>
    {/if}

    <form
      class="wizard-form"
      bind:this={wizForm}
      on:submit|preventDefault={onSubmit}
      on:change={(e) => {
        let d = e.currentTarget;
        wizForm = d;
      }}
    >
      {#if steps.length > 0}
        {#each steps as step, idx}
          <div class={`wiz-step wiz-idx-${idx}`} class:show={idx === stepIdx}>
            <svelte:component this={step.component} formRef={wizForm} />
          </div>
        {/each}
      {:else}
        <div>Empty Wizard</div>
      {/if}
    </form>
  </div>
  <div class="wizard-footer">
    {#if steps.length > 0}
    <div class="wiz-nav-buttons">
      {#if stepIdx > 0}
          <button on:click={() => (stepIdx = stepIdx - 1)}>
            <span>« </span>{steps[stepIdx - 1].title}
          </button>
        {/if}

        {#if stepIdx < steps.length - 1}
          
          <button id="bid" disabled={!allowNext}

          on:click={() => {
            const elsToValidate = wizForm
                .getElementsByClassName(`wiz-idx-${stepIdx}`)[0]
                .querySelectorAll("input, textarea, select, radio");
              
              allowNext = val ? val(): true;

              elsToValidate.forEach((el) => {
                let valid = el.reportValidity();

                if (!valid) {
                  allowNext = false;
                }
              });

              if (allowNext) {
                return (stepIdx = stepIdx + 1);
              }
            }}
          >
            {steps[stepIdx + 1].title} <span> »</span>
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .step-title-bar {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-items: center;
  }
  .wizard-container {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto 1fr;
    justify-content: stretch;

    .wizard-header {
      padding: 0.5rem;
      border-bottom: solid 1px #ccc;
      box-shadow: $boxShadow-xs;
    }
    .wizard-content {
      padding: 1rem 0.5rem;
      overflow-y: scroll;

      .wizard-form {
        max-width: 100%;
        position: relative;
        display: grid;
        grid-auto-rows: auto;
        align-content: start;
        gap: 0.5rem;

        .wiz-step {
          display: none;
          &.show {
            display: block;
          }
        }
      }
    }
    .wizard-footer {
      padding: 0.5rem;
      border-top: solid 1px #ccc;
    }
  }
</style>
