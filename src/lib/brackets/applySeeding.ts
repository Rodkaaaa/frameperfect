import { generateSeedOrder } from "./generateSeedOrder";
import { rankingSeeding, randomSeeding } from "./seedStrategies";
import { SeedPlayer, SeedStrategy } from "./seedTypes";

export function applySeeding(
  players: SeedPlayer[],
  strategy: SeedStrategy
) {
  let orderedPlayers: SeedPlayer[];

  switch (strategy) {
    case "ranking":
      orderedPlayers = rankingSeeding(players);
      break;

    case "random":
      orderedPlayers = randomSeeding(players);
      break;

    default:
      orderedPlayers = players;
  }

  const order = generateSeedOrder(players.length);

  return order.map(seed => orderedPlayers[seed - 1]);
}