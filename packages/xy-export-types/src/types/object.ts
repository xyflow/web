import * as TypeScript from "typescript";

export function run(
  checker: TypeScript.TypeChecker,
  node: TypeScript.TypeNode,
  name?: string
) {
  const type = checker.getTypeFromTypeNode(node);
  const properties = type.getProperties();

  const obj = {
    kind: "object",
    properties: properties.map((property) => {
      const type = checker.typeToString(
        checker.getTypeOfSymbolAtLocation(property, node)
      );
      const name = property.getName();
      const flags = property.getFlags();
      const prop = { name, type };

      return (flags & TypeScript.SymbolFlags.Optional) !== 0
        ? { ...prop, optional: true }
        : prop;
    }),
  };

  return name ? { name, ...obj } : obj;
}

export function test(
  checker: TypeScript.TypeChecker,
  node: TypeScript.TypeNode
) {
  return Boolean(checker.getTypeFromTypeNode(node).getProperties().length);
}
