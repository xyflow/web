alter table "public"."team_subscriptions"
  add constraint "team_subscriptions_email_fkey"
  foreign key ("email")
  references "auth"."users"
  ("email") on update restrict on delete restrict;
