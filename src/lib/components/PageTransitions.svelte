<script>
  import { fly } from 'svelte/transition';
</script>

<div
  in:fly={{ x: -100, duration: 250, delay: 300 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <slot />
</div>
