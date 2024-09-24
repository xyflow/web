import { UnstyledOpenInCodeSandboxButton } from '@codesandbox/sandpack-react';
import { Button } from '@xyflow/xy-ui';

export function OpenInCodesandbox() {
  return (
    <UnstyledOpenInCodeSandboxButton>
      <Button
        size="sm"
        className="font-medium text-[10px] h-6 bg-gray-100 hover:bg-gray-200 text-gray-700"
      >
        Open in Codesandbox
      </Button>
    </UnstyledOpenInCodeSandboxButton>
  );
}
