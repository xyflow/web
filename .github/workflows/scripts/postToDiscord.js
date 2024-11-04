(async function removeThanks() {
  const content = `Hey [INSERT MENTION HERE],

**${process.env.FRAMEWORK} Flow ${process.env.VERSION}** is out!

${process.env.CLEAN_BODY}
  `;

  try {
    const response = await fetch(process.env.DISCORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'Github Release',
        content,
      }),
    });

    if (!response.ok) {
      console.debug('Response from Discord', response);
      throw new Error('Failed to post to Discord');
    }
  } catch (error) {
    console.error('Error posting to Discord', error);
  }
})();
