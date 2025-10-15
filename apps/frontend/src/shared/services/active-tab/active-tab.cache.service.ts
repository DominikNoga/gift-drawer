import { ACTIVE_TAB_KEY } from "../../constants/local-storage-keys";
import { cacheValue, getCachedValue } from "../local-storage.service";
import type { ActiveTabCache } from "./active-tab.cache.service.types";

export const cacheActiveTab = (eventId: string, tabIndex: number) => {
  const activeTabCache = getCachedValue<ActiveTabCache[]>(ACTIVE_TAB_KEY) || [];
  const isEventAlreadyCached = activeTabCache.some((cache) => cache.eventId === eventId);
  if (!isEventAlreadyCached) {
    const updatedCache = [...activeTabCache, { eventId, tabIndex }];
    cacheValue<ActiveTabCache[]>(ACTIVE_TAB_KEY, updatedCache);
    return;
  }
  const updatedCache = activeTabCache.map((cache) => cache.eventId === eventId ? { eventId, tabIndex } : cache);
  cacheValue<ActiveTabCache[]>(ACTIVE_TAB_KEY, updatedCache);
};

export const getActiveTabFromCache = (eventId: string): number => {
  const activeTabCache = getCachedValue<ActiveTabCache[]>(ACTIVE_TAB_KEY) || [];
  const cachedTab = activeTabCache.find((cache) => cache.eventId === eventId);
  return cachedTab ? cachedTab.tabIndex : 0;
};
