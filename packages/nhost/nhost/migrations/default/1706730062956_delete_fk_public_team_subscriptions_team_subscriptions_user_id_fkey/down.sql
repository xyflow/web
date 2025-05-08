alter table "public"."team_subscriptions"
  add constraint "team_subscriptions_user_id_fkey"
  foreign key ("user_id")
  references "auth"."users"
  ("id") on update restrict on delete restrict;
