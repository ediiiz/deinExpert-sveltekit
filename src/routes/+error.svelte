<script context="module" lang="ts">
  import { page } from '$app/stores';
  import AppDownload from '$lib/components/AppDownload.svelte';
</script>

<main>
  <div class="container-fluid error">
    <hgroup>
      <h1>{@html $page.error?.message}</h1>
      <h2>{$page.status}</h2>
    </hgroup>

    <div />
  </div>
  <AppDownload />
</main>
