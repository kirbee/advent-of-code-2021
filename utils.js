import fs from 'fs';
import readline from 'readline';

export async function readInput(path, options = { parseNumber: false }) {
  const { parseNumber } = options;
  const result = [];
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    result.push(line);
  }
  return parseNumber ? result.map((r) => parseInt(r, 10)) : result;
}
