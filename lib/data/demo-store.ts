import {
  demoContent,
  demoLeads,
  demoReviews,
  demoServices,
  demoTrips,
} from "@/lib/data/demo";
import type {
  Lead,
  Review,
  Service,
  SiteContentEntry,
  Trip,
} from "@/lib/data/types";

/**
 * Magasin en mémoire utilisé en mode démo (Supabase non configuré).
 *
 * Il permet de parcourir et de tester l'administration sans base de données.
 * Les modifications ne survivent pas au redémarrage du serveur : l'interface
 * l'indique explicitement à chaque écran.
 */

type DemoStore = {
  trips: Trip[];
  services: Service[];
  reviews: Review[];
  leads: Lead[];
  content: SiteContentEntry[];
};

declare global {
  var __mtdDemoStoreEmail: DemoStore | undefined;
  var __mtdDemoStoreSeed: number | undefined;
}

const DEMO_STORE_SEED = 3;

function createStore(): DemoStore {
  return {
    trips: structuredClone(demoTrips),
    services: structuredClone(demoServices),
    reviews: structuredClone(demoReviews),
    leads: structuredClone(demoLeads),
    content: structuredClone(demoContent),
  };
}

/**
 * Le magasin est attaché à `globalThis` pour survivre au rechargement à chaud
 * de Next.js en développement.
 */
export function demoStore(): DemoStore {
  if (globalThis.__mtdDemoStoreSeed !== DEMO_STORE_SEED) {
    globalThis.__mtdDemoStoreEmail = createStore();
    globalThis.__mtdDemoStoreSeed = DEMO_STORE_SEED;
  }

  globalThis.__mtdDemoStoreEmail ??= createStore();
  return globalThis.__mtdDemoStoreEmail;
}

export function resetDemoStore(): void {
  globalThis.__mtdDemoStoreEmail = createStore();
}

export function demoTimestamp(): string {
  return new Date().toISOString();
}

export function demoId(): string {
  return globalThis.crypto.randomUUID();
}
