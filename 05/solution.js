import { readInput } from '../utils.js';

const diagonalLineInput = await readInput('./05/diagonalLine.txt');
const exampleInput = await readInput('./05/exampleInput.txt');
const givenInput = await readInput('./05/givenInput.txt');

const parseInput = (input) => {
  // 0,9 -> 5,9
  return input
    .map((string) => string.split(' -> '))
    .map((coordinateArray) => {
      const parsed = coordinateArray.map((item) =>
        item.split(',').map((item) => parseInt(item, 10))
      );
      const [start, end] = parsed;
      return { start, end };
    });
};

const getKey = (x, y) => `${x},${y}`;

const getPointCount = (lineArray) => {
  const points = {};
  lineArray.forEach((lineEndpoints) => {
    const { start, end } = lineEndpoints;
    // Push all existing points into the object
    const [startX, startY] = start;
    const [endX, endY] = end;

    const isDiagonal = startX !== endX && startY !== endY;

    const addPoint = (x, y) => {
      const key = getKey(x, y);
      if (x === 0 && y === 0) {
        console.log(lineEndpoints);
      }
      points[key] ? (points[key] = points[key] + 1) : (points[key] = 1);
    };

    if (!isDiagonal) {
      // Make sure our for-loop makes sense
      const [x1, x2] = startX < endX ? [startX, endX] : [endX, startX];
      const [y1, y2] = startY < endY ? [startY, endY] : [endY, startY];
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          addPoint(x, y);
        }
      }
    } else {
      let x = startX;
      let y = startY;
      const isXIncreasing = startX < endX;
      const isYIncreasing = startY < endY;
      while (isXIncreasing ? x <= endX : x >= endX) {
        addPoint(x, y);
        isXIncreasing ? x++ : x--;
        isYIncreasing ? y++ : y--;
      }
    }
  });
  return points;
};

const removeDiagonals = (lines) =>
  lines.filter((lineEndpoints) => {
    const { start, end } = lineEndpoints;
    // Push all existing points into the array
    const [startX, startY] = start;
    const [endX, endY] = end;
    return startX === endX || startY === endY;
  });

const partOneSolution = (input) => {
  const lines = parseInput(input);
  const noDiagonalLines = removeDiagonals(lines);
  const pointCount = getPointCount(noDiagonalLines);
  const crosses = Object.values(pointCount).filter((numCrosses) => numCrosses > 1).length;
  return crosses;
};

const partTwoSolution = (input) => {
  const lines = parseInput(input);
  const pointCount = getPointCount(lines);
  const crosses = Object.values(pointCount).filter((numCrosses) => numCrosses > 1).length;
  return crosses;
};

console.log('Part one solution:', partOneSolution(givenInput));
console.log('Part two solution:', partTwoSolution(givenInput));
