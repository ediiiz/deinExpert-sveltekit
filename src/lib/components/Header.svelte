<script lang=ts>
import * as Accordion from "$lib/components/ui/accordion";
import { Button } from "$lib/components/ui/button";
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
            <div class="grid grid-cols-1 gap-2">
            <Button href="/login" role="button">Login</Button>
            <Button href="/help" role="button">FAQ</Button>
            <Button href="/about" role="button">Über Uns</Button>
          </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </ul>
  </nav>
</main>

