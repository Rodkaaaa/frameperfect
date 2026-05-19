export function generateSeedOrder(size: number): number[] {
  if (size === 1) return [1];

  const prev = generateSeedOrder(size / 2);

  const result: number[] = [];

  for (const seed of prev) {
    result.push(seed);
    result.push(size + 1 - seed);
  }

  return result;
}