import fs from 'fs';
import path from 'path';

export namespace TestFileLoader {
  export type FilterOption = { exclude?: string[]; include?: string[] };

  const filter = (files: string[], options: FilterOption): string[] => {
    return files.filter((file) => {
      if (options.include) return isIncluded();
      if (options.exclude) return !isExcluded();
      return true;

      function isExcluded() {
        return options.exclude?.some((exPath) => file.split(__dirname).at(0)?.includes(exPath));
      }

      function isIncluded() {
        return options.include?.some((incPath) => file.split(__dirname).at(0)?.includes(incPath));
      }
    });
  };

  const traverse = (dir: string, files: string[]) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (isIgnoredEntry(entry)) continue;

      const fullPath = path.join(dir, entry.name);

      if (isTestDirectory(entry)) {
        traverse(fullPath, files);
      } else if (isTestFile(entry)) {
        files.push(fullPath);
      }

      function isIgnoredEntry(entry: fs.Dirent): boolean {
        return entry.name.startsWith('.');
      }

      function isTestFile(entry: fs.Dirent): boolean {
        return entry.isFile() && entry.name.endsWith('.js') && !entry.parentPath.endsWith('test');
      }

      function isTestDirectory(entry: fs.Dirent): boolean {
        return entry.isDirectory() && entry.name !== 'helpers';
      }
    }
  };

  export const load = (dir: string, options: FilterOption): string[] => {
    const files: string[] = [];
    const currentDir = dir;
    traverse(currentDir, files);
    return filter(files, options);
  };
}
