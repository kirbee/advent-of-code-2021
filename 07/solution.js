import { readInput } from '../utils.js';

const exampleInput = await readInput('./07/exampleInput.txt');
const givenInput = await readInput('./07/givenInput.txt');

const partOneSolution = (input) => {
  const crabs = input[0].split(',').map((crabPosString) => parseInt(crabPosString, 10));
  const sorted = crabs.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const low = sorted[0];
  const high = sorted[crabs.length - 1];

  const distances = {};
  for (let i = low; i < high; i++) {
    distances[i] = crabs.reduce((acc, crab) => Math.abs(crab - i) + acc, 0);
  }
  const [positionToMoveTo, gasRequired] = Object.keys(distances).reduce(
    (acc, thisTotalDistance, index) => {
      const [position, totalDistance] = acc;
      if (distances[index] < totalDistance) {
        return [low + index, distances[index]];
      }
      return acc;
    },
    [null, Infinity]
  );
  return gasRequired;
};

const calculateFuelCost = (positionDifference) => {
  let total = 0;
  for (let i = 1; i <= positionDifference; i++) {
    total += i;
  }
  return total;
};

const partTwoSolution = (input) => {
  const crabs = input[0].split(',').map((crabPosString) => parseInt(crabPosString, 10));
  const sorted = crabs.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const low = sorted[0];
  const high = sorted[crabs.length - 1];

  const distances = {};
  for (let i = low; i < high; i++) {
    distances[i] = crabs.reduce((acc, crab) => calculateFuelCost(Math.abs(crab - i)) + acc, 0);
  }
  const [positionToMoveTo, gasRequired] = Object.keys(distances).reduce(
    (acc, thisTotalDistance, index) => {
      const [position, totalDistance] = acc;
      if (distances[index] < totalDistance) {
        return [low + index, distances[index]];
      }
      return acc;
    },
    [null, Infinity]
  );
  return gasRequired;
};

console.log('Part one solution:', partOneSolution(givenInput));
console.log('Part two solution:', partTwoSolution(givenInput));
