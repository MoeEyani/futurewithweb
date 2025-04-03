import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keeping existing schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  message: true,
});

// Quiz results
export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  email: text("email"),
  score: integer("score").notNull(),
  q1: text("q1").notNull(),
  q2: text("q2").notNull(),
  q3: text("q3").notNull(),
  q4: text("q4").notNull(),
  q5: text("q5").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertQuizResultSchema = createInsertSchema(quizResults).pick({
  email: true,
  score: true,
  q1: true,
  q2: true,
  q3: true,
  q4: true,
  q5: true,
});

// Client analytics - to track client journey
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company").notNull(),
  phone: text("phone"),
  status: text("status").notNull().default("lead"), // lead, prospect, active, completed, churned
  industry: text("industry"),
  size: text("size"), // small, medium, large, enterprise
  source: text("source"), // website, referral, social, etc.
  notes: text("notes"),
  initialContactDate: timestamp("initial_contact_date").defaultNow().notNull(),
  lastContactDate: timestamp("last_contact_date").defaultNow().notNull(),
  metaData: jsonb("meta_data"),
});

export const insertClientSchema = createInsertSchema(clients).pick({
  name: true,
  email: true, 
  company: true,
  phone: true,
  status: true,
  industry: true,
  size: true,
  source: true,
  notes: true,
  metaData: true,
});

// Client interactions - to track touchpoints
export const clientInteractions = pgTable("client_interactions", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  type: text("type").notNull(), // email, call, meeting, proposal, contract, etc.
  description: text("description").notNull(),
  outcome: text("outcome"),
  date: timestamp("date").defaultNow().notNull(),
  nextSteps: text("next_steps"),
  metaData: jsonb("meta_data"),
});

export const insertClientInteractionSchema = createInsertSchema(clientInteractions).pick({
  clientId: true,
  type: true,
  description: true, 
  outcome: true,
  nextSteps: true,
  metaData: true,
});

// Client journey stages
export const journeyStages = pgTable("journey_stages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
  color: text("color").notNull().default("#4E89AE"),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertJourneyStageSchema = createInsertSchema(journeyStages).pick({
  name: true,
  description: true,
  order: true,
  color: true,
  isActive: true,
});

// Client journey progress
export const journeyProgress = pgTable("journey_progress", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  stageId: integer("stage_id").notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  completionDate: timestamp("completion_date"),
  isCompleted: boolean("is_completed").notNull().default(false),
  notes: text("notes"),
});

export const insertJourneyProgressSchema = createInsertSchema(journeyProgress).pick({
  clientId: true,
  stageId: true,
  startDate: true,
  completionDate: true,
  isCompleted: true,
  notes: true,
});

// Analytics events
export const analyticsEvents = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id"),
  eventType: text("event_type").notNull(),
  eventData: jsonb("event_data"),
  pageUrl: text("page_url"),
  referrer: text("referrer"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  sessionId: text("session_id"),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).pick({
  clientId: true,
  eventType: true,
  eventData: true,
  pageUrl: true,
  referrer: true,
  sessionId: true,
  userAgent: true,
  ipAddress: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

export type InsertClientInteraction = z.infer<typeof insertClientInteractionSchema>;
export type ClientInteraction = typeof clientInteractions.$inferSelect;

export type InsertJourneyStage = z.infer<typeof insertJourneyStageSchema>;
export type JourneyStage = typeof journeyStages.$inferSelect;

export type InsertJourneyProgress = z.infer<typeof insertJourneyProgressSchema>;
export type JourneyProgress = typeof journeyProgress.$inferSelect;

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
