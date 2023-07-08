import * as TypeScript from "typescript";
import * as ExportAlias from "./exporters/alias";

// -----------------------------------------------------------------------------

function run(src: string) {
  const symbols = { types: [], functions: [] };
  const program = TypeScript.createProgram([src], {});

  // The TypeScript compiler API is woefully underdocumented. The best you get is
  // a wiki page with some examples, the rest is up to you to figure out. With that
  // in mind here are some things I've found that are useful to know exist:
  //
  // - checker.typeToString
  // - checker.getSymbolAtLocation
  // - checker.getSignatureFromDeclaration
  // - checker.getTypeOfSymbolAtLocation
  //
  const checker = program.getTypeChecker();

  function visit(node: TypeScript.Node) {
    const modifiers = TypeScript.getCombinedModifierFlags(
      node as TypeScript.Declaration
    );

    if ((modifiers & TypeScript.ModifierFlags.Export) === 0) return;

    if (TypeScript.isTypeAliasDeclaration(node)) {
      const type = ExportAlias.run(checker, node);

      if (type) symbols.types.push(type);
    }
  }

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      TypeScript.forEachChild(sourceFile, visit);
    }
  }

  console.dir(symbols, { depth: null });
}

// -----------------------------------------------------------------------------

const [src] = process.argv.slice(2);

if (src) {
  run(src);
}
