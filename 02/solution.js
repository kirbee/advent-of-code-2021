import { readInput } from '../utils.js';

const exampleInput = await readInput('./02/exampleInput.txt');
const givenInput = await readInput('./02/givenInput.txt');

class Submarine {
  constructor(depth = 0, pos = 0, aim = 0) {
    this.depth = depth;
    this.pos = pos;
    this.aim = aim;
  }

  static parseInstruction = (instructionString) => {
    const [direction, value] = instructionString.split(' ');
    return { direction, value: parseInt(value, 10) };
  };

  handleInstruction = (instruction, hasAim) =>
    hasAim ? this.handleInstructionWithAim(instruction) : this.handleInstructionNoAim(instruction);

  handleInstructionNoAim = ({ direction, value }) => {
    switch (direction) {
      case 'up':
        // decrease depth
        this.depth -= value;
        break;
      case 'down':
        //increase depth
        this.depth += value;
        break;
      case 'forward':
        // increase position
        this.pos += value;
        break;
    }
  };

  handleInstructionWithAim = ({ direction, value }) => {
    switch (direction) {
      case 'up':
        // decrease aim
        this.aim -= value;
        break;
      case 'down':
        // increase aim
        this.aim += value;
        break;
      case 'forward':
        // increase horizontal position by X units.
        // it increases your depth by your aim multiplied by X.
        this.pos += value;
        this.depth += this.aim * value;
        break;
    }
  };

  getData = () => {
    return { depth: this.depth, pos: this.pos, aim: this.aim };
  };
}

const solveSubmarine = ({ hasAim = false } = {}) => {
  const submarinePosition = new Submarine();
  givenInput
    .map((input) => Submarine.parseInstruction(input))
    .forEach((instruction) => {
      submarinePosition.handleInstruction(instruction, hasAim);
    });
  const { depth, pos } = submarinePosition.getData();
  return depth * pos;
};

const partOneSolution = () => solveSubmarine();

const partTwoSolution = () => solveSubmarine({ hasAim: true });

console.log('Part one solution:', partOneSolution());
console.log('Part two solution:', partTwoSolution());
