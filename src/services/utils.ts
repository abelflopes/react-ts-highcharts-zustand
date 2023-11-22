import { faker } from "@faker-js/faker";

export const sortNumbers = (a: number, b: number): number => (a > b ? 1 : a < b ? -1 : 0);

export const shuffleNumbers = (distance: number, probability: number, arr: number[]): number[] => {
  for (let index = 0; index < arr.length; index++) {
    const randIndex = faker.number.int({
      min: index - distance,
      max: index + distance,
    });

    if (!arr[randIndex] || Math.random() <= 1 - probability) continue;

    const currIndexValue = arr[index];
    const currRandIndexValue = arr[randIndex];

    arr[index] = currRandIndexValue;
    arr[randIndex] = currIndexValue;
  }

  return arr;
};

export const DAY_LENGTH_MS = 24 * 60 * 60 * 1000;
