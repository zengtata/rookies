import {
  integer,
  pgTable,
  real,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const careers = pgTable("careers", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  sentiment_score: real("sentiment_score").notNull(), // sentiment score between 0-100
});

export const userCareer = pgTable("user_career", {
  user_id: uuid("user_id").notNull().references(() => users.id),
  career_id: uuid("career_id").notNull().references(() => careers.id),
});

export const milestones = pgTable("milestones", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  resources: text("resources").notNull(),
});

// Career-Milestone table with step_order
export const careerMilestone = pgTable("career_milestone", {
  career_id: uuid("career_id").notNull().references(() => careers.id), // Add reference
  milestone_id: uuid("milestone_id").notNull().references(() => milestones.id), // Add reference
  step_order: integer("step_order").notNull(), // To track the order of milestones
});
