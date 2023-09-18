import { generateCookieObject, parseAllCookies } from './helper.js';

interface HeadersObject {
  'x-cors-headers': string;
  'X-Requested-With': string;
  [key: string]: string;
}

interface RedirectLinkResult {
  redirect: string;
  xCorsHeaders2: any;
}

type RedirectResult = string | RedirectLinkResult;

async function fetchCashback(): Promise<string | void> {
  try {
    const corsProxy = 'https://cashback.dztf.workers.dev/?';
    const topcashbackShare = 'https://www.topcashback.de/share/ED1Zx/expert-de';
    const xCorsHeaders = {
      Host: 'www.topcashback.de',
      Origin: 'https://www.topcashback.de',
      Referer: topcashbackShare,
      'Access-Control-Allow-Origin': '*',
    };
    const myHeaders: HeadersObject = {
      'X-Requested-With': 'XMLHttpRequest',
      'x-cors-headers': JSON.stringify(xCorsHeaders),
    };

    const requestOptions: RequestInit = {
      headers: myHeaders,
      redirect: 'follow',
      method: 'POST',
    };

    async function getEarnCashbackLink(): Promise<{ earnCashback: string; xCorsHeaders1: any }> {
      const response = await fetch(`${corsProxy}${topcashbackShare}`, requestOptions);
      const headers = JSON.parse(response.headers.get('cors-received-headers')!);
      const data = await response.text();
      const tcShareCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
      const xCorsHeaders1 = await generateCookieObject({ CookieObjects: tcShareCookies, headers: xCorsHeaders });
      const document = new DOMParser().parseFromString(data, 'text/html');
      const earnCashbackElement = document.querySelector<HTMLAnchorElement>(
        'html body div.gecko-main.gecko-text-center div.gecko-single-container div.gecko-m15em div.cont-to-merch-wrapper a.gecko-btn-cont.gecko-btn-cont-primary'
      );
      const earnCashback = earnCashbackElement!.href.replace(
        `${window.location.protocol}//${window.location.host}`,
        'https://www.topcashback.de'
      );
      return { earnCashback, xCorsHeaders1 };
    }

    async function getRedirectLink(xCorsHeaders1: any, earnCashback: string): Promise<RedirectResult> {
      myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders1);
      const response = await fetch(`${corsProxy}${earnCashback}`, requestOptions);
      const headers = JSON.parse(response.headers.get('cors-received-headers')!);
      const redirect = `https://www.topcashback.de${response.headers.get('location')}`;
      if (redirect.includes('mobile')) {
        const mobileResult = await getRedirectLink(xCorsHeaders1, redirect);
        if (typeof mobileResult === 'string') {
          return mobileResult;
        }
        return mobileResult;
      }
      const earnCashbackCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
      const xCorsHeaders2 = await generateCookieObject({ CookieObjects: earnCashbackCookies, headers: xCorsHeaders });
      return { redirect, xCorsHeaders2 };
    }

    async function getAwinLink(redirectInfo: RedirectResult): Promise<string> {
      let redirect: string;
      let xCorsHeaders2: any;

      if (typeof redirectInfo === 'string') {
        redirect = redirectInfo;
      } else {
        redirect = redirectInfo.redirect;
        xCorsHeaders2 = redirectInfo.xCorsHeaders2;
      }

      myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders2);
      const response = await fetch(`${corsProxy}${redirect}`, requestOptions);
      const data = await response.text();
      const document = new DOMParser().parseFromString(data, 'text/html');
      const awinElement = document.querySelector<HTMLAnchorElement>(
        'html body form#form1 div#pnlContainer.container div div#pnlMainContent div#show-redirect.continue div a#hypRedirectMerchant'
      );
      return awinElement!.href;
    }

    const { earnCashback, xCorsHeaders1 } = await getEarnCashbackLink();
    const redirectResult = await getRedirectLink(xCorsHeaders1, earnCashback);
    return await getAwinLink(redirectResult);
  } catch (error) {
    console.log(error);
  }
}

export { fetchCashback };
