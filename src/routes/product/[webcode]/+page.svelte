<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import type { PageData } from './$types';
  import Time from 'svelte-time';
  import { fetchCashback } from './affiliate';
  import { getLinkomatAwin } from './linkomat';
  import Modal from '$lib/components/Modal.svelte';
  import { Button } from "$lib/components/ui/button";
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

  //affiliate = createAffiliate64(await fetchCashback());

  let showModal = false;

  Chart.register(LineController, PointElement, CategoryScale, LinearScale, LineElement, Filler, Tooltip);

  let affiliate: string;

  function createAffiliate(awinlink: string | void): void {
    if (!awinlink) {
      throw new Error('Awinlink is void');
    } else {
      affiliate =
        `${awinlink}&p=` +
        encodeURIComponent(`${data.product.productUrl}?branch_id=${priceDetails.lowestPrice.branchId}`);
    }
  }

  onMount(async () => {
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

  const sortedPrices = data.product.priceHistory[0].price.sort((a, b) => a.price - b.price);
  const [lowestPrice, highestPrice] = [sortedPrices[0], sortedPrices[sortedPrices.length - 1]];

  const calculateSavings = (highest: number, lowest: number) => Math.round(((highest - lowest) / highest) * 100);

  const savingsInPercent = calculateSavings(highestPrice.price, lowestPrice.price);

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

<main in:fly|global={{ x: -100, duration: 250, delay: 300 }} out:fly|global={{ x: -100, duration: 250 }}>
  <div id="body" class="container-fluid">
    <div
      id="infoPanel"
      in:fade|global={{
        duration: 1000,
        delay: 300,
        easing: backOut,
      }}
    >
      <hgroup>
        <h1>{data.product?.productName}</h1>
        <h2>
          Updated: <Time relative timestamp={data.product?.priceHistory[0].date} />
        </h2>
      </hgroup>
    </div>
    <div id="detailPanel">
      <div
        id="imagePanel"
        in:fly|global={{
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
        in:fly|global={{
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
      in:fly|global={{
        y: 100,
        duration: 1000,
        delay: 500,
        easing: backOut,
      }}
    >
      <div id="pricePanel">
        <div>
          <article>
            <Button on:click={() => (showModal = true)}>Ab {priceDetails.lowestPrice.price}€ </Button>
          </article>
        </div>
      </div>
    </div>
  </div>
  <Modal bind:showModal>
    <h2 slot="header">Noch eine Sache...</h2>
    <div>Beachte dass du durch das Klicken auf einen Affiliate link weitergeleitet wirst.</div>
    <div>Wir erhalten dadurch eine kleine Provision, dies hat keinen Einfluss auf deinen Preis!</div>
    <p>Danke dass du uns unterstuetzt!❤️</p>

    {#if !affiliate}
      <Button style="display:none;" on:click={async () => createAffiliate(await fetchCashback())}
        >Link generieren</Button
      >
      <button on:click={async () => createAffiliate(await getLinkomatAwin())}>Link generieren</button>
    {:else}
      <a href={affiliate} target="_blank" role="button">Weiter zum Deal</a>
    {/if}
  </Modal>
</main>
