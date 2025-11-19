import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_APIKEY_PUBLIC,
  apiSecret: process.env.MAILJET_APIKEY_PRIVATE,
});

export async function subscribeMailingList(email: string, listId: number, properties = {}) {
  if (!email || !listId) {
    return false;
  }

  try {
    const response = await mailjet.post('contactslist', { version: 'v3' }).id(listId).action('managecontact').request({
      Email: email,
      Action: 'addforce',
      Properties: properties,
    });

    return response.response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function unsubscribeMailingList(email: string, listId: number) {
  if (!email || !listId) {
    return false;
  }
  try {
    const response = await mailjet.post('contactslist', { version: 'v3' }).id(listId).action('managecontact').request({
      Email: email,
      Action: 'unsub',
    });

    return response.response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function sendMailTemplate(email: string, subject: string, templateId: number, variables = {}) {
  if (!email || !subject || !templateId) {
    return false;
  }

  try {
    const response = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'noreply@reactflow.dev',
            Name: 'React Flow',
          },
          To: [
            {
              Email: email,
            },
          ],
          TemplateID: templateId,
          TemplateLanguage: true,
          Subject: subject,
          Variables: variables,
        },
      ],
    });

    return response.response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function sendMail({
  to,
  subject,
  content,
  replyTo,
  attachments = undefined,
}: {
  to: string;
  subject: string;
  content: string;
  replyTo: string;
  attachments?: { ContentType: string; Filename: string; Base64Content: string }[];
}) {
  if (!to || !subject || !content || !replyTo) {
    return false;
  }

  try {
    const response = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'noreply@reactflow.dev',
            Name: 'React Flow',
          },
          To: [
            {
              Email: to,
            },
          ],
          ReplyTo: {
            Email: replyTo,
          },
          Subject: subject,
          TextPart: content,
          Attachments: attachments,
        },
      ],
    });

    return response.response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
}
