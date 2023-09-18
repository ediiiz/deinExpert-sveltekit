import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { env } from '$env/dynamic/private';

const SBR_CDP = env.SECRET_BRIGHT_DATA_URL;

const newBrowser = async (): Promise<Browser> => {
  if (SBR_CDP) {
    return chromium.connectOverCDP(SBR_CDP);
  }
  return chromium.launch();
};

const addPageInterceptors = async (page: Page) => {
  await page.route('**/*', (route) => {
    const request = route.request();
    const resourceType = request.resourceType();
    if (
      resourceType === 'image' ||
      resourceType === 'font' ||
      resourceType === 'stylesheet' ||
      resourceType === 'script' ||
      resourceType === 'media'
    ) {
      route.abort();
    } else {
      route.continue();
    }
  });
};

// Your scraping logic
export const scrapeWebPage = async (url: string) => {
  const browser = await newBrowser();
  const page = await browser.newPage();
  await addPageInterceptors(page);

  await page.goto(url);

  // Add your scraping logic here
  // Example: extract all headlines from a news page
  const data = await page.content();

  await browser.close();
  return data;
};
