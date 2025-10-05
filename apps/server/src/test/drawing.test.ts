import { z } from "zod";

export const ParticipantSchema = z.object({
  id: z.string(),
  name: z.string(),
  eventId: z.string(),
  joinCode: z.string(),
  drawParticipantId: z.string().nullable(),
});

export const ExclusionSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  participantId: z.string(),         // giver who excludes...
  excludedParticipantId: z.string(), // ...this receiver
});

export type Participant = z.infer<typeof ParticipantSchema>;
export type Exclusion = z.infer<typeof ExclusionSchema>;

type DrawResultFailed = {
  ok: false;
  reasons: string[];
  debug?: {
    unmatchedGivers: string[];
    domains: Record<string, string[]>; // giverId -> allowed receiverIds
  };
};

type DrawResultSuccess = {
  ok: true;
  assignment: Record<string, string>
};

type DrawResult = DrawResultSuccess | DrawResultFailed;

// Shuffling using Fisher–Yates algorithm
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


const validateQuantity = (participantsQuantity: number) => {
  if (participantsQuantity < 3) {
    throw new Error("At least 3 participants are required for drawing.");
  }
}

const buildDisallowedMap = (participantsByIdMap: Map<string, Participant>, exclusions: Exclusion[]) => {
  const disallowedReceiversByGiverMap = new Map<string, Set<string>>();
  for (const exclusion of exclusions) {
    const giverId = exclusion.participantId;
    const receiverId = exclusion.excludedParticipantId;
    if (!participantsByIdMap.has(giverId) || !participantsByIdMap.has(receiverId)) continue;

    if (!disallowedReceiversByGiverMap.has(giverId)) {
      disallowedReceiversByGiverMap.set(giverId, new Set());
    }
    disallowedReceiversByGiverMap.get(giverId)!.add(receiverId);
  }
  return disallowedReceiversByGiverMap;
};

const buildAllowedReceiversMap = (participantIds: string[], disallowedReceiversByGiverMap: Map<string, Set<string>>) => {
  const allowedReceiversByGiverMap = new Map<string, string[]>();
  for (const giverId of participantIds) {
    const disallowed = disallowedReceiversByGiverMap.get(giverId) ?? new Set<string>();
    const allowedReceiverIds = participantIds.filter(
      (receiverId) => receiverId !== giverId && !disallowed.has(receiverId)
    );
    // randomize to vary results between runs
    allowedReceiversByGiverMap.set(giverId, shuffle(allowedReceiverIds.slice()));
  }
  return allowedReceiversByGiverMap;
};

const validateZeroEdges = (
  allowedReceiversByGiverMap: Map<string, string[]>,
  participantIds: string[],
  participantsByIdMap: Map<string, Participant>
): DrawResultFailed | null => {
  const giverIdsWithNoOptions = participantIds.filter(
    (giverId) => (allowedReceiversByGiverMap.get(giverId)?.length ?? 0) === 0
  );

  if (giverIdsWithNoOptions.length > 0) {
    return {
      ok: false,
      reasons: [
        `These participants have no valid recipients due to exclusions: ${giverIdsWithNoOptions
          .map((id) => participantsByIdMap.get(id)?.name ?? id)
          .join(", ")}.`,
        `Please relax exclusions for at least one of them.`,
      ],
      debug: {
        unmatchedGivers: giverIdsWithNoOptions,
        domains: Object.fromEntries(
          participantIds.map((giverId) => [giverId, allowedReceiversByGiverMap.get(giverId)!])
        ),
      },
    };
  }
  return null;
};

