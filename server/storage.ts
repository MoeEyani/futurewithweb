import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  quizResults, type QuizResult, type InsertQuizResult,
  clients, type Client, type InsertClient,
  clientInteractions, type ClientInteraction, type InsertClientInteraction,
  journeyStages, type JourneyStage, type InsertJourneyStage,
  journeyProgress, type JourneyProgress, type InsertJourneyProgress,
  analyticsEvents, type AnalyticsEvent, type InsertAnalyticsEvent
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact Form Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Quiz Results
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(): Promise<QuizResult[]>;
  
  // Client Management
  createClient(client: InsertClient): Promise<Client>;
  getClient(id: number): Promise<Client | undefined>;
  getClientByEmail(email: string): Promise<Client | undefined>;
  getClients(): Promise<Client[]>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  
  // Client Interactions
  createClientInteraction(interaction: InsertClientInteraction): Promise<ClientInteraction>;
  getClientInteractions(clientId: number): Promise<ClientInteraction[]>;
  getInteraction(id: number): Promise<ClientInteraction | undefined>;
  
  // Journey Stages
  createJourneyStage(stage: InsertJourneyStage): Promise<JourneyStage>;
  getJourneyStage(id: number): Promise<JourneyStage | undefined>;
  getJourneyStages(): Promise<JourneyStage[]>;
  updateJourneyStage(id: number, stage: Partial<InsertJourneyStage>): Promise<JourneyStage | undefined>;
  
  // Journey Progress
  createJourneyProgress(progress: InsertJourneyProgress): Promise<JourneyProgress>;
  getClientJourneyProgress(clientId: number): Promise<JourneyProgress[]>;
  updateJourneyProgress(id: number, progress: Partial<InsertJourneyProgress>): Promise<JourneyProgress | undefined>;
  
  // Analytics Events
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(filters?: { clientId?: number, eventType?: string, startDate?: Date, endDate?: Date }): Promise<AnalyticsEvent[]>;
}

