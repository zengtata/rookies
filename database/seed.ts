import {careerMilestone, careers, milestones} from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import * as careerMilestoneData from "../career_milestone.json";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const seed = async () => {
    console.log("Seeding career-milestone relations...");

    try {
        for (const data of careerMilestoneData) {
            const { career_id, milestone_id, step_order } = data;

            // Insert the relationship into the career_milestone table
            await db.insert(careerMilestone).values({
                career_id: career_id,
                milestone_id: milestone_id,
                step_order: step_order,
            });
        }

        console.log("Career-Milestone relations seeded successfully!");
    } catch (error) {
        console.error("Error seeding career-milestone relations:", error);
    }
};

seed();
