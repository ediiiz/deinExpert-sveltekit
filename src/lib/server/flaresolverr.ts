import { PUBLIC_CLOUDFLARE_ACCESS_CLIENT_ID, PUBLIC_CLOUDFLARE_ACCESS_CLIENT_SECRET, PUBLIC_FLARESOLVERR_URL, PUBLIC_WTFPROXY_URL } from "$env/static/public";
import type { ProductData } from "$lib/types/ProductData";
import type { FlareSolverrResponseData } from "$lib/types/FlareSolverrResponseData";
import fetch from "node-fetch";
import { HttpsProxyAgent } from 'https-proxy-agent';
import { CurlImpersonate } from 'node-curl-impersonate'
import type { CurlImpersonateOptions } from "node-curl-impersonate/dist/interfaces";

const proxyArr = PUBLIC_WTFPROXY_URL.split(":")
const proxyObj = {
  username: proxyArr[0],
  password: proxyArr[1],
  host: proxyArr[2],
  port: proxyArr[3],
}
const proxyUrl = `http://${proxyObj.username}:${proxyObj.password}@${proxyObj.host}:${proxyObj.port}`

export class FlareSolverrAgent {
  products: ProductData[] = [];

  public async getClearenceCookie(url: string): Promise<FlareSolverrResponseData | undefined> {

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CF-Access-Client-Id": PUBLIC_CLOUDFLARE_ACCESS_CLIENT_ID,
        "CF-Access-Client-Secret": PUBLIC_CLOUDFLARE_ACCESS_CLIENT_SECRET,
      },
      body: JSON.stringify({
        returnOnlyCookies: true,
        //proxy: { url: `http://${proxyObj.host}:${proxyObj.port}`, username: proxyObj.username, password: proxyObj.password },
        cmd: "request.get",
        url: url,
        maxTimeout: 10000,
      }),
    }

    const response = await fetch(PUBLIC_FLARESOLVERR_URL, requestOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json() as FlareSolverrResponseData

    return json
  }

  public async getArticleId(productUrl: string, cfclearence?: string, userAgent?: string) {
    const proxyAgent = new HttpsProxyAgent(proxyUrl);

    const requestOptions: CurlImpersonateOptions = {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.43",
      }
    }

    const curlclient = new CurlImpersonate(productUrl, requestOptions);
    const response = await curlclient.makeRequest();
    //const response = await fetch(productUrl, requestOptions)
    return response
  }



  private async fetchProductInformation(storeId: string, storeName: string): Promise<ProductData | undefined> {
    try {
      // Construct the body for the fetch request
      const requestBody = JSON.stringify({
        articleId: "", //this.dataDesktop || this.dataMobile,
        store: storeId,
        cacheLevel: 'MOST_RECENT',
      });

      // Make the fetch request to the website
      const response = await fetch('https://www.expert.de/shop/api/neo/internal-pub-service/getArticleData', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: requestBody,
      });

      // Check if the response status indicates success
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the response as ProductData type
      const productData = await response.json() as ProductData;
      // Push to the products array and sort by price
      if (!productData.price?.gross || productData.onlineButtonAction !== 'ORDER') {
        return productData;
      }
      // replace the returned storeid with the passed storeid

      productData.showStoreName = storeName;
      productData.onlineStore = storeId;
      productData.priceInclShipping = productData.price.gross + productData.onlineShipment[0]?.price?.gross;
      if (!productData.priceInclShipping) return productData;

      this.products.push(productData);
      this.products.sort((a, b) => {
        if (a.priceInclShipping && b.priceInclShipping) {
          return a.priceInclShipping - b.priceInclShipping;
        }
        return 0;
      });

      return productData;
    } catch (error) {
      // Handle errors in fetching product information
      console.error(`Error fetching product information for storeId ${storeId}: `, error);
      return undefined;
    }
  }
}
