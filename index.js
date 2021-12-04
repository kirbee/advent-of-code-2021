import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What day do you want to create? [01-24]`, (dateString) => {
  const date = parseInt(dateString, 10);
  if (date > 0 || date < 24) {
    createFiles(date < 10 ? `0${date}` : date);
  } else {
    throw new Error('Invalid date');
  }
  rl.close();
});

const template = (date) => `
import { readInput } from '../utils.js';

const exampleInput = await readInput('${date}/exampleInput.txt');
const givenInput = await readInput('${date}/givenInput.txt');

const partOneSolution = () => {
  // Do something
}

const partTwoSolution = () => {
  // Do something
}


console.log('Part one solution:', partOneSolution());
console.log('Part two solution:', partTwoSolution());`;

const fileErrorHandler = (err) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  } else {
    console.log('File written successfully\n');
  }
};

const createFiles = async (path) => {
  const folderName = `./${path}`;
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);

      fs.writeFile(`${folderName}/solution.js`, template(folderName), fileErrorHandler);
      ['exampleInput', 'givenInput'].forEach((item) =>
        fs.writeFile(`${folderName}/${item}.txt`, '', fileErrorHandler)
      );
    }
  } catch (err) {
    console.error(err);
  }
};
