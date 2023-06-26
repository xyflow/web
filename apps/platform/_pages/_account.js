import { Box, Button, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiOutlinePencilAlt } from 'components/Icons';
import { useUserData, useSignOut } from '@nhost/nextjs';

import authProtected from '../hocs/auth-protected';

import Layout from '../components/Layout';
import Card from '../components/Card';
import CardHeader from '../components/Card/CardHeader';
import CardItem from '../components/Card/CardItem';
import CustomerPortalButton from '../components/CustomerPortalButton';
import { useIsSubscribed } from '../context/subscription';
import useStripeCustomerPortal from '../hooks/useStripeCustomerPortal';

const EditButton = (props) => (
  <Button leftIcon={<HiOutlinePencilAlt size={16} />} colorScheme="gray" variant="outline" size="sm" {...props} />
);

function AccountPage() {
  const userData = useUserData();
  const { signOut } = useSignOut();
  const isSubscribed = useIsSubscribed();
  const { openPortal, isLoading } = useStripeCustomerPortal();

  if (!userData) {
    return null;
  }

  async function handleDeleteAccount() {
    // if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    //   const { res, error } = await nhost.functions.call('/delete-user');
    //   console.log(res.data);
    //   if (res && res.data && res.data.success) {
    //     signOut();
    //   }
    // }
  }

  return (
    <Layout type="app" title="Your Account">
      <Stack maxWidth={800} spacing={6}>
        <Card>
          <CardHeader title="Edit Account Information" />
          <Box>
            <CardItem
              label="Email"
              value={userData.email}
              actionItem={
                <NextLink href="/change-email">
                  <EditButton variant="outline">change email</EditButton>
                </NextLink>
              }
            />
            <CardItem
              label="Password"
              actionItem={
                <NextLink href="/change-password">
                  <EditButton variant="outline">change password</EditButton>
                </NextLink>
              }
            />
          </Box>
        </Card>

        <Card>
          <CardHeader
            title="Billing & Subscription"
            action={
              <Button onClick={openPortal} isLoading={isLoading} size="sm" variant="outline">
                Subscription Portal
              </Button>
            }
          />
        </Card>

        <Card>
          <CardHeader
            title="Logout"
            action={
              <Button onClick={signOut} size="sm" variant="outline" colorScheme="red">
                Logout
              </Button>
            }
          />
        </Card>

        <Card>
          <CardHeader title="Danger Zone" />
          <Box>
            <CardItem
              label="Delete Account"
              value={
                isSubscribed ? (
                  <Box mr={2} fontWeight="normal">
                    You are currently subscribed. Before you can delete your account, you need to cancel your
                    subscription in the
                    <CustomerPortalButton ml={2} size="xs">
                      Subscription Portal
                    </CustomerPortalButton>
                  </Box>
                ) : null
              }
              actionItem={
                <EditButton disabled={isSubscribed} onClick={handleDeleteAccount} leftIcon={null} colorScheme="red">
                  Delete Account
                </EditButton>
              }
            />
          </Box>
        </Card>
      </Stack>
    </Layout>
  );
}

export default authProtected(AccountPage);
