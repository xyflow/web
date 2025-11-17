export const MAILJET_PUBLIC_MAILING_LIST_ID = 105980;
export const MAILJET_PRO_MAILING_LIST_ID = 96936;
export const MAILJET_PUBLIC_NEWSLETTER_CONFIRM_TEMPLATE_ID = 4288745;
export const MAILJET_TEAM_INVITE_TEMPLATE_ID = 5364667;
export const MAILJET_WELCOME_MAIL_TEMPLATE_IDS = {
  starter: 4265635,
  pro: 4265536,
  enterprise: 5364987,
  default: 4265635,
};

export const IS_DEVELOPMENT = process.env.NHOST_SUBDOMAIN === 'local';
export const IS_PRODUCTION = process.env.NHOST_SUBDOMAIN !== 'local';
export const IS_STAGING = process.env.NHOST_SUBDOMAIN === 'yyjucnywolixyempramc';
