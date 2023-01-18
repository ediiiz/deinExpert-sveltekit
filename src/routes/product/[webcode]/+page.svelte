<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { PageData } from './$types';
  import Time from 'svelte-time';
  export let data: PageData;
  export let params = {
    url: 'https://www.expert.de',
  };
</script>

<main
  in:fly={{ x: -100, duration: 250, delay: 300 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <div id="body" class="container-fluid">
    <div id="infoPanel">
      <hgroup>
        <h1>{data.product?.productName}</h1>
        <h2>
          Updated: <Time
            relative
            timestamp={data.product?.priceHistory[0].date}
          />
        </h2>
      </hgroup>
    </div>
    <div id="imagePanel">
      <img src={data.product?.image} alt={data.product?.productName} />
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
</main>

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
  #imagePanel {
    display: grid;
    place-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 50px 1px rgba(0, 0, 0, 0.15);
  }
</style>
