import { PUBLIC_CLOUDFLARE_WORKER_API_KEY, PUBLIC_LINKOMAT_API_KEY } from '$env/static/public';

enum Routes {
  LINKOMAT_BASE = 'https://api.link-o-mat.com/redirectWebsite.php?data=',
  CORS_PROXY = 'https://cashback.dztf.workers.dev/?',
}

interface HeadersObject {
  'X-Requested-With': string;
  'x-cors-headers': string;
  [key: string]: string;
}

export async function getLinkomatAwin(): Promise<string | void> {
  const linkomatUrl = `${Routes.LINKOMAT_BASE}${PUBLIC_LINKOMAT_API_KEY}`;
  const headers: HeadersObject = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-API-KEY': PUBLIC_CLOUDFLARE_WORKER_API_KEY,
    'x-cors-headers': JSON.stringify({
      Referer: linkomatUrl,
      'Access-Control-Allow-Origin': '*',
    }),
  };

  const requestOptions: RequestInit = {
    headers,
    redirect: 'follow', // Don't automatically follow redirects
    method: 'POST',
  };

  const fetchWithCors = async (url: string) => {
    return await fetch(`${Routes.CORS_PROXY}${url}`, requestOptions);
  };

  const response = await fetchWithCors(`${linkomatUrl}&ab=0`);
  const rshopResponse = await fetchWithCors(response.headers.get('location')!);
  const earnCashbackElement = new DOMParser()
    .parseFromString(await rshopResponse.text(), 'text/html')
    .querySelector<HTMLAnchorElement>('html body a')?.href;
  const lomlinkResponse = await fetchWithCors(earnCashbackElement!);
  const awinLink = lomlinkResponse.headers.get('location')!;
  return awinLink;
}
