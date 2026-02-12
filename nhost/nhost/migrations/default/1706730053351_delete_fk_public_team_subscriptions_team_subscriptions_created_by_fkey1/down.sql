alter table "public"."team_subscriptions"
  add constraint "team_subscriptions_created_by_fkey1"
  foreign key ("created_by")
  references "auth"."users"
  ("id") on update restrict on delete restrict;
