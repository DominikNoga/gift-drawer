import type { EventCardProps } from "./components/EventCard/EventCard";


export const createEventProps: Omit<EventCardProps, 'icon'> = {
  description: 'Start a new Secret Santa event and invite your friends, family, or colleagues.',
  title: 'Create New Event',
};

export const joinEventProps: Omit<EventCardProps, 'icon'> = {
  description: 'Have a join code? Enter it below to participate in a Secret Santa event.',
  title: 'Join Event',
};
