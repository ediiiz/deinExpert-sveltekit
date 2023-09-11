import type { PageServerLoad } from './$types';
import { scrapeWebPage } from '$lib/server/scrape';

export const load: PageServerLoad = async () => {
  const url = 'https://www.expert.de';
  const data = await scrapeWebPage(url);
  console.log(data);
  return { data };
};
