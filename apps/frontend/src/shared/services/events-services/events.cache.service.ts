import type { Event } from "@gd/types/src/models/events.model";
import { getCachedValue } from "../local-storage.service";
import { USER_EVENTS } from "../../constants/local-storage-keys";
import type { CachedEvent } from "../../types/events.types";

export const cacheUserEvents = (event: Event) => {
  const cachedEvents = getCachedValue<CachedEvent[]>(USER_EVENTS) || [];
  const isEventAlreadyCached = cachedEvents.some((e) => e.id === event.id);
  if (!isEventAlreadyCached) {
    const updatedEvents = [...cachedEvents, mapToCachedEvent(event)];
    localStorage.setItem(USER_EVENTS, JSON.stringify(updatedEvents));
    return;
  }
  const updatedEvents = cachedEvents.map((e) => e.id === event.id ? mapToCachedEvent(event) : e);
  localStorage.setItem(USER_EVENTS, JSON.stringify(updatedEvents));
};

const mapToCachedEvent = (event: Event): CachedEvent => ({
  id: event.id,
  name: event.name,
  description: event.description,
  exchangeDate: event.exchangeDate,
  giftBudget: event.giftBudget,
  participantsCount: event.participants.length,
  createdAt: event.createdAt,
  participantJoinCode: event.currentParticipant.joinCode,
});

export const getUserEventsFromCache = (): CachedEvent[] => {
  return getCachedValue<CachedEvent[]>(USER_EVENTS) || [];
};
