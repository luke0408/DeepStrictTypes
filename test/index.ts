import fs from 'fs';
import path from 'path';
import { ArgumentParser } from './helpers/ArgumentParser';
import { TestTreeLoader } from './helpers/TestTreeLoader';

interface IOptions {
  include?: string[];
  exclude?: string[];
}

const getOptions = () =>
  ArgumentParser.parse<IOptions>(async (command, prompt, action) => {
    command.option('--include <string...>', 'include feature files');
    command.option('--exclude <string...>', 'exclude feature files');

    prompt;

    return action(async (options) => {
      return options as IOptions;
    });
  });

async function main(): Promise<void> {
  const options: IOptions = await getOptions();
  const testSet = TestTreeLoader.load(__dirname, options);
  console.log(testSet);

  async function allTest() {
    /**
     * test code for types
     */
    const types = fs.readdirSync(path.join(__dirname, './types'));
    for await (const filename of types) {
      if (filename.endsWith('.js')) {
        const filePath = path.join(__dirname, 'types', filename);
        await import(filePath);
      }
    }

    /**
     * test code for functions
     */
    const functions = fs.readdirSync(path.join(__dirname, './functions'));
    for await (const filename of functions) {
      if (filename.endsWith('.js')) {
        const filePath = path.join(__dirname, 'functions', filename);
        await import(filePath);
      }
    }
  }
}

main().catch(console.error);
