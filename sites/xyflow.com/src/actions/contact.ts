'use server';

import { checkBotId } from 'botid/server';

export async function submitContact(formData: FormData) {
  // Check for bot using BotID
  const verification = await checkBotId();

  if (verification.isBot) {
    throw new Error('Access denied');
  }

  // Extract form data
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Prepare data for external endpoint
  const data = {
    email,
    message,
  };

  try {
    // Forward to the original contact form endpoint
    const response = await fetch(process.env.CONTACT_FORM_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw new Error('Failed to submit contact form');
  }
}
