import { Player } from "@/types/player";

export function generatePools(players: Player[]) {
  const poolSize = 4;
  const shuffled = players.sort(() => Math.random() - 0.5);

  const pools = [];

  for (let i = 0; i < shuffled.length; i += poolSize) {
    pools.push(shuffled.slice(i, i + poolSize));
  }

  return pools;
}