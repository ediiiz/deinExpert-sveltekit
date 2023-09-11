<script lang="ts">
  import { goto } from '$app/navigation';
  import 'iconify-icon';
  let searchTerm = '';
  const handleSearch = () => {
    goto(`/search?p=${searchTerm}`);
  };
  import { Input } from "$lib/components/ui/input";
</script>

<form on:submit|preventDefault={handleSearch} class="">
  <div id="searchContainer" class="grid grid-cols-[auto_0px]">
    <Input
      bind:value={searchTerm}
      type="text"
      id="search"
      name="search"
      placeholder="Suche..."
    />
    <label class="relative top-3 right-6" for="search"><iconify-icon icon="ph:magnifying-glass" /></label>
  </div>
</form>
