import fetch from 'cross-fetch';

export async function sendDiscordNotification(message: string) {
  const response = await fetch(
    process.env.DISCORD_NOTIFICATIONS_WEBHOOK as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: message }),
    }
  );

  return response;
}
