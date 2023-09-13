<script lang="ts">
  export let showModal: boolean; // boolean

  let dialog: HTMLDialogElement; // HTMLDialogElement
  import Button from './ui/button/button.svelte';
  $: if (dialog && showModal) dialog.showModal();

  import Icon from '@iconify/svelte';
  import closeBold from '@iconify/icons-iconamoon/close-bold';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  class="px-2 rounded-lg"
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="rounded-lg" on:click|stopPropagation>
    <div class="flex flex-row place-content-evenly">
      <slot name="header" />
      <div class="flex place-content-end w-full">
        <Button autofocus on:click={() => dialog.close()}><Icon class="text-lg" icon={closeBold} /></Button>
      </div>
    </div>
    <slot />
    <hr />
    <!-- svelte-ignore a11y-autofocus -->
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 18, 33, 0.295);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
