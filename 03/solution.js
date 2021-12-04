import { readInput } from '../utils.js';

const exampleInput = await readInput('././03/exampleInput.txt');
const givenInput = await readInput('././03/givenInput.txt');

const getBitCounts = (input) => {
  return input
    .map((digits) => digits.split(''))
    .reduce(
      (acc, splitBits) => {
        // we have an array of each input line, eg
        // ['0', '1', '1', '0', '0' ...]
        splitBits.forEach((bitVal, index) => {
          acc[index][bitVal] += 1;
        });
        return acc;
      },
      { ...Array.from(Array(input[0].length).keys()).map(() => ({ 0: 0, 1: 0 })) }
    );
};

const getMostCommon = (bitCounts) => {
  return Object.keys(bitCounts).reduce((acc, key) => {
    const current = bitCounts[key];
    const result = current[0] === current[1] ? '1' : current[0] > current[1] ? '0' : '1';
    return `${acc}${result}`;
  }, '');
};

const getLeastCommon = (bitCounts) => {
  return Object.keys(bitCounts).reduce((acc, key) => {
    const current = bitCounts[key];
    const result = current[0] === current[1] ? '0' : current[0] < current[1] ? '0' : '1';
    return `${acc}${result}`;
  }, '');
};

const bitSelection = (input, filterFunction) => {
  return Array.from(Array(input[0].length).keys()).reduce((acc, index) => {
    if (acc.length === 1) return acc;
    const bitCounts = getBitCounts(acc);
    const desiredBits = filterFunction(bitCounts);
    return acc.filter((item) => item[index] === desiredBits[index]);
  }, input)[0];
};

const partOneSolution = (input) => {
  const bitCounts = getBitCounts(input);
  const gammaRate = getMostCommon(bitCounts);
  const epsilonRate = getLeastCommon(bitCounts);
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

const partTwoSolution = (input) => {
  const o2Rating = bitSelection(input, getMostCommon);
  const co2Rating = bitSelection(input, getLeastCommon);

  return parseInt(o2Rating, 2) * parseInt(co2Rating, 2);
};

console.log('Part one solution:', partOneSolution(givenInput));
console.log('Part two solution:', partTwoSolution(givenInput));
