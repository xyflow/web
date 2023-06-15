import React, { useEffect, useState } from 'react';
import { Alert, AlertIcon, Box, Flex, IconButton, Link, useBoolean } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useAuthenticated } from '@nhost/nextjs';
import { HiX } from 'components/Icons';

import { useIsSubscribed } from '../../context/subscription';

function Notification({ label, ...props }) {
  const [isHidden, setIsHidden] = useBoolean();

  if (isHidden) {
    return null;
  }

  return (
    <Alert {...props}>
      <AlertIcon />
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        {label}
        <IconButton variant="ghost" onClick={setIsHidden.on} size="sm" icon={<HiX />} />
      </Flex>
    </Alert>
  );
}

function useIsSubscribedDelay() {
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelay(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return delay;
}

export default function Notifications() {
  const router = useRouter();
  const isAuthenticated = useAuthenticated();
  const isSubscribed = useIsSubscribed();
  const isSubscribedDelay = useIsSubscribedDelay();

  const showNotSubscribedNotify = isAuthenticated && !isSubscribed && isSubscribedDelay;
  const showPaymentCancelledNotify = router.query.payment_cancelled;
  const showPaymentSuccessNotify = router.query.payment_success;
  const showNewsletterSuccessNotify = router.query.newsletter_signup_success;

  return (
    <Box>
      {showNotSubscribedNotify && (
        <Notification
          colorScheme="purple"
          label={
            <Box>
              You are currently not subscribed. To unlock all Pro features like the Pro examples, please subscribe{' '}
              <Link color="blue.500" fontWeight="bold">
                <NextLink href="/dashboard">here</NextLink>
              </Link>
              .
            </Box>
          }
        />
      )}
      {showPaymentCancelledNotify && <Notification status="warning" label="Your payment has been cancelled." />}
      {showPaymentSuccessNotify && (
        <Notification
          status="success"
          label={
            <Box>
              Thanks for your subscription! You might need to
              <Link
                color="blue.500"
                fontWeight="bold"
                mx={1}
                as="span"
                onClick={() => {
                  window.location.replace('/dashboard');
                }}
              >
                reload
              </Link>
              this page to activate your pro features.
            </Box>
          }
        />
      )}
      {showNewsletterSuccessNotify && (
        <Notification status="success" label={<Box>You have been added to our mailing list. Thank you!</Box>} />
      )}
    </Box>
  );
}
