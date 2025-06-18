import type { Participant, Event } from '../types/index';

export const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: 'p1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    joinedAt: new Date('2025-06-01T10:00:00Z'),
    exclusions: ['p2'],
  },
  {
    id: 'p2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    joinedAt: new Date('2025-06-02T11:30:00Z'),
    exclusions: ['p1'],
  },
  {
    id: 'p3',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    joinedAt: new Date('2025-06-03T09:15:00Z'),
    exclusions: [],
  },
  {
    id: 'p4',
    name: 'Diana Evans',
    email: 'diana@example.com',
    joinedAt: new Date('2025-06-04T08:45:00Z'),
    exclusions: [],
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    name: 'Summer Secret Santa',
    description: 'Gift exchange for summer team retreat.',
    organizerName: 'Alice Johnson',
    organizerEmail: 'alice@example.com',
    giftBudget: 25,
    exchangeDate: new Date('2025-07-01T18:00:00Z'),
    participants: [MOCK_PARTICIPANTS[0], MOCK_PARTICIPANTS[1], MOCK_PARTICIPANTS[2]],
    isDrawn: false,
    joinCode: 'SUMMER2025',
    createdAt: new Date('2025-06-01T09:00:00Z')
  },
  {
    id: 'e2',
    name: 'Office Christmas Exchange',
    description: 'Annual office gift exchange for Christmas.',
    organizerName: 'Bob Smith',
    organizerEmail: 'bob@example.com',
    giftBudget: 40,
    exchangeDate: new Date('2025-12-20T17:00:00Z'),
    participants: [MOCK_PARTICIPANTS[1], MOCK_PARTICIPANTS[2], MOCK_PARTICIPANTS[3]],
    isDrawn: true,
    joinCode: 'XMASOFFICE',
    createdAt: new Date('2025-11-25T14:00:00Z')
  },
  {
    id: 'e3',
    name: 'Family New Year Swap',
    description: 'New Year’s Eve gift swap with the family.',
    organizerName: 'Charlie Davis',
    organizerEmail: 'charlie@example.com',
    participants: [MOCK_PARTICIPANTS[0], MOCK_PARTICIPANTS[2], MOCK_PARTICIPANTS[3]],
    isDrawn: false,
    joinCode: 'FAM2026',
    exchangeDate: new Date('2025-12-26T17:00:00Z'),
    createdAt: new Date('2025-12-28T12:00:00Z')
  }
];
