import React from 'react';
import { Button } from 'xy-ui';

export default function SubscriberSurvey() {
  return (
    <div className="bg-pink-50 text-react border-react p-5 border rounded-md flex justify-between items-center">
      <div>We want to learn more about how you{"'"}re using React Flow Pro.</div>
      <a href="https://ndmj05829wa.typeform.com/to/lWoYgbVK">
        <Button variant="react">Answer 3 questions for us</Button>
      </a>
    </div>
  );
}
