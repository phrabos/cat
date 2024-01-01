import * as fs from 'fs';
import * as readline from 'readline';
import { stdin, stdout } from 'process';

export const read = (filePath: string) => {
  try {
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
  } catch (error) {
    console.log(`Error during read -> ${error}`);
  }
};

export const write = (filePath: string) => {
  try {
    const writeStream = fs.createWriteStream(filePath);
    const rl = readline.createInterface({
      input: stdin,
      output: stdout,
    });
    rl.on('line', (line) => {
      console.log(line);
      if (line.trim() === 'exit') {
        writeStream.close();
      }
    });
    rl.on('close', () => {
      rl.close();
    });
    rl.on('error', (err) => {
      console.error(`Error writing file -> ${err}`);
    });
  } catch (error) {
    console.log(`Error during write -> ${error}`);
  }
};

export const backup = (filePath: string) => {
  try {
    const readStream = fs.createReadStream(filePath);
    const path = filePath.split('.').slice(0, -1).join('.');
    const extension = filePath.split('.').pop();
    const backupFilePath = `${path}-backup.${extension}`;
    const writeStream = fs.createWriteStream(backupFilePath);
    readStream.pipe(writeStream);
    writeStream.on('finish', () => {
      console.log(`
    The backup of ${filePath} was successful.
    The backup file name is ${backupFilePath}.
    `);
    });
  } catch (error) {
    console.log(`Error during backup -> ${error}`);
  }
};
