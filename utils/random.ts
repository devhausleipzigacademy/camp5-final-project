export function randRange(start: number, end: number) {
  return Math.floor(Math.random() * (1 + end - start)) + start;
}

export function sampleArray<T>(population: Array<T>): T {
  return population[randRange(0, population.length)];
}

export function sampleObject<T extends string, P>(
  population: Record<T, P>
): [T, P] {
  const itemArray = Object.entries(population) as Array<[T, P]>;
  return sampleArray(itemArray);
}

function randomDate(startDate: Date, endDate: Date): Date {
  const timeBetweenDates = endDate.getTime() - startDate.getTime();
  const daysBetweenDates = timeBetweenDates / 86400000;
  const randomNumberOfDays = randRange(0, daysBetweenDates);
  const randomDate = new Date();
  randomDate.setDate(endDate.getDate() - randomNumberOfDays);
  return randomDate;
}
