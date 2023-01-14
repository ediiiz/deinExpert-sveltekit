<script lang="ts">
  import type { PageData } from './$types'
  import Time from "svelte-time";

  // data returned from +page.server.js
  export let data: PageData
</script>

<div id="body" class="container-fluid">
  <div id="infoPanel">
    <hgroup>
      <h1>{data.product?.product_name}</h1>
      <h2>Updated: <Time relative timestamp={data.product?.priceHistory[0].date} /></h2>
    </hgroup>
  </div>
  <div id="wrapper">
    <div id="pricePanel">
      <div id="price">
        {#each data.product?.priceHistory[0].price as price}
          <article>
            <header>{price.branchName}</header>
            <a href="https://www.expert.de" role="button"> {price.price}€</a>
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
</style>        


