CREATE SCHEMA "postgres";
--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "postgres"."tasks" (
	"_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."tasks__id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"id" integer NOT NULL,
	"title" varchar(256) NOT NULL,
	"is_completed" boolean NOT NULL,
	"description" varchar(500),
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "postgres"."tokens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postgres"."tokens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
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
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "postgres"."tasks" ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "postgres"."users"("_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postgres"."tokens" ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "postgres"."users"("_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "tasks_id_idx" ON "postgres"."tasks" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "tokens_token_idx" ON "postgres"."tokens" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "postgres"."users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "postgres"."users" USING btree ("username");