CREATE TABLE "career_milestone" (
	"career_id" uuid NOT NULL,
	"milestone_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "careers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"sentiment_score" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "milestones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"resources" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_career" (
	"user_id" uuid NOT NULL,
	"career_id" uuid NOT NULL
);
