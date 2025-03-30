CREATE TABLE "career_reviews" (
	"career_id" uuid NOT NULL,
	"year" integer NOT NULL,
	"sentiment_score" real NOT NULL,
	"num_reviews" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "career_reviews" ADD CONSTRAINT "career_reviews_career_id_careers_id_fk" FOREIGN KEY ("career_id") REFERENCES "public"."careers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "careers" DROP COLUMN "sentiment_score";