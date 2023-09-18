import { env } from '$env/dynamic/private';
import type { googleSearchApiResponse } from '$lib/types/types';

const API_KEY = env.SECRET_API_KEY;
const SEARCH_ENGINE_ID = env.SECRET_SEARCH_ENGINE_ID;

const googleSearchUrl = `https://www.googleapis.com/customsearch/v1/siterestrict?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&exactTerms=`;

export default async function validateWebcode(webcode: string) {
  const response = await fetch(googleSearchUrl + webcode);
  const googleSearch = (await response.json()) as googleSearchApiResponse;
  if (parseInt(googleSearch.searchInformation.formattedTotalResults) > 0) {
    return googleSearch;
  } else {
    return false;
  }
}
