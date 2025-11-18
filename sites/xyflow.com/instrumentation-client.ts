import { initBotId } from 'botid/client/core';

// Define the paths that need bot protection
// These are paths that are routed to by your app
initBotId({
  protect: [
    {
      path: '/contact',
      method: 'POST',
    },
  ],
});

