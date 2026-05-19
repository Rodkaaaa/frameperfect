export function generateSeeds(size: number): number[] {
  let seeds = [1, 2];

  while (seeds.length < size) {
    const next: number[] = [];
    const length = seeds.length * 2 + 1;

    for (const seed of seeds) {
      next.push(seed);
      next.push(length - seed);
    }

    seeds = next;
  }

  return seeds;
}
