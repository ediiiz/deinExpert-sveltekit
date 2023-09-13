<script lang="ts">
  import type { LayoutServerData } from './$types';
  import Header from '$lib/components/Header.svelte';
  import Search from '$lib/components/Search.svelte';
  import PageTransition from '$lib/components/PageTransition.svelte';
  import '$lib/styles/style.css';
  import '../app.postcss';
  export let data: LayoutServerData;
  let session = data.session;
</script>

<div class="container mx-auto h-full">
  <div class="">
    <Header {session} />
  </div>
  <div class="py-4">
    <Search />
  </div>
  <PageTransition pathname={data.pathname}>
    <slot />
  </PageTransition>
</div>
