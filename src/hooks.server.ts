import type { Handle } from '@sveltejs/kit';
import Blob from 'cross-blob';
import { sequence } from '@sveltejs/kit/hooks';
import { auth } from '$lib/server/lucia';

export const handleAuth: Handle = async ({ event, resolve }) => {
  // we can pass `event` because we used the SvelteKit middleware
  event.locals.auth = auth.handleRequest(event);
  return await resolve(event);
};

const handleEvent: Handle = async ({ event, resolve }) => {
  if (event.request.method !== 'OPTIONS') return await resolve(event);
  return new Response(new Blob(), { status: 200 });
};

export const handle: Handle = sequence(handleEvent, handleAuth);
