import { env } from '$env/dynamic/private';
import type { googleSearchApiResponse } from '$lib/types/types';

const googleSearchUrl = `https://www.googleapis.com/customsearch/v1/siterestrict?key=${env.SECRET_API_KEY}&cx=${env.SECRET_SEARCH_ENGINE_ID}&exactTerms=`;

export default async function validateWebcode(webcode: string) {
  const response = await fetch(googleSearchUrl + webcode);
  const googleSearch = (await response.json()) as googleSearchApiResponse;
  if (parseInt(googleSearch.searchInformation.formattedTotalResults) > 0) {
    return googleSearch;
  } else {
    return false;
  }
}
