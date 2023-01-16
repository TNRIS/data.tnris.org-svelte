<script lang="ts">
  import type { SvelteComponentTyped } from "svelte";
  import ProgressBar from "../ProgressBar.svelte";

  interface WizardSlide {
    component: new (...args: any) => SvelteComponentTyped<{}>;
    title: string;
  }
  let wizForm;
  export let onSubmit = (e) => console.log(e);
  export let steps: WizardSlide[] | [] = [];
  export let stepIdx = 0;

</script>

<div class="wizard-container">
  <form
    class="wizard"
    on:submit|preventDefault|stopPropagation={onSubmit}
    bind:this={wizForm}
  >
    {#if steps.length > 0}
      <ProgressBar percent={Math.floor(stepIdx / steps.length) * 100} />
      {#each steps as step, idx}
        <div class={`wiz-step wiz-idx-${idx}`} class:show={idx === stepIdx}>
          <h2>{step.title}</h2>
          <svelte:component this={step.component} />
        </div>
      {/each}
      <div class="wiz-nav-buttons">
        {#if stepIdx > 0}
          <button on:click={() => (stepIdx = stepIdx - 1)}>
            {steps[stepIdx - 1].title}
          </button>
        {/if}

        {#if stepIdx < steps.length - 1}
          <button on:click={() => (stepIdx = stepIdx + 1)}>
            {steps[stepIdx + 1].title}
          </button>
        {/if}
      </div>
    {:else}
      <div>Empty Wizard</div>
    {/if}
  </form>
</div>

<style lang="scss">
  .wizard-container {
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;

    .wizard {
      width: 98%;
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
</style>