function tryFindAugmentingPath(
  receiverToGiverMatchMap: Map<string, string>,
  allowedReceiversByGiverMap: Map<string, string[]>,
  giverId: string,
  visitedReceiverIds: Set<string>,
): boolean {
  const candidateReceiverIds = allowedReceiversByGiverMap.get(giverId)!;

  for (const receiverId of candidateReceiverIds) {
    if (visitedReceiverIds.has(receiverId)) continue;
    visitedReceiverIds.add(receiverId);

    const currentlyMatchedGiverId = receiverToGiverMatchMap.get(receiverId);
    const receiverIsFree =
      currentlyMatchedGiverId === undefined ||
      tryFindAugmentingPath(receiverToGiverMatchMap, allowedReceiversByGiverMap, currentlyMatchedGiverId, visitedReceiverIds);

    if (receiverIsFree) {
      receiverToGiverMatchMap.set(receiverId, giverId);
      return true;
    }
  }
  return false;
}

export function drawSecretSanta(
  participants: Participant[],
  exclusions: Exclusion[]
): DrawResult {
  const participantsQuantity = participants.length;
  validateQuantity(participantsQuantity);

  // Index participants
  const participantsByIdMap = new Map(participants.map((p) => [p.id, p]));
  const participantIds = participants.map((p) => p.id);

  // Build: giverId -> Set(disallowedReceiverIds)
  const disallowedReceiversByGiverMap = buildDisallowedMap(participantsByIdMap, exclusions);

  // Build allowed adjacency: giverId -> allowedReceiverIds (no self, no excluded)
  const allowedReceiversByGiverMap = buildAllowedReceiversMap(participantIds, disallowedReceiversByGiverMap);

  const zeroEdgeValidation = validateZeroEdges(allowedReceiversByGiverMap, participantIds, participantsByIdMap);
  if (zeroEdgeValidation) return zeroEdgeValidation;

  // Kuhn's algorithm (maximum bipartite matching via DFS of augmenting paths)
  // Map: receiverId -> giverId
  const receiverToGiverMatchMap = new Map<string, string>();

  // Order givers by MRV (fewest options first) with light randomization
  const giverIdsOrdered = participantIds
    .slice()
    .sort(
      (a, b) =>
      (allowedReceiversByGiverMap.get(a)!.length -
        allowedReceiversByGiverMap.get(b)!.length)
    );
  shuffle(giverIdsOrdered);

  let matchedCount = 0;
  for (const giverId of giverIdsOrdered) {
    if (tryFindAugmentingPath(receiverToGiverMatchMap, allowedReceiversByGiverMap, giverId, new Set())) matchedCount++;
  }

  if (matchedCount !== participantsQuantity) {
    const assignedReceiverIds = new Set(receiverToGiverMatchMap.keys());
    const matchedGiverIds = new Set<string>(
      [...assignedReceiverIds].map((receiverId) => receiverToGiverMatchMap.get(receiverId)!)
    );
    const unmatchedGiverIds = giverIdsOrdered.filter((giverId) => !matchedGiverIds.has(giverId));

    const domains: Record<string, string[]> = {};
    for (const giverId of participantIds) {
      domains[giverId] = allowedReceiversByGiverMap.get(giverId)!;
    }

    return {
      ok: false,
      reasons: [
        `No valid complete drawing exists with the current exclusions (matched ${matchedCount}/${participantsQuantity}).`,
        `Problematic participants: ${unmatchedGiverIds
          .map((id) => participantsByIdMap.get(id)?.name ?? id)
          .join(", ") || "—"}.`,
      ],
      debug: { unmatchedGivers: unmatchedGiverIds, domains },
    };
  }

  // Build final giverId -> receiverId assignment
  const assignment: Record<string, string> = {};
  for (const [receiverId, giverId] of receiverToGiverMatchMap.entries()) {
    assignment[giverId] = receiverId;
  }
  return { ok: true, assignment };
}

/** Optional helper: return a copy with drawParticipantId filled from an assignment */
export function applyAssignment(
  participants: Participant[],
  assignment: Record<string, string>
): Participant[] {
  return participants.map((p) => ({
    ...p,
    drawParticipantId: assignment[p.id] ?? null,
  }));
}

/* ------------------------- Mock test data & harness ------------------------ */

function p(id: string, name: string, eventId = "e1"): Participant {
  return { id, name, eventId, joinCode: `join-${id}`, drawParticipantId: null };
}

