import { careerReviews } from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import * as careerReviewData from "../career_reviews.json";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const seed = async () => {
    console.log("Seeding career reviews...");

    try {
        for (const data of careerReviewData) {
            const { career_id, year, sentiment_score, num_reviews } = data;

            await db.insert(careerReviews).values({
                career_id,
                year,
                sentiment_score,
                num_reviews,
            });
        }

        console.log("Career reviews seeded successfully!");
    } catch (error) {
        console.error("Error seeding career reviews:", error);
    }
};

seed();
