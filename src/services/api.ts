import { faker } from "@faker-js/faker";
import { DAY_LENGTH_MS, shuffleNumbers, sortNumbers } from "./utils";

export interface CumulativePrecipitation {
  current: Record<string, number>;
  historicalAverage: Record<string, number>;
  thresholds: {
    optimal: number;
    moderate: number;
    high: number;
  };
}

export interface GetDataOptions {
  from: Date | string | number;
  to: Date | string | number;
  currentMin: number;
  currentMax: number;
  historyAverageMin: number;
  historyAverageMax: number;
  precision: number;
  shuffleDistance: number;
  shuffleProbability: number;
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const getData = ({
  from,
  to,
  ...CONFIG // eslint-disable-next-line @typescript-eslint/promise-function-async
}: GetDataOptions): Promise<CumulativePrecipitation> => {
  const computedFrom = new Date(from).getTime();
  const computedTo = new Date(to).getTime();
  const duration = computedTo - computedFrom;
  const days = Math.floor(duration / DAY_LENGTH_MS);

  // eslint-disable-next-line unicorn/prefer-spread, unicorn/no-new-array
  const dates = Object.keys(Array.from(new Array(days)))
    .map(Number)
    .map((i) => new Date(computedFrom + DAY_LENGTH_MS * i).getTime().toString());

  const current = shuffleNumbers(
    CONFIG.shuffleDistance,
    CONFIG.shuffleProbability,
    dates
      .map(() =>
        faker.number.float({
          min: CONFIG.currentMin,
          max: CONFIG.currentMax,
          precision: CONFIG.precision,
        }),
      )
      .sort(sortNumbers),
  );

  const historicalAverage = shuffleNumbers(
    CONFIG.shuffleDistance,
    CONFIG.shuffleProbability,
    dates
      .map(() =>
        faker.number.float({
          min: CONFIG.historyAverageMin,
          max: CONFIG.historyAverageMax,
          precision: CONFIG.precision,
        }),
      )
      .sort(sortNumbers),
  );

  const data: CumulativePrecipitation = {
    current: Object.fromEntries(dates.map((i, k) => [i, current[k]])),
    historicalAverage: Object.fromEntries(dates.map((i, k) => [i, historicalAverage[k]])),
    thresholds: {
      optimal: 1,
      moderate: 2,
      high: 3,
    },
  };

  return new Promise<CumulativePrecipitation>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
