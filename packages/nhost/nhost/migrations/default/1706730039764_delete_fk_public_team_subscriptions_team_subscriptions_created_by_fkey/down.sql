alter table "public"."team_subscriptions"
  add constraint "team_subscriptions_created_by_fkey"
  foreign key ("created_by")
  references "public"."user_subscriptions"
  ("user_id") on update restrict on delete restrict;
