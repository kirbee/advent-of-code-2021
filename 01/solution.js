import { readInput } from '../utils.js';

const exampleInput = await readInput('01/exampleInput.txt', { parseNumber: true });
const givenInput = await readInput('01/givenInput.txt', { parseNumber: true });

const partOneSolution = () =>
  givenInput
    .map((num, index, arr) => (index === 0 ? 0 : num - arr[index - 1]))
    .filter((num) => num > 0).length;

const partTwoSolution = () =>
  givenInput
    .map((num, index, arr) => (index > arr.length - 3 ? 0 : num + arr[index + 1] + arr[index + 2]))
    .map((sum, index, arr) => sum - arr[index - 1])
    .filter((num) => num > 0).length;
// 1295 is too high
console.log('Part one solution:', partOneSolution());
console.log('Part two solution:', partTwoSolution());
