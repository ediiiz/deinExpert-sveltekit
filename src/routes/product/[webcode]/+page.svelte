<script lang="ts">
  import type { PageData } from './$types';
  import Time from 'svelte-time';
  import { fetchCashback } from './affiliate';
  import { getLinkomatAwin } from './linkomat';
  import Modal from '$lib/components/Modal.svelte';
  import { Button } from '$lib/components/ui/button';
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
  import { fade } from 'svelte/transition';
  import Product from '$lib/components/Product.svelte';
  export let data: PageData;

  //affiliate = createAffiliate64(await fetchCashback());

  let showModal = false;
  let selectedMarket = 0;

  function setMarketShowModal(market: number) {
    selectedMarket = market;
    showModal = true;
  }

  Chart.register(LineController, PointElement, CategoryScale, LinearScale, LineElement, Filler, Tooltip);

  let affiliate: string;

  function createAffiliate(awinlink: string | void): void {
    if (!awinlink) {
      throw new Error('Awinlink is void');
    } else {
      affiliate = `${awinlink}&p=` + encodeURIComponent(`${data.product.productUrl}?branch_id=${selectedMarket}`);
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

<main>
  <div id="body" class="container-fluid">
    <div class="pb-20 pt-5">
      <div class="bg-gray-100 p-4 rounded-md shadow-2xl" id="detailPanel">
        <div class="p-4">
          <hgroup class="flex flex-col">
            <h1 class="text-2xl text-center font-extrabold">{data.product?.productName}</h1>
            <h2 class="text-center">
              Updated: <Time relative timestamp={data.product?.priceHistory[0].date} />
            </h2>
          </hgroup>
        </div>
        <div class="flex flex-col justify-center items-center gap-2 sm:flex-row bg-white rounded-lg">
          <div
            class="text-center justify-center place-content-center object-cover flex items-center w-full p-4"
            id="imagePanel"
          >
            <img src={data.product?.image} alt={data.product?.productName} />
          </div>
          <div class="flex justify-center items-center w-full p-4 bg-white rounded-lg" id="chartPanel">
            <canvas id="myChart" />
          </div>
        </div>
      </div>
    </div>
    <div class="pb-24">
      <div class="bg-gray-100 rounded-md flex flex-col p-4 shadow-2xl gap-4 pb-4 justify-center items-center">
        {#each data.product?.priceHistory[0].price as price}
          <div class="flex flex-col bg-white rounded-md pb-4 px-4 w-full items-center justify-center">
            <div class="flex items-center justify-center align-middle text-center p-4 text-lg">
              {price.branchName}
            </div>
            <Button on:click={() => setMarketShowModal(price.branchId)} class="w-full text-xl p-8"
              ><div class="p-4">{price.price}€</div></Button
            >
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div in:fade={{ duration: 500 }}>
    <Modal bind:showModal>
      <h2 class=" p-4 text-2xl" slot="header">Noch eine Sache...</h2>
      <div class="p-4 text-lg">
        <p>Beachte dass du durch das Klicken auf einen Affiliate-Link weitergeleitet wirst.</p>
        <br />
        <p>Wir erhalten dadurch eine kleine Provision, dies hat keinen Einfluss auf deinen Preis!</p>
      </div>
      <div class="text-lg p-4">
        <p>Danke dass du uns unterstuetzt!❤️</p>
      </div>

      <div class="tw-container">
        {#if !affiliate}
          <div transition:fade={{ duration: 200 }} class="w-full">
            <Button style="display:none;" on:click={async () => createAffiliate(await fetchCashback())}
              >Link generieren</Button
            >
            <Button class="w-full text-xl" on:click={async () => createAffiliate(await getLinkomatAwin())}
              >Link generieren</Button
            >
          </div>
        {:else}
          <div transition:fade={{ duration: 200 }} class="w-full">
            <Button class="w-full text-xl"><a href={affiliate} target="_blank" role="button">Weiter zum Deal</a></Button
            >
          </div>
        {/if}
      </div>
    </Modal>
  </div>
</main>

<style>
  .tw-container {
    display: grid;
  }
  .tw-container > * {
    grid-area: 1 / 1;
  }
</style>
