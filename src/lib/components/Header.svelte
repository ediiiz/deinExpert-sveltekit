<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion';
  import { Button } from '$lib/components/ui/button';
  import type { Session } from 'lucia';

  export let session: Session | null;

  function logout() {
    const form = document.getElementById('logout') as HTMLFormElement;
    if (form) {
      form.submit();
    }
  }
</script>

<main>
  <nav class="my-4 grid grid-cols-1">
    <ul>
      <li>
        <strong id="brand"><a href="/" class="text-3xl">deinExpert</a></strong>
      </li>
    </ul>
    <ul class="grid">
      <Accordion.Root class="w-full text-xl">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Menu</Accordion.Trigger>
          <Accordion.Content>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {#if session?.state === 'active'}
                <form id="logout" style="display: none;" method="post" action="/user?/logout">
                  <input type="submit" value="Sign out" />
                </form>
                <Button on:click={logout}>Sign Out</Button>
                <Button href="/user" role="button">Account</Button>
              {:else}
                <Button href="/login" role="button">Sign In</Button>
              {/if}
              <Button href="/datenschutz" role="button">Datenschutz</Button>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </ul>
  </nav>
</main>
