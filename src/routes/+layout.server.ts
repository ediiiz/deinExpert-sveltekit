import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (async ({ locals, url: { pathname } }) => {
  const session = locals.auth.validate()
  return { session, pathname };
}) satisfies LayoutServerLoad;

