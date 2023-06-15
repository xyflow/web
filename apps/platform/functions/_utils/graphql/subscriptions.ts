export async function createStripeCustomer({ userEmail, userId }: { userEmail: string; userId: string }) {
  // @todo implement
  // this method creates a new customer in Stripe and returns its id
}

export async function getStripeCustomerId(userId: string) {
  // @todo implement
  // this method returns the Stripe customer id for the given user id
  // if the customer doesn't exist, it creates it first
}

export async function handleSubscriptionChange() {
  // @todo implement
}
