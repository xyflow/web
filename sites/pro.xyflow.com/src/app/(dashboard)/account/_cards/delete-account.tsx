import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Button } from '@xyflow/xy-ui';

export default function () {
  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Use this button to delete your account and all your data. This action is irreversible.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="bg-red-500 hover:bg-red-400">Delete Account</Button>
      </CardFooter>
    </Card>
  );
}