function ex(
  id: string,
  participantId: string,
  excludedParticipantId: string,
  eventId = "e1"
): Exclusion {
  return { id, eventId, participantId, excludedParticipantId };
}

function printResult(title: string, participants: Participant[], exclusions: Exclusion[]) {
  console.log(`\n=== ${title} ===`);
  const res = drawSecretSanta(participants, exclusions);
  if (res.ok) {
    const byId = new Map(participants.map((p) => [p.id, p.name]));
    console.log("Assignment (giver -> receiver):");
    for (const g of Object.keys(res.assignment)) {
      console.log(`  ${byId.get(g)} -> ${byId.get(res.assignment[g])}`);
    }
  } else {
    console.log("FAILED:");
    for (const r of res.reasons) console.log("  - " + r);
    if (res.debug) {
      const byId = new Map(participants.map((p) => [p.id, p.name]));
      console.log("  Unmatched givers:", res.debug.unmatchedGivers.map((id) => byId.get(id)));
      // Optional: show domains in names
      console.log("  Domains:");
      for (const [g, domain] of Object.entries(res.debug.domains)) {
        console.log(
          `   ${byId.get(g)} can draw: ${domain.map((r) => byId.get(r)).join(", ")}`
        );
      }
    }
  }
}

/* ------------------------------- Test cases ------------------------------- */

// Case 1: No exclusions (should succeed)
const participants1 = [p("A", "Alice"), p("B", "Bob"), p("C", "Cara"), p("D", "Dan")];
const exclusions1: Exclusion[] = [];

// Case 2: Directed exclusions but still feasible
// Alice cannot draw Bob; Bob cannot draw Cara; still solvable.
const participants2 = [p("A", "Alice"), p("B", "Bob"), p("C", "Cara"), p("D", "Dan")];
const exclusions2 = [ex("e1", "A", "B"), ex("e2", "B", "C")];

// Case 3: Impossible because one participant excludes everyone else
// Alice excludes Bob, Cara, Dan -> Alice has no options.
const participants3 = [p("A", "Alice"), p("B", "Bob"), p("C", "Cara"), p("D", "Dan")];
const exclusions3 = [ex("e1", "A", "B"), ex("e2", "A", "C"), ex("e3", "A", "D")];

// Case 4: Hall-violation style impossible (no individual zero-degree, but still impossible)
// A can draw only C; B can draw only C; others free.
// Two givers contend for the same single receiver -> cannot match all.
const participants4 = [p("A", "Alice"), p("B", "Bob"), p("C", "Cara"), p("D", "Dan")] // p("E", "Eve"), p("F", "Frank"), p("G", "Grace")];
const exclusions4 = [
  ex("e1", "A", "B"),
  // ex("e2", "A", "D"), // A -> {C}
  // ex("e3", "B", "A"),
  // ex("e4", "B", "D"), // B -> {C}
];

// Case 5: 5 people with a ring of exclusions (still feasible)
// Each person excludes the next person; should still work.
const participants5 = [p("P1", "P1"), p("P2", "P2"), p("P3", "P3"), p("P4", "P4"), p("P5", "P5")];
const exclusions5 = [
  ex("e1", "P1", "P2"),
  ex("e2", "P2", "P3"),
  ex("e3", "P3", "P4"),
  ex("e4", "P4", "P5"),
  ex("e5", "P5", "P1"),
];

// Run if executed directly: `ts-node secretSanta.ts`
if (require.main === module) {
  // for (let i = 0; i < 3; i++) {}
  printResult("Case 1: No exclusions (should succeed)", participants1, exclusions1);
  printResult("Case 2: Some exclusions (should succeed)", participants2, exclusions2);
  printResult("Case 3: One excludes everyone (should fail)", participants3, exclusions3);
  printResult("Case 4: Hall-style impossible (should fail)", participants4, exclusions4);
  printResult("Case 5: Ring exclusions (should succeed)", participants5, exclusions5);
}

export default { drawSecretSanta, applyAssignment };
