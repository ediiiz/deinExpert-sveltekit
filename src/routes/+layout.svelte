<script lang="ts">
  import { fly } from 'svelte/transition';
  import Header from '$lib/components/Header.svelte';
  import Search from '$lib/components/Search.svelte';
  import '$lib/styles/style.css';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.postcss';
  import type { PageData } from './$types';
  export let data: PageData;
  let session = data.session;
</script>

<div class="container mx-auto h-full">
  <div class="">
    <Header {session} />
  </div>
  <div class="py-4">
    <Search />
  </div>
  <div class="slot">
    <slot />
  </div>
</div>
