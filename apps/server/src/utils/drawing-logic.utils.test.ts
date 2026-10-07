import { describe, expect, it } from '@jest/globals';
import {
  drawSecretSanta,
  type DrawExclusion,
  type DrawParticipant,
  type DrawResult,
} from './drawing-logic.utils';

const participant = (id: string, name = `Name ${id}`): DrawParticipant => ({ id, name });

const createParticipants = (count: number): DrawParticipant[] =>
  Array.from({ length: count }, (_, index) => participant(`P${index + 1}`));

const exclusion = (participantId: string, excludedParticipantId: string): DrawExclusion => ({
  participantId,
  excludedParticipantId,
});

/** Each participant excludes the next `span` participants (wrapping around). */
const createRingExclusions = (participants: DrawParticipant[], span = 1): DrawExclusion[] =>
  participants.flatMap((giver, index) =>
    Array.from({ length: span }, (_, offset) =>
      exclusion(giver.id, participants[(index + offset + 1) % participants.length].id),
    ),
  );

const expectSuccessfulDraw = (
  result: DrawResult,
  participants: DrawParticipant[],
  exclusions: DrawExclusion[] = [],
) => {
  if (!result.ok) {
    throw new Error(`Expected a successful draw, got: ${result.reasons.join(' ')}`);
  }

  const ids = participants.map((p) => p.id).sort();
  const givers = result.assignments.map((a) => a.giverId).sort();
  const receivers = result.assignments.map((a) => a.receiverId).sort();

  // Everyone gives exactly once and receives exactly once
  expect(result.assignments).toHaveLength(participants.length);
  expect(givers).toEqual(ids);
  expect(receivers).toEqual(ids);

  for (const { giverId, receiverId } of result.assignments) {
    expect(receiverId).not.toBe(giverId);
    expect(exclusions).not.toContainEqual(exclusion(giverId, receiverId));
  }

  return result.assignments;
};

const RUNS = 200;

describe('drawSecretSanta', () => {
  describe('valid draws', () => {
    it('assigns every participant exactly one other participant', () => {
      const participants = createParticipants(6);

      for (let run = 0; run < RUNS; run++) {
        expectSuccessfulDraw(drawSecretSanta(participants, []), participants);
      }
    });

    it('works with the minimum of 3 participants', () => {
      const participants = createParticipants(3);

      expectSuccessfulDraw(drawSecretSanta(participants, []), participants);
    });

    it('always respects exclusions', () => {
      const participants = createParticipants(5);
      const exclusions = [
        ...createRingExclusions(participants),
        exclusion('P1', 'P3'),
        exclusion('P3', 'P1'),
      ];

      for (let run = 0; run < RUNS; run++) {
        expectSuccessfulDraw(drawSecretSanta(participants, exclusions), participants, exclusions);
      }
    });

    it('produces the only possible assignment when exclusions leave a single option', () => {
      // P1 -> P2 -> P3 -> P1 is the only allowed cycle
      const participants = createParticipants(3);
      const exclusions = [exclusion('P1', 'P3'), exclusion('P2', 'P1'), exclusion('P3', 'P2')];

      const assignments = expectSuccessfulDraw(
        drawSecretSanta(participants, exclusions),
        participants,
        exclusions,
      );

      expect(assignments).toEqual(
        expect.arrayContaining([
          { giverId: 'P1', receiverId: 'P2' },
          { giverId: 'P2', receiverId: 'P3' },
          { giverId: 'P3', receiverId: 'P1' },
        ]),
      );
    });

    it('ignores exclusions that reference unknown participants', () => {
      const participants = createParticipants(3);
      const exclusions = [exclusion('P1', 'unknown'), exclusion('unknown', 'P2')];

      expectSuccessfulDraw(drawSecretSanta(participants, exclusions), participants);
    });

    it('accepts participants with extra fields', () => {
      const participants = createParticipants(4).map((p) => ({ ...p, eventId: 'event-1' }));

      expectSuccessfulDraw(drawSecretSanta(participants, []), participants);
    });
  });

  describe('randomness', () => {
    it('produces different results between runs', () => {
      const participants = createParticipants(6);
      const distinctDraws = new Set<string>();

      for (let run = 0; run < RUNS; run++) {
        const assignments = expectSuccessfulDraw(drawSecretSanta(participants, []), participants);
        distinctDraws.add(
          assignments
            .map((a) => `${a.giverId}->${a.receiverId}`)
            .sort()
            .join(','),
        );
      }

      expect(distinctDraws.size).toBeGreaterThan(1);
    });

    it('lets a participant draw each of their allowed receivers over many runs', () => {
      const participants = createParticipants(4);
      const receiversOfP1 = new Set<string>();

      for (let run = 0; run < RUNS; run++) {
        const assignments = expectSuccessfulDraw(drawSecretSanta(participants, []), participants);
        receiversOfP1.add(assignments.find((a) => a.giverId === 'P1')!.receiverId);
      }

      expect([...receiversOfP1].sort()).toEqual(['P2', 'P3', 'P4']);
    });
  });

  describe('impossible configurations', () => {
    it('fails when a participant has excluded everyone else', () => {
      const participants = [participant('A', 'Alice'), participant('B'), participant('C')];
      const exclusions = [exclusion('A', 'B'), exclusion('A', 'C')];

      const result = drawSecretSanta(participants, exclusions);

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.reasons).toEqual([
        'These participants have no valid recipients due to exclusions: Alice.',
        'Please relax exclusions for at least one of them.',
      ]);
      expect(result.debug?.unmatchedGivers).toEqual(['A']);
      expect(result.debug?.domains.A).toEqual([]);
    });

    it('fails when two participants can only draw the same person', () => {
      // Every participant has at least one option, but A and B both can only draw C
      const participants = ['A', 'B', 'C', 'D'].map((id) => participant(id));
      const exclusions = [
        exclusion('A', 'B'),
        exclusion('A', 'D'),
        exclusion('B', 'A'),
        exclusion('B', 'D'),
      ];

      for (let run = 0; run < 20; run++) {
        const result = drawSecretSanta(participants, exclusions);

        expect(result.ok).toBe(false);
        if (result.ok) return;
        expect(result.reasons[0]).toBe(
          'No valid complete drawing exists with the current exclusions (matched 3/4).',
        );
        expect(result.reasons[1]).toMatch(/^Problematic participants: Name [AB]\.$/);
        expect(result.debug?.unmatchedGivers).toHaveLength(1);
        expect(['A', 'B']).toContain(result.debug?.unmatchedGivers[0]);
      }
    });

    it('falls back to participant ids in reasons when names are missing', () => {
      const participants: DrawParticipant[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];
      const exclusions = [exclusion('A', 'B'), exclusion('A', 'C')];

      const result = drawSecretSanta(participants, exclusions);

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.reasons[0]).toBe(
        'These participants have no valid recipients due to exclusions: A.',
      );
    });
  });

  describe('input validation', () => {
    it.each([0, 1, 2])('throws for %i participants', (count) => {
      expect(() => drawSecretSanta(createParticipants(count), [])).toThrow(
        'At least 3 participants are required for drawing.',
      );
    });
  });

  describe('larger groups', () => {
    it('resolves 50 participants with many exclusions', () => {
      const participants = createParticipants(50);
      const exclusions = createRingExclusions(participants, 10);

      for (let run = 0; run < 20; run++) {
        expectSuccessfulDraw(drawSecretSanta(participants, exclusions), participants, exclusions);
      }
    });
  });
});
