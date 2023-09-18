<script>
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import githubIcon from '@iconify/icons-mdi/github';
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="pb-20 pt-5 sm:grid">
  <div class="bg-gray-100 rounded-lg shadow-2xl place-self-center sm:max-w-sm">
    <div class="py-4">
      <h1 class="text-center text-2xl font-bold pb-4">Sign In</h1>
      <div class="bg-white grid place-content-center py-4 rounded-lg mx-4">
        <Button class="p-6 sm:text-lg sm:mx-4" on:click={() => goto('/login/github')}
          ><Icon class="text-3xl relative right-2" icon={githubIcon} />Sign in with Github</Button
        >
      </div>
    </div>
  </div>
</div>
