import {
  BILL_CATEGORIES,
  SIMULATION_POPULATION_SIZE,
  SIMULATION_TRANSITIONS,
  type BillCategory,
  type IslandSimulationScenario,
  type PopulationCounts,
} from './simulationData'

export function getPopulationSize(counts: PopulationCounts) {
  return BILL_CATEGORIES.reduce((total, category) => total + counts[category.id], 0)
}

function addCounts(population: PopulationCounts, additional: Partial<PopulationCounts>): PopulationCounts {
  return Object.fromEntries(BILL_CATEGORIES.map(({ id }) => [id, population[id] + (additional[id] ?? 0)])) as PopulationCounts
}

function getNextGeneration(
  population: PopulationCounts,
  scenario: IslandSimulationScenario,
  fallbackPopulation: PopulationCounts,
): PopulationCounts {
  const contributionScores = BILL_CATEGORIES.map(({ id }) => population[id] * Math.max(0, scenario.relativeContribution[id]))
  const scoreTotal = contributionScores.reduce((total, score) => total + score, 0)
  if (!Number.isFinite(scoreTotal) || scoreTotal <= 0) return { ...fallbackPopulation }

  const exactCounts = contributionScores.map((score) => score / scoreTotal * SIMULATION_POPULATION_SIZE)
  const nextCounts = exactCounts.map((count) => Math.max(0, Math.floor(count)))
  const remainders = exactCounts.map((value, index) => ({ index, remainder: value - nextCounts[index] }))
    .sort((left, right) => right.remainder - left.remainder || left.index - right.index)

  let remainingBirds = SIMULATION_POPULATION_SIZE - nextCounts.reduce((total, count) => total + count, 0)
  for (let index = 0; remainingBirds > 0; index += 1, remainingBirds -= 1) {
    nextCounts[remainders[index].index] += 1
  }

  return Object.fromEntries(BILL_CATEGORIES.map(({ id }, index) => [id, nextCounts[index]])) as PopulationCounts
}

export function buildPopulationSequence(scenario: IslandSimulationScenario): PopulationCounts[] {
  const sequence: PopulationCounts[] = [{ ...scenario.initialPopulation }]
  for (let generation = 0; generation < SIMULATION_TRANSITIONS; generation += 1) {
    const currentPopulation = sequence[generation]
    // The rare inherited XS variation is already present in the wider population,
    // but it is not represented in the Generation 1 or 2 samples. Include its source
    // when Generation 2 reproduces so it can first appear in the Generation 3 sample.
    const reproductionPool = generation === 1
      ? addCounts(currentPopulation, scenario.unrepresentedInheritedVariation)
      : currentPopulation
    sequence.push(getNextGeneration(reproductionPool, scenario, currentPopulation))
  }
  return sequence
}

export function getCategoryPercent(count: number, populationSize: number) {
  return populationSize === 0 ? 0 : Math.round(count / populationSize * 100)
}

export function getChangingCategories(previous: PopulationCounts, current: PopulationCounts) {
  return BILL_CATEGORIES.reduce<{ increased: BillCategory[]; decreased: BillCategory[] }>((changes, category) => {
    const before = previous[category.id]
    const after = current[category.id]
    if (after > before) changes.increased.push(category.id)
    if (after < before) changes.decreased.push(category.id)
    return changes
  }, { increased: [], decreased: [] })
}
