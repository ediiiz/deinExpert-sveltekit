<script context="module" lang="ts">
  import { page } from '$app/stores';

</script>

<div class="container-fluid error">
  <hgroup>
    <h1>{$page.error?.message}</h1>
    <h2>{$page.status}</h2>
  </hgroup>
	
	<div>
	</div>
</div>

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
	img {
		position: relative;
		right: 20px;
		width: 200px;
		height: 100px;
	}
</style>
