import fs from 'fs';
import path from 'path';

async function main() {
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

main().catch(console.error);
