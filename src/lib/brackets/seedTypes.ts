export interface SeedPlayer {
  id: string;
  name: string;
  ranking?: number;
}

export type SeedStrategy =
  | "random"
  | "ranking"
  | "manual";