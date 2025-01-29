import fs from 'fs';
import path from 'path';

export namespace TestTreeLoader {
  export type TestTree = { [dirname: string]: TestTree | string[] };

  const FILES_KEY = 'files';

  const isIgnoredEntry = (entry: fs.Dirent): boolean => {
    return entry.name.startsWith('.');
  };

  const isTestFile = (entry: fs.Dirent): boolean => {
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

  const traverse = (dir: string, currentTree: TestTree) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let hasContent = false;

    for (const entry of entries) {
      if (isIgnoredEntry(entry)) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);

      if (isTestDirectory(entry)) {
        const subtree: TestTree = {};
        traverse(fullPath, subtree);
        if (Object.keys(subtree).length > 0) {
          currentTree[entry.name] = subtree;
          hasContent = true;
        }
      } else if (isTestFile(entry)) {
        addFileToTree(currentTree, entry);
        hasContent = true;
      }
    }

    if (!hasContent) {
      delete currentTree[FILES_KEY];
    }
  };

  export const load = (): TestTree => {
    const tree: TestTree = {};
    const currentDir = __dirname;
    traverse(currentDir, tree);
    return tree;
  };
}
