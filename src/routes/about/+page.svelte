<script>
  import { fly } from 'svelte/transition';
</script>

<div
  in:fly={{ x: -100, duration: 250, delay: 300 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <div id="title">
    <h1>About</h1>
  </div>
  <div id="content">
    <p>
      "Preis Detektiv" ist Ihr zuverlässiger Partner für den Vergleich von
      Preisen und Produkten. Wir scannen täglich und präsentieren Ihnen die
      besten Angebote. Unser Ziel ist es, Ihnen die bestmögliche Auswahl zu
      bieten und Ihnen dabei zu helfen, das beste Angebot für Ihre Bedürfnisse
      zu finden. Wir sind ständig auf der Suche nach neuen Möglichkeiten, um
      Ihnen noch mehr Auswahl und Transparenz zu bieten. Dank unseres erfahrenen
      Teams und unserer fortschrittlichen Technologie sind wir in der Lage,
      Ihnen schnell und zuverlässig die besten Angebote zu präsentieren.
      Verlassen Sie sich auf "Preis Detektiv" und sparen Sie Zeit und Geld bei
      Ihren Einkäufen.
    </p>
  </div>
</div>

<style>
  #title {
    display: flex;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
  }
  #content {
    margin: 0 15px 0 15px;
    display: grid;
    grid-template-columns: 90%;
    align-items: center;
    justify-content: center;
  }
</style>
