import * as TypeScript from "typescript";

export function run(
  checker: TypeScript.TypeChecker,
  node: TypeScript.TypeNode,
  name?: string
) {
  const type = checker.getTypeFromTypeNode(node);
  // TODO: Handle multiple call signatures by emitting a union type.
  const [callSignature] = type.getCallSignatures();
  const parameters = callSignature.getParameters();
  const returnType = checker.typeToString(callSignature.getReturnType());

  const fun = {
    kind: "function",
    parameters: parameters.map((parameter) => {
      const type = checker.typeToString(
        checker.getTypeOfSymbolAtLocation(parameter, node)
      );
      const name = parameter.getName();
      const flags = parameter.getFlags();
      const param = { name, type };

      return (flags & TypeScript.SymbolFlags.Optional) !== 0
        ? { ...param, optional: true }
        : param;
    }),
    returnType,
  };

  return name ? { name, ...fun } : fun;
}

export function test(
  checker: TypeScript.TypeChecker,
  node: TypeScript.TypeNode
) {
  return Boolean(checker.getTypeFromTypeNode(node).getCallSignatures().length);
}
