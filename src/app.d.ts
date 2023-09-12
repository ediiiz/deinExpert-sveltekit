// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  namespace App {
    interface Locals {
      auth: import('lucia').AuthRequest;
    }

    interface Platform {
      env: {
        COUNTER: DurableObjectNamespace;
      };
      context: {
        waitUntil(promise: Promise<any>): void;
      };
      caches: CacheStorage & { default: Cache };
    }

    interface Session { }

    interface Stuff { }
  }
}

// src/app.d.ts
/// <reference types="lucia" />
declare global {
  namespace Lucia {
    type Auth = import('$lib/server/lucia').Auth;
    type DatabaseUserAttributes = {
      github_username: string;
    };
    type DatabaseSessionAttributes = {};
  }
}

// THIS IS IMPORTANT!!!
export { };
