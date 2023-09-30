import type { RequestHandler } from "./$types"
import { FlareSolverrAgent } from "$lib/server/flaresolverr";
import { error, json } from '@sveltejs/kit';
import type { FlareSolverrResponseData } from "$lib/types/FlareSolverrResponseData";

function extractClearanceCookie(data: FlareSolverrResponseData) {
  const cookies = data.solution.cookies
  const clearanceCookie = cookies.find((cookie: { name: string; }) => cookie.name === "cf_clearance")
  return clearanceCookie
}

export const GET: RequestHandler = async () => {
  const agent = new FlareSolverrAgent();
  /*const data = await agent.getClearenceCookie("https://www.expert.de");
  if (!data) throw error(500, {
    message: 'Captcha not solved',
  });

  const cfclearance = extractClearanceCookie(data)

  if (!cfclearance) throw error(500, {
    message: 'Captcha not solved',
  });*/

  const expertData = await agent.getArticleId("https://www.expert.de")

  return json({ expertData });
};
