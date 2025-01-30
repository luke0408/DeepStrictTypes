import fs from 'fs';
import path from 'path';

export namespace TestFileLoader {
  export type FilterOption = { exclude?: string[]; include?: string[] };

  const filter = (files: string[], options: FilterOption): string[] => {
    return files.filter((file) => {
      if (isIncluded()) return true;
      if (!isIncluded() && options.include) return false;
      if (options.exclude && options.exclude.some((exPath) => file.includes(exPath))) return false;

      function isIncluded() {
        return options.include && options.include.some((incPath) => file.includes(incPath));
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
        return entry.isFile() && entry.name.endsWith('.js') && entry.name !== 'index.js';
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
