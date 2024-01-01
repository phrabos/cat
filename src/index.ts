#!/usr/bin/env node

import { read, write, backup } from './utils';
import { validateInput } from './utils/validate';
import type { Commands } from './utils/validate';

const args = process.argv;
const inputCommand = args[2] as keyof Commands;
const inputFilePath = args[3];
const scriptPath = process.cwd();

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
    write(inputFilePath);
    break;
  case 'backup':
    console.log('command is backup');
    backup(inputFilePath);
    break;
}
