alter table "public"."team_subscriptions" add column "created_at" timestamptz
 not null default now();
