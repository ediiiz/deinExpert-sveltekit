<script context="module" lang="ts">
  import { page } from '$app/stores';

</script>

<div class="container-fluid error">
  <hgroup>
    <h1>{$page.error?.message}</h1>
    <h2>{$page.status}😔</h2>
  </hgroup>
</div>

<style>
	.error {
		height: 80vh;
		display: grid;
		gap: var(--spacing-32);
		place-content: center;
		place-items: center;
	}
</style>