import { db } from "./db";
import { eq, and, gte, lte, desc } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize with default journey stages if needed
    this.initDefaultJourneyStages();
  }
  
  private async initDefaultJourneyStages() {
    // Check if journey stages already exist
    const existingStages = await db.select().from(journeyStages);
    if (existingStages.length > 0) {
      return; // Stages already exist
    }
    
    const defaultStages = [
      { name: 'Initial Contact', description: 'First interaction with the client', order: 1, color: '#4E89AE', isActive: true },
      { name: 'Needs Assessment', description: 'Evaluating client requirements', order: 2, color: '#43658B', isActive: true },
      { name: 'Proposal', description: 'Offering solutions and services', order: 3, color: '#2E4756', isActive: true },
      { name: 'Negotiation', description: 'Finalizing terms and contracts', order: 4, color: '#FF5722', isActive: true },
      { name: 'Active Project', description: 'Implementation of services', order: 5, color: '#4CAF50', isActive: true },
      { name: 'Review & Feedback', description: 'Evaluation of delivered services', order: 6, color: '#9C27B0', isActive: true },
      { name: 'Completed', description: 'Project successfully delivered', order: 7, color: '#2196F3', isActive: true }
    ];
    
    for (const stage of defaultStages) {
      await this.createJourneyStage(stage);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Contact submission methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contactSubmission] = await db
      .insert(contactSubmissions)
      .values({
        ...submission,
        submittedAt: new Date()
      })
      .returning();
    return contactSubmission;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }
  
  // Quiz result methods
  async createQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const [quizResult] = await db
      .insert(quizResults)
      .values({
        ...result,
        submittedAt: new Date()
      })
      .returning();
    return quizResult;
  }
  
  async getQuizResults(): Promise<QuizResult[]> {
    return await db.select().from(quizResults);
  }
  
  // Client management methods
  async createClient(client: InsertClient): Promise<Client> {
    const now = new Date();
    const [newClient] = await db
      .insert(clients)
      .values({
        ...client,
        status: client.status || 'new',
        initialContactDate: now,
        lastContactDate: now
      })
      .returning();
    return newClient;
  }
  
  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }
  
  async getClientByEmail(email: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.email, email));
    return client || undefined;
  }
  
  async getClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }
  
  async updateClient(id: number, clientUpdate: Partial<InsertClient>): Promise<Client | undefined> {
    const [updatedClient] = await db
      .update(clients)
      .set({
        ...clientUpdate,
        lastContactDate: new Date()
      })
      .where(eq(clients.id, id))
      .returning();
    return updatedClient || undefined;
  }
  
  // Client interactions methods
  async createClientInteraction(interaction: InsertClientInteraction): Promise<ClientInteraction> {
    const [newInteraction] = await db
      .insert(clientInteractions)
      .values({
        ...interaction,
        date: new Date()
      })
      .returning();
    
    // Update the client's last contact date
    await db
      .update(clients)
      .set({ lastContactDate: new Date() })
      .where(eq(clients.id, interaction.clientId));
    
    return newInteraction;
  }
  
  async getClientInteractions(clientId: number): Promise<ClientInteraction[]> {
    return await db
      .select()
      .from(clientInteractions)
      .where(eq(clientInteractions.clientId, clientId));
  }
  
  async getInteraction(id: number): Promise<ClientInteraction | undefined> {
    const [interaction] = await db
      .select()
      .from(clientInteractions)
      .where(eq(clientInteractions.id, id));
    return interaction || undefined;
  }
  
  // Journey stages methods
  async createJourneyStage(stage: InsertJourneyStage): Promise<JourneyStage> {
    const [newStage] = await db
      .insert(journeyStages)
      .values({
        name: stage.name,
        description: stage.description || null,
        order: stage.order,
        color: stage.color || '#4E89AE',
        isActive: stage.isActive !== undefined ? stage.isActive : true
      })
      .returning();
    return newStage;
  }
  
  async getJourneyStage(id: number): Promise<JourneyStage | undefined> {
    const [stage] = await db
      .select()
      .from(journeyStages)
      .where(eq(journeyStages.id, id));
    return stage || undefined;
  }
  
  async getJourneyStages(): Promise<JourneyStage[]> {
    return await db
      .select()
      .from(journeyStages)
      .orderBy(journeyStages.order);
  }
  
  async updateJourneyStage(id: number, stageUpdate: Partial<InsertJourneyStage>): Promise<JourneyStage | undefined> {
    const [updatedStage] = await db
      .update(journeyStages)
      .set(stageUpdate)
      .where(eq(journeyStages.id, id))
      .returning();
    return updatedStage || undefined;
  }
  
  // Journey progress methods
  async createJourneyProgress(progress: InsertJourneyProgress): Promise<JourneyProgress> {
    const [newProgress] = await db
      .insert(journeyProgress)
      .values({
        ...progress,
        startDate: progress.startDate || new Date(),
        isCompleted: progress.isCompleted !== undefined ? progress.isCompleted : false
      })
      .returning();
    return newProgress;
  }
  
  async getClientJourneyProgress(clientId: number): Promise<JourneyProgress[]> {
    return await db
      .select()
      .from(journeyProgress)
      .where(eq(journeyProgress.clientId, clientId));
  }
  
  async updateJourneyProgress(id: number, progressUpdate: Partial<InsertJourneyProgress>): Promise<JourneyProgress | undefined> {
    // If marking as completed and no completion date is provided, set it to now
    if (progressUpdate.isCompleted && !progressUpdate.completionDate) {
      progressUpdate.completionDate = new Date();
    }
    
    const [updatedProgress] = await db
      .update(journeyProgress)
      .set(progressUpdate)
      .where(eq(journeyProgress.id, id))
      .returning();
    return updatedProgress || undefined;
  }
  
  // Analytics events methods
  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [newEvent] = await db
      .insert(analyticsEvents)
      .values({
        ...event,
        timestamp: new Date()
      })
      .returning();
    return newEvent;
  }
  
  async getAnalyticsEvents(filters?: { clientId?: number, eventType?: string, startDate?: Date, endDate?: Date }): Promise<AnalyticsEvent[]> {
    let whereConditions = {};
    
    if (filters) {
      if (filters.clientId !== undefined) {
        whereConditions = { ...whereConditions, clientId: filters.clientId };
      }
      
      if (filters.eventType !== undefined) {
        whereConditions = { ...whereConditions, eventType: filters.eventType };
      }
    }
    
    // First get basic filtering done
    let events = await db.select().from(analyticsEvents).where(whereConditions);
    
    // Then apply date filtering if needed
    if (filters) {
      if (filters.startDate !== undefined) {
        events = events.filter(event => event.timestamp >= filters.startDate!);
      }
      
      if (filters.endDate !== undefined) {
        events = events.filter(event => event.timestamp <= filters.endDate!);
      }
    }
    
    // Sort by timestamp descending
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export const storage = new DatabaseStorage();
