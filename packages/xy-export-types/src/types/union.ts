import * as TypeScript from "typescript";

export function run(
  checker: TypeScript.TypeChecker,
  node: TypeScript.TypeNode,
  name?: string
) {
  const type = checker.getTypeFromTypeNode(node) as TypeScript.UnionType;
  const union = {
    kind: "union",
    variants: type.types.map((t) => checker.typeToString(t, node)),
  };

  return name ? { name, ...union } : union;
}

export function test(
  checker: TypeScript.TypeChecker,
  node: TypeScript.TypeNode
) {
  return checker.getTypeFromTypeNode(node).isUnion();
}
