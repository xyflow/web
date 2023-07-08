import * as TypeScript from "typescript";

import * as fun from "../types/function";
import * as union from "../types/union";
import * as obj from "../types/object";

export function run(
  checker: TypeScript.TypeChecker,
  node: TypeScript.TypeAliasDeclaration
) {
  if (union.test(checker, node.type)) {
    return union.run(checker, node.type, node.name.text);
  }

  if (fun.test(checker, node.type)) {
    return fun.run(checker, node.type, node.name.text);
  }

  if (obj.test(checker, node.type)) {
    return obj.run(checker, node.type, node.name.text);
  }
}
