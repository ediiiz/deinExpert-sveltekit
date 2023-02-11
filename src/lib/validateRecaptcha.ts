import { env } from '$env/dynamic/private';
import type { googleSiteVerifyResponse } from '$lib/types/types';

const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${env.SECRET_RECAPTCHA_SECRET}&response=`;

export default async function validateRecaptcha(recaptchaResponse: string) {
  const response = await fetch(recaptchaVerifyUrl + recaptchaResponse);
  const recaptcha = (await response.json()) as googleSiteVerifyResponse;
  return recaptcha;
}
