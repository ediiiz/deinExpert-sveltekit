// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {}

declare global {
  namespace App {
    interface Platform {
      env?: {
        preisdetektivKV: KVNamespace;
        preisdetektivR2: DurableObjectNamespace;
      };
    }
  }
}

export {};
