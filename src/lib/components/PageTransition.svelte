<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  export let pathname: string = '';
</script>

{#key pathname}
  <div in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
    <slot />
  </div>
{/key}
