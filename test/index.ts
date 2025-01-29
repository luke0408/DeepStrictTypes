import fs from 'fs';
import path from 'path';
import { ArgumentParser } from './helpers/ArgumentParser';

interface IOptions {
  include?: string[];
  exclude?: string[];
}

const getOptions = () =>
  ArgumentParser.parse<IOptions>(async (command, prompt, action) => {
    command.option('--include <string...>', 'include feature files');
    command.option('--exculde <string...>', 'exclude feature files');

    prompt;

    return action(async (options) => {
      return options as IOptions;
    });
  });

async function main(): Promise<void> {
  const options: IOptions = await getOptions();

  console.log('Include: ', options.include);
  console.log('Exclude: ', options.exclude);

  /**
   * 0. include와 exclude 둘다 없는 경우
   *   => 전체 테스트 실행
   *
   * 1. include만 있는 경우
   *  1-1. include가 file명인 경우
   *    => 단일 테스트 파일 실행
   *  1-2. include가 package명인 경우
   *    => package 내부 test 전체 실행
   *
   * 2. exclude만 있는 경우
   *  2-1. exclude가 file명인 경우
   *    => 전체에서 해당 테스트 파일 제외 후 실행
   *  2-2. exclude가 package명인 경우
   *    => 전체에서 해당 패키지 제외 후 실행
   *
   * 3. 둘다 있는 경우
   *  3-1. include에 package가 있으며 exclude에 file이 있는 경우
   *    => include한 패키지에서 exclude file 제외 후 실행
   */
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
