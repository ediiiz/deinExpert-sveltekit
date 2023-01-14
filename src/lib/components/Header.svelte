<script lang="ts">
	import { page } from '$app/stores';
  import MediaQuery from 'svelte-media-queries'
</script>


<main>
  <nav class="container-fluid">
    <ul>
      <li><strong><a href="/" class="contrast">Preis-Detektiv</a></strong></li>
    </ul>
    <ul>
      <li><a href="/help" role="button">FAQ</a></li>
    </ul>
  </nav>  
</main>


<style>
  ul > li > a {
    font-size: medium;
    color: var(--contrast);
  }
  nav {
    border-bottom: 1px solid var(--contrast);	
  }
  main {
    margin-bottom: 15px;
  }
</style>
