import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

import { howToUse } from '../howToUse';

export type Commands = {
  read: boolean;
  write: boolean;
};

type ValidateInputArg = {
  inputCommand: keyof Commands;
  scriptPath: string;
  inputFilePath: string;
  numArgs: number;
};

const commands: Commands = {
  read: true,
  write: true,
};

export const validateInput = ({ inputCommand, inputFilePath, scriptPath, numArgs }: ValidateInputArg): boolean => {
  if (numArgs > 4) {
    console.log('Too many arguements provided\n', howToUse);
    return false;
  }

  if (!commands[inputCommand]) {
    console.log('invalid input command\n', howToUse);
    return false;
  }

  if (typeof inputFilePath === 'undefined') {
    console.log('a filepath is required');
    return false;
  }

  const pathWithouFilename = scriptPath.split('/').slice(0, -2).join('/');
  const pathToValidate = path.join(pathWithouFilename, inputFilePath);
  const isValidPath = fs.existsSync(pathToValidate);
  if (!isValidPath) {
    console.log('invalid path to file', pathToValidate);
    return false;
  }

  return true;
};

export const read = (filePath: string) => {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });
  rl.on('line', (line) => {
    console.log(line);
  });
  rl.on('close', () => {
    rl.close();
  });
  rl.on('error', (err) => {
    console.error(`Error reading file -> ${err}`);
  });
};
