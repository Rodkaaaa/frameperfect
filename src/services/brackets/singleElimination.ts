import { Match } from "@/models/Match";

export async function singleElimination(
  tournamentId: string,
  seededPlayers: string[]
) {
  const totalPlayers = seededPlayers.length;

  if ((totalPlayers & (totalPlayers - 1)) !== 0) {
    throw new Error("Players must be power of 2");
  }

  const rounds = Math.log2(totalPlayers);

  const matches: any[] = [];

  /* CREATE MATCH STRUCTURE */
  let matchNumber = 0;

  for (let round = 1; round <= rounds; round++) {
    const matchesInRound = totalPlayers / Math.pow(2, round);

    for (let i = 0; i < matchesInRound; i++) {
      matches.push({
        tournamentId,
        round,
        matchNumber: matchNumber++,
        player1: null,
        player2: null,
        nextMatchId: null,
        nextMatchSlot: null,
      });
    }
  }

  const createdMatches = await Match.insertMany(matches);

  /* LINK NEXT MATCHES */
  let index = 0;

  for (let round = 1; round < rounds; round++) {
    const matchesInRound = totalPlayers / Math.pow(2, round);

    for (let i = 0; i < matchesInRound; i += 2) {
      const m1 = createdMatches[index + i];
      const m2 = createdMatches[index + i + 1];
      const nextMatch =
        createdMatches[index + matchesInRound + i / 2];

      await Match.findByIdAndUpdate(m1._id, {
        nextMatchId: nextMatch._id,
        nextMatchSlot: 1,
      });

      await Match.findByIdAndUpdate(m2._id, {
        nextMatchId: nextMatch._id,
        nextMatchSlot: 2,
      });
    }

    index += matchesInRound;
  }

  /* ASSIGN FIRST ROUND PLAYERS */
  const firstRoundMatches = createdMatches.filter(
    (m) => m.round === 1
  );

  let playerIndex = 0;

  for (const match of firstRoundMatches) {
    await Match.findByIdAndUpdate(match._id, {
      player1: seededPlayers[playerIndex++] || null,
      player2: seededPlayers[playerIndex++] || null,
    });
  }

  return createdMatches;
}