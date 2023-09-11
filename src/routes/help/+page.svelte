<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<main
  class="container-fluid"
  in:fly|global={{ x: -100, duration: 250, delay: 300 }}
  out:fly|global={{ x: -100, duration: 250 }}
>
  <details>
    <summary>Wieso sind die Daten nicht aktuell?</summary>
    <article>
      <p>
        Leider ist es nicht zuverlaessig moeglich, alleine nach Preisen zu
        scannen und die Daten aktuell zu halten. Deshalb ist die Community
        gefragt um zusammen die besten Preise zu finden.
      </p>
    </article>
  </details>
  <details>
    <summary>Woher bekomme ich das Addon um nach Preisen zu suchen?</summary>
    <article>
      <a
        href="https://addons.mozilla.org/en-US/firefox/addon/preisdetektiv/"
        class="button">🔗 Firefox Add-on 🔗</a
      >
    </article>
  </details>
  <details>
    <summary>Wieso nur Firefox?😔</summary>
    <article>
      <p>
        Leider laesst die Chromium Engine (Chrome, Edge, Brave) nicht so viele
        Anfragen auf einmal zu und blockiert diese, weshalb bis jetzt nur
        Firefox funktioniert.
      </p>
    </article>
  </details>
</main>

