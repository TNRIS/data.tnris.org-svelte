<script lang="ts">
  import { autoPlacement, computePosition, shift } from "@floating-ui/dom";
  import { clickOutside } from "./General/clickOutside";
  import GeneralContactForm from "./Forms/GeneralContactForm.svelte";
  import Modal from "./General/Modal.svelte";

  const routes = {
    Legal: {
      "Privacy/Security Policy":
        "https://geographic.texas.gov/site-policies#privacy-and-security-policy",
      Accessibility: "https://geographic.texas.gov/site-policies#accessibility-policy",
      "Open Records Request": "http://www.twdb.texas.gov/home/open_records.asp",
      "Compact with Texans": "http://www.twdb.texas.gov/home/compact_texan.asp",
      "Fraud & Waste": "http://www.twdb.texas.gov/home/fraud.asp",
      TRAIL: "https://www.tsl.texas.gov/trail/index.html",
      "Texas.gov": "http://www.texas.gov/",
      "Texas Water Development Board": "http://www.twdb.texas.gov/",
    },
    Copyright:
      "Content of this site © Texas Natural Resources Information System and Texas Water Development Board unless otherwise noted.",
    Programs: {
      "Applications & Utilities":
        "https://geographic.texas.gov/applications-and-utilities/",
      "Texas GIO": "https://geographic.texas.gov/geographic-information-office/",
      "Research & Distribution":
        "https://geographic.texas.gov/research-distribution-center",
      "StratMap Program": "https://geographic.texas.gov/stratmap/",
      "Education & Training": "https://geographic.texas.gov/education/",
      Events: "https://geographic.texas.gov/events/",
      "About Us": "https://geographic.texas.gov/about/",
    },
  };

  let legalButtonRef;
  let legalMenuRef;
  let programsButtonRef;
  let programsMenuRef;

  let contactModalOpen = false;

  const setPos = (btnRef, menuRef) =>
    computePosition(btnRef, menuRef, {
      middleware: [autoPlacement({ padding: 5 }), shift()],
    }).then(({ x, y }) => {
      Object.assign(menuRef.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  const show = (btnRef, menuRef) => {
    setPos(btnRef, menuRef);
    if (menuRef) menuRef.style.display = "grid";
  };
  const hide = (menuRef) => {
    if (menuRef) menuRef.style.display = "none";
  };
</script>

<div id="main-navbar-footer">
  <div id="main-navbar-container">
    <button
      class="navbar-item-footer"
      bind:this={legalButtonRef}
      on:click={() => show(legalButtonRef, legalMenuRef)}
      on:focus={() => show(legalButtonRef, legalMenuRef)}
      on:mouseover={() => show(legalButtonRef, legalMenuRef)}
    >
      Legal
    </button>
    <div
      class="navbar-item-menu-footer"
      bind:this={legalMenuRef}
      use:clickOutside
      on:click_outside={() => hide(legalMenuRef)}
      on:mouseleave={() => hide(legalMenuRef)}
    >
      {#each Object.keys(routes["Legal"]) as link}
        <p><a href={routes["Legal"][link]}>{link}</a></p>
      {/each}
    </div>

    <button
      class="navbar-item-footer"
      bind:this={programsButtonRef}
      on:click={() => show(programsButtonRef, programsMenuRef)}
      on:focus={() => show(programsButtonRef, programsMenuRef)}
      on:mouseover={() => show(programsButtonRef, programsMenuRef)}
    >
      Programs
    </button>
    <div
      class="navbar-item-menu-footer"
      bind:this={programsMenuRef}
      use:clickOutside
      on:click_outside={() => hide(programsMenuRef)}
      on:mouseleave={() => hide(programsMenuRef)}
    >
      {#each Object.keys(routes["Programs"]) as link}
        <p><a href={routes["Programs"][link]}>{link}</a></p>
      {/each}
    </div>
    <button
      class="navbar-item-footer"
      on:click={() => (contactModalOpen = !contactModalOpen)}>Contact Us</button
    >
    <Modal open={contactModalOpen}>
      <h1 slot="title">General Contact Form</h1>
      <div slot="content">
        <GeneralContactForm />
      </div>
    </Modal>
  </div>
</div>

<style lang="scss">
  #main-navbar-footer {
    padding: 1rem;
    background: #333;

    #main-navbar-container {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: auto;
      justify-content: space-evenly;
      gap: 1rem;
      margin: auto;
      max-width: 1600px;

      .navbar-item-footer {
        display: grid;
        align-items: center;
        justify-content: center;
        width: 100%;
        background: #333;
        color: #fff;
        border: none;
      }

      .navbar-item-menu-footer {
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;
        background: #222;
        border: solid 1px #555;
        padding: 0.5rem;
        z-index: 9999999;
        display: none;

        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }
</style>
