<script context="module" lang="ts">
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
</script>

<main
  in:fly={{ x: -100, duration: 250, delay: 300 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <div class="container-fluid error">
    <hgroup>
      <h1>{$page.error?.message}</h1>
      <h2>{$page.status}</h2>
    </hgroup>

    <div />
  </div>
</main>

<style>
  .error {
    height: 80vh;
    display: grid;
    gap: var(--spacing-32);
    place-content: center;
    place-items: center;
  }

  .error > div {
    display: flex;
    place-content: center;
    place-items: center;
  }
</style>
