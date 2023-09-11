import { generateCookieObject, parseAllCookies } from './helper';

async function fetchCashback() {
  try {
    const corsProxy = 'https://cashback.dztf.workers.dev/?';
    const topcashbackShare = 'https://www.topcashback.de/share/ED1Zx/expert-de';
    const xCorsHeaders = {
      Host: 'www.topcashback.de',
      Origin: 'https://www.topcashback.de',
      Referer: topcashbackShare,
      'Access-Control-Allow-Origin': '*',
    };
    const myHeaders = {
      'X-Requested-With': 'XMLHttpRequest',
      'x-cors-headers': JSON.stringify(xCorsHeaders),
    };

    let requestOptions: RequestInit = {
      headers: myHeaders,
      redirect: 'follow',
      method: 'post',
    };

    async function getEarnCashbackLink(): Promise<{
      earnCashbackHref: string;
      xCorsHeaders1: object;
    }> {
      const response = await fetch(`${corsProxy}${topcashbackShare}`, requestOptions);
      const headers = JSON.parse(response.headers.get('cors-received-headers') as string);
      const data = await response.text();
      const tcShareCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
      const xCorsHeaders1 = await generateCookieObject({
        CookieObjects: tcShareCookies,
        headers: xCorsHeaders,
      });
      const document = new DOMParser().parseFromString(data, 'text/html');
      const earnCashback = document.querySelector(
        'html body div.gecko-main.gecko-text-center div.gecko-single-container div.gecko-m15em div.cont-to-merch-wrapper a.gecko-btn-cont.gecko-btn-cont-primary'
      ) as HTMLAnchorElement;
      const earnCashbackHref = earnCashback.href
        .toString()
        .replace(`${window.location.protocol}//${window.location.host}`, 'https://www.topcashback.de');
      return { earnCashbackHref, xCorsHeaders1 };
    }

    async function getRedirectLink(
      xCorsHeaders1: object,
      earnCashbackHref: string
    ): Promise<{ redirect: string; xCorsHeaders2: object }> {
      myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders1);
      const response = await fetch(`${corsProxy}${earnCashbackHref}`, requestOptions);
      const headers = JSON.parse(response.headers.get('cors-received-headers') as string);
      const redirect = `https://www.topcashback.de${response.headers.get('location')}`;
      const mobileRedirect = redirect;
      if (redirect.includes('mobile')) {
        const { redirect, xCorsHeaders2 } = await getRedirectLink(xCorsHeaders1, mobileRedirect);
        return { redirect, xCorsHeaders2 };
      }
      const earnCashbackCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
      const xCorsHeaders2 = await generateCookieObject({
        CookieObjects: earnCashbackCookies,
        headers: xCorsHeaders,
      });
      return { redirect, xCorsHeaders2 };
    }

    async function getAwinLink(redirect: string, xCorsHeaders2: object) {
      if (redirect) {
        myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders2);
        const response = await fetch(`${corsProxy}${redirect}`, requestOptions);
        const data = await response.text();
        const document = new DOMParser().parseFromString(data, 'text/html');
        const awin = document.querySelector(
          'html body form#form1 div#pnlContainer.container div div#pnlMainContent div#show-redirect.continue div a#hypRedirectMerchant'
        ) as HTMLAnchorElement;
        const awinHref = awin.href.toString();
        return awinHref;
      }
    }

    const { earnCashbackHref, xCorsHeaders1 } = await getEarnCashbackLink();
    const { redirect, xCorsHeaders2 } = await getRedirectLink(xCorsHeaders1, earnCashbackHref);
    const awin = await getAwinLink(redirect, xCorsHeaders2);

    return awin;
  } catch (error) {
    console.log(error);
  }
}

export { fetchCashback };
