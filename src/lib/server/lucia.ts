import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from '$lib/prisma';
import { SECRET_GITHUB_CLIENT_ID, SECRET_GITHUB_SECRET } from '$env/static/private';
import { github } from '@lucia-auth/oauth/providers';

// expect error (see next section)
export const auth = lucia({
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  adapter: prismaAdapter(prisma),
  getUserAttributes: (data) => {
    return {
      githubUsername: data.github_username,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: SECRET_GITHUB_CLIENT_ID,
  clientSecret: SECRET_GITHUB_SECRET,
});

export type Auth = typeof auth;
