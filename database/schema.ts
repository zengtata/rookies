import {
  date,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
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
  user_id: uuid("user_id").notNull(),
  career_id: uuid("career_id").notNull(),
});

export const milestones = pgTable("milestones", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  resources: text("resources").notNull(),
});

export const careerMilestone = pgTable("career_milestone", {
  career_id: uuid("career_id").notNull(),
  milestone_id: uuid("milestone_id").notNull(),
});
