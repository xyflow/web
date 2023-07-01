SET check_function_bodies = false;
CREATE TABLE public.user_subscriptions (
    user_id uuid NOT NULL,
    stripe_customer_id text,
    subscription_plan_id text DEFAULT 'free'::text NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    sent_welcome_mail boolean DEFAULT false
);
ALTER TABLE ONLY public.user_subscriptions
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_subscriptions
    ADD CONSTRAINT customers_user_id_key UNIQUE (user_id);
ALTER TABLE ONLY public.user_subscriptions
    ADD CONSTRAINT user_subscriptions_id_key UNIQUE (id);
