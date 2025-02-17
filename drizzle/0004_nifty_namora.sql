CREATE TABLE "user_progress" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"current_milestone" integer DEFAULT 0 NOT NULL,
	"completed_milestones" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;