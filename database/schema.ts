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
});

export const userCareer = pgTable("user_career", {
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  career_id: uuid("career_id")
    .notNull()
    .references(() => careers.id),
});

export const milestones = pgTable("milestones", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  resources: text("resources").notNull(),
});

export const careerMilestone = pgTable("career_milestone", {
  career_id: uuid("career_id")
    .notNull()
    .references(() => careers.id), // Add reference
  milestone_id: uuid("milestone_id")
    .notNull()
    .references(() => milestones.id), // Add reference
  step_order: integer("step_order").notNull(), // To track the order of milestones
});

export const userProgress = pgTable("user_progress", {
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  career_id: uuid("career_id")
    .notNull()
    .references(() => careers.id), // Add reference
  current_milestone: integer("current_milestone").notNull().default(0),
  completed_milestones: text("completed_milestones").notNull(), // Stored as JSON string
});

export const careerReviews = pgTable("career_reviews", {
  career_id: uuid("career_id")
    .notNull()
    .references(() => careers.id), // Add reference
  year: integer("year").notNull(),
  sentiment_score: real("sentiment_score").notNull(),
  num_reviews: integer("num_reviews").notNull(),
});

export const quizAnswers = pgTable("quiz_answers", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  answers: text("answers").notNull(),
});
