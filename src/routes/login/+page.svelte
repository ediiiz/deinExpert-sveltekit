<script>
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import githubIcon from '@iconify/icons-mdi/github';
</script>

<div class="grid place-content-center">
  <h1>Sign in</h1>
  <button on:click={() => goto('/login/github')}><Icon icon={githubIcon} />Sign in with Github</button>
</div>
