
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

    // @ts-ignore
    let response = await fetch(`${corsProxy}${topcashbackShare}`, requestOptions);
    // @ts-ignore
    let headers = JSON.parse(response.headers.get('cors-received-headers'))
    let data = await response.text();
    let tcShareCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
    const xCorsHeaders1 = await generateCookieObject({ CookieObjects: tcShareCookies, headers: xCorsHeaders });
    let document = new DOMParser().parseFromString(data, 'text/html');
    // @ts-ignore
    const earnCashback = document.querySelector('html body div.gecko-main.gecko-text-center div.gecko-single-container div.gecko-m15em div.cont-to-merch-wrapper a.gecko-btn-cont.gecko-btn-cont-primary').href.toString().replace(`${window.location.protocol}//${window.location.host}`, 'https://www.topcashback.de');


    ///  Request to earncashback.aspx to get redirect.aspx link
    myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders1);
    // @ts-ignore
    response = await fetch(`${corsProxy}${earnCashback}`, requestOptions);
    // @ts-ignore
    headers = JSON.parse(response.headers.get('cors-received-headers'))
    data = await response.text();
    let redirect = `https://www.topcashback.de${response.headers.get('location')}`
    let earnCashbackCookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));
    const xCorsHeaders2 = await generateCookieObject({ CookieObjects: earnCashbackCookies, headers: xCorsHeaders });


    if (redirect) {
      ///  Request to redirect to get awin1 link
      myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders2);
      // @ts-ignore
      response = await fetch(`${corsProxy}${redirect}`, requestOptions);
      // @ts-ignore
      headers = JSON.parse(response.headers.get('cors-received-headers'))
      data = await response.text();
      document = new DOMParser().parseFromString(data, 'text/html');
      // @ts-ignore
      const awin = document.querySelector('html body form#form1 div#pnlContainer.container div div#pnlMainContent div#show-redirect.continue div a#hypRedirectMerchant').href.toString();

      

      // awin = https://www.awin1.com/cread.php?clickref=9343892x96139359&awinmid=30007&awinaffid=637873&p=http://google.de <- add parameter p and append the product url

      // /// Request to awin to get expert affiliate link
      // myHeaders['x-cors-headers'] = JSON.stringify(xCorsHeaders);

      // // @ts-ignore
      // response = await fetch(`${corsProxy}${awin}`, requestOptions);
      // // @ts-ignore
      // headers = JSON.parse(response.headers.get('cors-received-headers'));
      // // @ts-ignore
      // redirect = response.headers.get('location').split('?')[1];
      // // @ts-ignore
      // let awin1Cookies = parseAllCookies(headers['set-cookie'].split(/,\W(?=\D)/g));

      return awin;
    }

  } catch (error) {
    console.log(error);
  }
}

export { fetchCashback };
