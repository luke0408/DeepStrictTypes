import commander from 'commander';
import * as inquirer from 'inquirer';

/**
 * A namespace for handling command-line argument parsing and interactive prompts.
 */
export namespace ArgumentParser {
  /**
   * A type representing an inquirer function that interacts with the user.
   *
   * @template T - The type of the options object to be returned.
   * @param command - The commander command instance.
   * @param prompt - Function to create a prompt module.
   * @param action - Function to execute the action.
   */
  export type Inquirer<T> = (
    command: commander.Command,
    prompt: (opt?: inquirer.SeparatorOptions) => inquirer.PromptModule,
    action: (closure: (options: Partial<T>) => Promise<T>) => Promise<T>,
  ) => Promise<T>;

  /**
   * Interface defining the structure of the prompt utility functions.
   */
  export interface Prompt {
    select: (name: string) => (message: string) => <Choice extends string>(choices: Choice[]) => Promise<Choice>;
    boolean: (name: string) => (message: string) => Promise<boolean>;
    number: (name: string) => (message: string, init?: number) => Promise<number>;
  }

  /**
   * Parses command-line arguments and interacts with the user using prompts.
   *
   * @template T - The type of the options object to be returned.
   * @param inquiry - A function that defines the interaction logic.
   * @returns A promise resolving to the options object of type T.
   */
  export const parse = async <T>(
    inquiry: (
      commad: commander.Command,
      prompt: Prompt,
      action: (closure: (options: Partial<T>) => Promise<T>) => Promise<T>,
    ) => Promise<T>,
  ): Promise<T> => {
    /**
     * Wraps the action logic in a promise to handle command execution.
     *
     * @param closure - A function that processes the options and returns a promise.
     * @returns A promise resolving to the options object of type T.
     */
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

    /**
     * Creates a select prompt for choosing from a list of options.
     *
     * @param name - The name of the prompt.
     * @param message - The message to display to the user.
     * @returns A function that takes choices and returns a promise resolving to the selected choice.
     */
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

    /**
     * Creates a boolean prompt for yes/no questions.
     *
     * @param name - The name of the prompt.
     * @returns A function that takes a message and returns a promise resolving to a boolean.
     */
    const boolean = (name: string) => async (message: string) =>
      (
        await inquirer.createPromptModule()({
          type: 'confirm',
          name,
          message,
        })
      )[name] as boolean;

    /**
     * Creates a number prompt for numeric input.
     *
     * @param name - The name of the prompt.
     * @returns A function that takes a message and an optional initial value, returning a promise resolving to a number.
     */
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
