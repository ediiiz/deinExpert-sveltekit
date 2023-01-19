<script lang="ts">
  import { goto } from '$app/navigation';
  import 'iconify-icon';
  let searchTerm = '';
  const handleSearch = () => {
    goto(`/search?p=${searchTerm}`);
  };
</script>

<form on:submit|preventDefault={handleSearch}>
  <div id="searchContainer">
    <input
      bind:value={searchTerm}
      type="text"
      id="search"
      name="search"
      placeholder="Suche..."
    />
    <label for="search"><iconify-icon icon="ph:magnifying-glass" /></label>
  </div>
</form>

<style>
  #searchContainer {
    display: grid;
    grid-template-columns: 1fr 0px;
  }
  #searchContainer > label {
    font-size: xx-large;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 7px;
    right: 30px;
  }
</style>
