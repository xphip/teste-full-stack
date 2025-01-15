CREATE SCHEMA "postgres";
--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "postgres"."tasks" (
	"_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."tasks__id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"is_completed" boolean NOT NULL,
	"description" varchar(500),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "tasks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "postgres"."tokens" (
	"_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."tokens__id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "postgres"."users" (
	"_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."users__id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" varchar(256) NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"username" varchar(100) NOT NULL,
	"email" varchar(254) NOT NULL,
	"password" varchar(256) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "postgres"."tasks" ADD CONSTRAINT "tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "postgres"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postgres"."tasks" ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "postgres"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postgres"."tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "postgres"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postgres"."tokens" ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "postgres"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "tasks_id_idx" ON "postgres"."tasks" USING btree ("id");--> statement-breakpoint
CREATE INDEX "tasks_is_completed_idx" ON "postgres"."tasks" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "tokens_id_idx" ON "postgres"."tokens" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "tokens_token_idx" ON "postgres"."tokens" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "users_id_idx" ON "postgres"."users" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "postgres"."users" USING btree ("email");