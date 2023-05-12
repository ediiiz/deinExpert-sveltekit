
// @ts-ignore
import { generateCookieObject, parseAllCookies } from './helper';

async function fetchCashback() {
  try {
    const corsProxy = 'https://cashback.dztf.workers.dev/?'
    const topcashbackShare = 'https://www.topcashback.de/share/ED1Zx/expert-de'
    const xCorsHeaders = {
      'Host': 'www.topcashback.de',
      'Origin': 'https://www.topcashback.de',
      'Referer': topcashbackShare,
      'Access-Control-Allow-Origin': '*',
    }
    const myHeaders = {
      'X-Requested-With': 'XMLHttpRequest',
      'x-cors-headers': JSON.stringify(xCorsHeaders),
    };

    let requestOptions = {
      headers: myHeaders,
      redirect: 'follow',
      method: 'post',
    };


    async function getEarnCashbackLink() {
      // @ts-ignore
      const response = await fetch(`${corsProxy}${topcashbackShare}`, requestOptions);
      // @ts-ignore
      const headers = JSON.parse(response.headers.get('cors-received-headers'))
      const data = await response.text();
      const tcShareCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
      const xCorsHeaders1 = await generateCookieObject({ CookieObjects: tcShareCookies, headers: xCorsHeaders });
      const document = new DOMParser().parseFromString(data, 'text/html');
      // @ts-ignore
      const earnCashback = document.querySelector('html body div.gecko-main.gecko-text-center div.gecko-single-container div.gecko-m15em div.cont-to-merch-wrapper a.gecko-btn-cont.gecko-btn-cont-primary').href.toString().replace(`${window.location.protocol}//${window.location.host}`, 'https://www.topcashback.de');
      return { earnCashback, xCorsHeaders1 };
    }

    // @ts-ignore
    async function getRedirectLink(xCorsHeaders1, earnCashback) {
      myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders1);
      // @ts-ignore
      const response = await fetch(`${corsProxy}${earnCashback}`, requestOptions);
      // @ts-ignore
      const headers = JSON.parse(response.headers.get('cors-received-headers'))
      // @ts-ignore
      const data = await response.text();
      const redirect = `https://www.topcashback.de${response.headers.get('location')}`
      const mobileRedirect = redirect;
      if (redirect.includes('mobile')) {
        // @ts-ignore
        const { redirect, xCorsHeaders2 } = await getRedirectLink(xCorsHeaders1, mobileRedirect);
        return { redirect, xCorsHeaders2 };
      }
      const earnCashbackCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
      const xCorsHeaders2 = await generateCookieObject({ CookieObjects: earnCashbackCookies, headers: xCorsHeaders });
      return { redirect, xCorsHeaders2 };
    }

    // @ts-ignore
    async function getAwinLink(redirect, xCorsHeaders2) {
      const mobileRedirect = redirect;
      // if redirect contains the string "mobile" then redirect to the mobile site
      if (redirect.includes('mobile')) {
        // @ts-ignore
        const { redirect, xCorsHeaders2 } = await getRedirectLink(xCorsHeaders1, mobileRedirect);

      } else {
        ///  Request to redirect to get awin1 link
        myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders2);
        // @ts-ignore
        const response = await fetch(`${corsProxy}${redirect}`, requestOptions);
        // @ts-ignore
        // @ts-ignore
        const headers = JSON.parse(response.headers.get('cors-received-headers'))
        const data = await response.text();
        const document = new DOMParser().parseFromString(data, 'text/html');
        // @ts-ignore
        const awin = document.querySelector('html body form#form1 div#pnlContainer.container div div#pnlMainContent div#show-redirect.continue div a#hypRedirectMerchant').href.toString();

        return awin;
      }
    }

    const { earnCashback, xCorsHeaders1 } = await getEarnCashbackLink();
    const { redirect, xCorsHeaders2 } = await getRedirectLink(xCorsHeaders1, earnCashback);
    const awin = await getAwinLink(redirect, xCorsHeaders2);

    return awin;


  } catch (error) {
    console.log(error);
  }
}

export { fetchCashback };
