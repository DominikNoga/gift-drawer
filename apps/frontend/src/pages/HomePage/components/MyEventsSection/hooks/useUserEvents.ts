import { useEffect, useState } from 'react';
import { get } from '@gd/shared/utils/api.utils';
import type { Event } from '@gd/types/src/models/events.model';

export default function useUserEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const events = await get<Event[]>('/events');
        console.log(events);
        setEvents(events);
      } catch (error) {
        console.error('Error fetching user events:', error);
        setError('Failed to load events. Please try again later.');
      }
    };

    fetchUserEvents();
  }, []);

  return { events, error };
}
