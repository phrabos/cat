#!/usr/bin/env node

import { validateInput, read } from './utils';
import type { Commands } from './utils';

const args = process.argv;
const inputCommand = args[2] as keyof Commands;
const inputFilePath = args[3];
const scriptPath = process.cwd();

console.log('args ->', args);
console.log('cwd ->', scriptPath);

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
