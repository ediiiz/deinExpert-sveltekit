<script lang="ts">
  import type { PageData } from './$types'

  // data returned from +page.server.js
  export let data: PageData
</script>

<div>
  <main>
    <figure>
      <table>
        <thead>
          <tr>
            <th>Produkt Name</th>
            <th>Preis</th>
          </tr>
        </thead>
        <tbody>
          {#each data.product as product}
            <tr>
              <td><a href="/product/{product.webcode}">
                {product.product_name}
              </a></td>
              {#each product.priceHistory as priceHistory}
                <td>{priceHistory.price[0].price}€</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </figure>
  </main>
</div>


<style>
  thead > tr > th {
    text-align: justify;
  }
  tbody > tr > td {
    text-align: justify;
  }
</style>

