import * as path from 'path';
import * as fs from 'fs';

import { howToUse } from '../howToUse';

type ValidateInputArg = {
  inputCommand: keyof Commands;
  scriptPath: string;
  inputFilePath: string;
  numArgs: number;
};

const commands: Commands = {
  read: true,
  write: true,
  backup: true,
};

export type Commands = {
  read: boolean;
  write: boolean;
  backup: boolean;
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

  const pathToValidate = path.join(scriptPath, inputFilePath);
  const isValidPath = fs.existsSync(pathToValidate);
  if (!isValidPath) {
    console.log('invalid path to file', pathToValidate);
    return false;
  }

  return true;
};
