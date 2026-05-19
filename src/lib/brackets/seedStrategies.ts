import { SeedPlayer } from "./seedTypes";

export function rankingSeeding(players: SeedPlayer[]) {
  return [...players].sort(
    (a, b) => (a.ranking ?? 9999) - (b.ranking ?? 9999)
  );
}

export function randomSeeding(players: SeedPlayer[]) {
  return [...players].sort(() => Math.random() - 0.5);
}