<script lang="ts">
  import type { PageData } from './$types'
  import Time from "svelte-time";
  export let data: PageData
  export let params = {
    url: "https://www.expert.de"
  }
</script>

<div id="body" class="container-fluid">
  <div id="infoPanel">
    <hgroup>
      <h1>{data.product?.productName}</h1>
      <h2>Updated: <Time relative timestamp={data.product?.priceHistory[0].date} /></h2>
    </hgroup>
  </div>
  <div id="wrapper">
    <div id="pricePanel">
      <div id="price">
        {#each data.product?.priceHistory[0].price as price}
          <article>
            <header>{price.branchName}</header>
            <a href={params.url} role="button"> {price.price}€</a>
          </article>
        {/each}
      </div>
    </div>
  </div>
</div>


<style>
  article > a {
    display: flex;
    justify-content: space-evenly;

  }
  hgroup {
    display: grid;
    place-items: center;
    justify-content: center;
  }
</style>        


