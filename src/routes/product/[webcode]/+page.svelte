<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import type { PageData } from './$types';
  import Time from 'svelte-time';
  import { fetchCashback } from './affiliate';
  //import { Chart } from 'chart.js/auto';
  import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
  } from 'chart.js';
  import { onMount } from 'svelte';
  export let data: PageData;

  Chart.register(
    LineController,
    PointElement,
    CategoryScale,
    LinearScale,
    LineElement,
    Filler,
    Tooltip
  );

  let affiliate: string;
  function createAffiliate64(affiliate: string): string {
    const affiliate64 = {
      branchId: priceDetails.lowestPrice.branchId,
      affiliate,
    };
    const affiliate64String = btoa(JSON.stringify(affiliate64));
    return affiliate64String;
  }

  const labelsDate = data.product?.priceHistory.map((item) => {
    let date = new Date(item.date);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let formattedDate = `${day}.${month}`;
    return formattedDate;
  });

  const labelsPrice = data.product?.priceHistory.map((item) => {
    return item.price.sort((a, b) => a.price - b.price)[0].price;
  });

  let lineData = {
    labels: labelsDate?.reverse(),
    datasets: [
      {
        label: 'Preisverlauf',
        backgroundColor: 'rgba(30, 136, 229,0.3)',
        borderColor: 'rgba(30, 136, 229,1)',
        borderWidth: 4,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: labelsPrice?.reverse(),
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
    affiliate = createAffiliate64(await fetchCashback());
  });

  const sortedPrices = data.product.priceHistory[0].price.sort(
    (a, b) => a.price - b.price
  );
  const [lowestPrice, highestPrice] = [
    sortedPrices[0],
    sortedPrices[sortedPrices.length - 1],
  ];

  const calculateSavings = (highest: number, lowest: number) =>
    Math.round(((highest - lowest) / highest) * 100);

  const savingsInPercent = calculateSavings(
    highestPrice.price,
    lowestPrice.price
  );

  const priceDetails = {
    lowestPrice: {
      price: lowestPrice.price,
      branchName: lowestPrice.branchName,
      branchId: lowestPrice.branchId,
    },
    highestPrice: {
      price: highestPrice.price,
      branchName: highestPrice.branchName,
      branchId: highestPrice.branchId,
    },
    savingsInPercent,
  };
</script>

<main
  in:fly={{ x: -100, duration: 250, delay: 300 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <div id="body" class="container-fluid">
    <div
      id="infoPanel"
      in:fade={{
        duration: 1000,
        delay: 300,
        easing: backOut,
      }}
    >
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
    <div id="detailPanel">
      <div
        id="imagePanel"
        in:fly={{
          y: 100,
          duration: 1000,
          delay: 500,
          easing: backOut,
        }}
      >
        <img src={data.product?.image} alt={data.product?.productName} />
      </div>
      <div
        id="chartPanel"
        in:fly={{
          y: 100,
          duration: 1000,
          delay: 500,
          easing: backOut,
        }}
      >
        <canvas id="myChart" />
      </div>
    </div>
    <div
      id="wrapper"
      in:fly={{
        y: 100,
        duration: 1000,
        delay: 500,
        easing: backOut,
      }}
    >
      <div id="pricePanel">
        <div>
          <article>
            <a href={`?data=${affiliate}`} target="_blank" role="button">
              Ab {priceDetails.lowestPrice.price}€</a
            >
          </article>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  #detailPanel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

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
