<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { PageData } from './$types';
  import Time from 'svelte-time';
  import { Chart } from 'chart.js/auto';
  import { onMount } from 'svelte';
  export let data: PageData;
  export let params = {
    url: 'https://www.expert.de',
  };

  const labelsDate = data.product.priceHistory.map((item) => {
    let date = new Date(item.date);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let formattedDate = `${day}.${month}`;
    return formattedDate;
  });

  const labelsPrice = data.product.priceHistory.map((item) => {
    return item.price.sort((a, b) => a.price - b.price)[0].price;
  });

  let lineData = {
    labels: labelsDate.reverse(),
    datasets: [
      {
        label: 'Preisverlauf',
        backgroundColor: 'rgba(30, 136, 229,0.3)',
        borderColor: 'rgba(30, 136, 229,1)',
        borderWidth: 4,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: labelsPrice.reverse(),
        fill: true,
        tension: 0.4,
      },
    ],
  };

  onMount(async () => {
    const ctx = document.getElementById('myChart')! as HTMLCanvasElement;
    const canvas = ctx.getContext('2d')!;
    if (!canvas) return null;
    let myChart = new Chart(canvas, {
      type: 'line',
      data: lineData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
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
    <div id="chartPanel">
      <canvas id="myChart" />
    </div>
    <div id="wrapper">
      <div id="pricePanel">
        <div id="price">
          {#each data.product?.priceHistory[0].price.sort((a, b) => a.price - b.price) as price}
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
  #chartPanel > * {
    padding-top: 30px;
    height: 15rem;
    width: 30rem;
  }
  article > a {
    display: flex;
    justify-content: space-evenly;
  }
  hgroup {
    padding-bottom: 20px;
    display: grid;
    place-items: center;
    justify-content: center;
  }
  #imagePanel {
    padding: 1rem 0;
    display: grid;
    place-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 50px 1px rgba(0, 0, 0, 0.15);
  }
</style>
