import { ArgumentParser } from './helpers/ArgumentParser';
import { TestFileLoader } from './helpers/TestFileLoader';

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
  const testSet = TestFileLoader.load(__dirname, options);

  for await (const test of testSet) {
    await import(test);
  }
}

main().catch(console.error);
