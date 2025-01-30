import fs from 'fs';
import path from 'path';

export namespace TestFileLoader {
  export type TestTree = { [dirname: string]: TestTree | string[] };
  export type FilterOption = { exclude?: string[]; include?: string[] };

  const FILES_KEY = 'files';

  const isIgnoredEntry = (entry: fs.Dirent): boolean => {
    return entry.name.startsWith('.');
  };

  const isTestFile = (dir: string, entry: fs.Dirent, options: FilterOption): boolean => {
    const fullPath = path.join(dir, entry.name)
    const isIncluded = options.include && options.include.some((incPath) => fullPath.includes(incPath)) && entry.name.endsWith('.js');
    if (isIncluded) return true;
    if (!isIncluded && options.include) return false;
    if (options.exclude && options.exclude.some((exPath) => fullPath.includes(exPath))) return false;
    return entry.isFile() && entry.name.endsWith('.js') && entry.name !== 'index.js';
  };

  const isTestDirectory = (entry: fs.Dirent): boolean => {
    return entry.isDirectory() && entry.name !== 'helpers';
  };

  const addFileToTree = (currentTree: TestTree, entry: fs.Dirent) => {
    if (!currentTree[FILES_KEY]) {
      currentTree[FILES_KEY] = [];
    }
    (currentTree[FILES_KEY] as string[]).push(entry.name);
  };

  const traverse = (dir: string, currentTree: TestTree, options: FilterOption) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let hasContent = false;

    for (const entry of entries) {
      if (isIgnoredEntry(entry)) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);

      if (isTestDirectory(entry)) {
        const subtree: TestTree = {};
        traverse(fullPath, subtree, options);
        if (Object.keys(subtree).length > 0) {
          currentTree[entry.name] = subtree;
          hasContent = true;
        }
      } else if (isTestFile(dir, entry, options)) {
        addFileToTree(currentTree, entry);
        hasContent = true;
      }
    }

    if (!hasContent) {
      delete currentTree[FILES_KEY];
    }
  };

  export const load = (dir: string, options: FilterOption): TestTree => {
    const tree: TestTree = {};
    const currentDir = dir;
    traverse(currentDir, tree, options);
    return tree;
  };
}
