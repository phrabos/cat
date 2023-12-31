#!/usr/bin/env node

import { validateInput, read } from './utils';
import type { Commands } from './utils';

// const readFilePath = path.join(__dirname, '../input.txt');
// const writeFilePath = path.join(__dirname, '../output.txt');

const args = process.argv;
const inputCommand = args[2] as keyof Commands;
const inputFilePath = args[3];
const scriptPath = args[1];

console.log('args ->', args);

const isInputValid = validateInput({
  inputCommand,
  inputFilePath,
  scriptPath,
  numArgs: args.length,
});

if (!isInputValid) {
  process.exit(1);
}

switch (inputCommand) {
  case 'read':
    console.log('command is read');
    read(inputFilePath);
    break;
  case 'write':
    console.log('command is write');
    break;
}

// const rl = readline.createInterface({
//   input: readStream,
//   output: writeStream,
// });

// rl.on('line', (line) => {
//   console.log('line ->', line);
// })
