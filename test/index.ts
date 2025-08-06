import { DynamicExecutor } from '@nestia/e2e';
import { ArgumentParser } from './helpers/ArgumentParser';

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

  const simultaneous = 10 as const;
  const report: DynamicExecutor.IReport = await DynamicExecutor.validate({
    prefix: 'test',
    location: __dirname + '/features',
    parameters: () => {
      return [];
    },
    filter: (func) => {
      return (
        (!options.include?.length || (options.include ?? []).some((str) => func.includes(str))) &&
        (!options.exclude?.length || (options.exclude ?? []).every((str) => !func.includes(str)))
      );
    },
    onComplete: (exec) => {
      const trace = (str: string) => console.log(`  - ${exec.name}: ${str}`);
      if (exec.error === null) {
        const elapsed: number = new Date(exec.completed_at).getTime() - new Date(exec.started_at).getTime();
        trace(`${elapsed.toLocaleString()} ms`);
      } else trace(exec.error.name);
    },
    simultaneous,
  });

  const failures: DynamicExecutor.IExecution[] = report.executions.filter((exec) => exec.error !== null);
  console.log(
    [
      `All: #${report.executions.length}`,
      `Success: #${report.executions.length - failures.length}`,
      `Failed: #${failures.length}`,
    ].join('\n'),
  );
}

main().catch(console.error);
