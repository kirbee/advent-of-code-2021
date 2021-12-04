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

const getBinaryGammaRate = (bitCounts) => {
  return Object.keys(bitCounts).reduce((acc, key) => {
    const current = bitCounts[key];
    const result = current[0] > current[1] ? '0' : '1';
    return `${acc}${result}`;
  }, '');
};

const getBinaryEpsilonRate = (bitCounts) => {
  return Object.keys(bitCounts).reduce((acc, key) => {
    const current = bitCounts[key];
    const result = current[0] < current[1] ? '0' : '1';
    return `${acc}${result}`;
  }, '');
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

const partOneSolution = (input) => {
  const bitCounts = getBitCounts(input);
  const gammaRate = getBinaryGammaRate(bitCounts);
  const epsilonRate = getBinaryEpsilonRate(bitCounts);
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

const hasCorrectValue = (expectedValue, item) => {};

const partTwoSolution = (input) => {
  const bitCounts = getBitCounts(input);
  const mostCommonBits = getMostCommon(bitCounts).split('');
  const conditions = mostCommonBits
    .map((neededValue, index) => {
      return input.filter((input) => input[index] === neededValue);
    })
    .reduce((acc, results) => {
      console.log(acc, results);
      if (acc.length === 1) {
        return acc[0];
      }
      const next = [];
      results.forEach((number) => {
        if (acc.includes(number)) {
          next.push(number);
        }
      });
      return next;
    });
  return conditions;
};

console.log('Part one solution:', partOneSolution(givenInput));
console.log('Part two solution:', partTwoSolution(exampleInput));
