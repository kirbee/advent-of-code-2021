import { readInput } from '../utils.js';

const exampleInput = await readInput('./06/exampleInput.txt');
const givenInput = await readInput('./06/givenInput.txt');

const FRESH_FISH_TIMER = 8;
const RECOVERING_FISH_TIMER = 6;

class Lanternfish {
  constructor(timer) {
    this.timer = timer;
  }
}

class LanternfishSchool {
  constructor(fishies) {
    this.fishes = fishies;
  }

  decay = () => {
    let newFishiesCount = 0;
    this.fishes.forEach((fish) => {
      if (fish.timer === 0) {
        newFishiesCount++;
        fish.timer = RECOVERING_FISH_TIMER;
      } else {
        fish.timer--;
      }
    });
    for (let i = 0; i < newFishiesCount; i++) {
      this.fishes.push(new Lanternfish(FRESH_FISH_TIMER));
    }
  };

  countFishies = () => this.fishes.length;

  getTimers = () => this.fishes.map((fish) => fish.timer);
}

const partOneSolution = (input) => {
  const lanternfishes = input[0].split(',').map((timer) => new Lanternfish(parseInt(timer, 10)));
  const school = new LanternfishSchool(lanternfishes);
  for (let i = 0; i < 80; i++) {
    school.decay();
  }
  return school.countFishies();
};

class LanternfishSchoolEfficient {
  constructor(timers) {
    // Initialize array
    this.fishPerTimer = Array(FRESH_FISH_TIMER + 1).fill(0);
    timers.forEach((timer) => this.fishPerTimer[timer]++);
  }

  decay = () => {
    this.fishPerTimer = [...this.fishPerTimer].reduce((acc, fishCount, index) => {
      if (index === 0) {
        acc[RECOVERING_FISH_TIMER] = acc[RECOVERING_FISH_TIMER] + fishCount;
        acc[FRESH_FISH_TIMER] = fishCount;
      } else {
        acc[index - 1] = fishCount + acc[index - 1];
      }
      return acc;
    }, Array(FRESH_FISH_TIMER + 1).fill(0));
  };

  countFishies = () => this.fishPerTimer.reduce((acc, item) => acc + item, 0);
}

const partTwoSolution = (input) => {
  const timers = input[0].split(',').map((timer) => parseInt(timer, 10));
  const school = new LanternfishSchoolEfficient(timers);
  for (let i = 0; i < 256; i++) {
    school.decay();
  }
  return school.countFishies();
};

console.log('Part one solution:', partOneSolution(givenInput));
console.log('Part two solution:', partTwoSolution(givenInput));
