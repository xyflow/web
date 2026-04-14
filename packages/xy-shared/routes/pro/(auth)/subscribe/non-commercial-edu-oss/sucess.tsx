import { Button } from '../../../../../components/ui/button';
import { Heading } from '../../../../../components/ui/heading';

export function Success() {
  return (
    <div>
      <Heading size="sm" className="mb-4">
        You are signed up.
      </Heading>
      <Button onClick={() => (window.location.href = '/')}>Go to Dashboard</Button>
    </div>
  );
}
