import commander from 'commander';
import * as inquirer from 'inquirer';

export namespace ArgumentParser {
  export type Inquirer<T> = (
    command: commander.Command,
    prompt: (opt?: inquirer.SeparatorOptions) => inquirer.PromptModule,
    action: (closure: (options: Partial<T>) => Promise<T>) => Promise<T>,
  ) => Promise<T>;

  export interface Prompt {
    select: (name: string) => (message: string) => <Choice extends string>(choices: Choice[]) => Promise<Choice>;
    boolean: (name: string) => (message: string) => Promise<boolean>;
    number: (name: string) => (message: string, init?: number) => Promise<number>;
  }

  export const parse = async <T>(
    inquiry: (
      commad: commander.Command,
      prompt: Prompt,
      action: (closure: (options: Partial<T>) => Promise<T>) => Promise<T>,
    ) => Promise<T>,
  ): Promise<T> => {
    const action = (closure: (options: Partial<T>) => Promise<T>) =>
      new Promise<T>((resolve, reject) => {
        commander.program.action(async (options) => {
          try {
            resolve(await closure(options));
          } catch (exp) {
            reject(exp);
          }
        });
        commander.program.parseAsync().catch(reject);
      });

    const select =
      (name: string) =>
      (message: string) =>
      async <Choice extends string>(choices: Choice[]) =>
        (
          await inquirer.createPromptModule()({
            type: 'list',
            name,
            message,
            choices,
          })
        )[name];

    const boolean = (name: string) => async (message: string) =>
      (
        await inquirer.createPromptModule()({
          type: 'confirm',
          name,
          message,
        })
      )[name] as boolean;

    const number = (name: string) => async (message: string, init?: number) => {
      const value = Number(
        (
          await inquirer.createPromptModule()({
            type: 'number',
            name,
            message,
          })
        )[name],
      );
      return init !== undefined && isNaN(value) ? init : value;
    };

    const output: T | Error = await (async () => {
      try {
        return await inquiry(commander.program, { select, boolean, number }, action);
      } catch (error) {
        return error as Error;
      }
    })();

    if (output instanceof Error) throw output;
    return output;
  };
}
