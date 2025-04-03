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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private quizResults: Map<number, QuizResult>;
  private clients: Map<number, Client>;
  private clientInteractions: Map<number, ClientInteraction>;
  private journeyStages: Map<number, JourneyStage>;
  private journeyProgress: Map<number, JourneyProgress>;
  private analyticsEvents: Map<number, AnalyticsEvent>;
  
  private userCurrentId: number;
  private contactSubmissionCurrentId: number;
  private quizResultCurrentId: number;
  private clientCurrentId: number;
  private clientInteractionCurrentId: number;
  private journeyStageCurrentId: number;
  private journeyProgressCurrentId: number;
  private analyticsEventCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.quizResults = new Map();
    this.clients = new Map();
    this.clientInteractions = new Map();
    this.journeyStages = new Map();
    this.journeyProgress = new Map();
    this.analyticsEvents = new Map();
    
    this.userCurrentId = 1;
    this.contactSubmissionCurrentId = 1;
    this.quizResultCurrentId = 1;
    this.clientCurrentId = 1;
    this.clientInteractionCurrentId = 1;
    this.journeyStageCurrentId = 1;
    this.journeyProgressCurrentId = 1;
    this.analyticsEventCurrentId = 1;
    
    // Initialize with default journey stages
    this.initDefaultJourneyStages();
  }
  
  private async initDefaultJourneyStages() {
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
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact submission methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionCurrentId++;
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      submittedAt: new Date() 
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
  
  // Quiz result methods
  async createQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const id = this.quizResultCurrentId++;
    const quizResult: QuizResult = { 
      ...result, 
      id, 
      email: result.email || null,
      submittedAt: new Date() 
    };
    this.quizResults.set(id, quizResult);
    return quizResult;
  }
  
  async getQuizResults(): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values());
  }
  
  // Client management methods
  async createClient(client: InsertClient): Promise<Client> {
    const id = this.clientCurrentId++;
    const now = new Date();
    const newClient: Client = {
      id,
      name: client.name,
      email: client.email,
      company: client.company,
      status: client.status || 'New',
      phone: client.phone || null,
      industry: client.industry || null,
      size: client.size || null,
      source: client.source || null,
      notes: client.notes || null,
      initialContactDate: now,
      lastContactDate: now,
      metaData: client.metaData || null
    };
    this.clients.set(id, newClient);
    return newClient;
  }
  
  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }
  
  async getClientByEmail(email: string): Promise<Client | undefined> {
    return Array.from(this.clients.values()).find(
      (client) => client.email === email
    );
  }
  
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }
  
  async updateClient(id: number, clientUpdate: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;
    
    const updatedClient: Client = {
      ...client,
      ...clientUpdate,
      id,
      lastContactDate: new Date()
    };
    
    this.clients.set(id, updatedClient);
    return updatedClient;
  }
  
  // Client interactions methods
  async createClientInteraction(interaction: InsertClientInteraction): Promise<ClientInteraction> {
    const id = this.clientInteractionCurrentId++;
    const newInteraction: ClientInteraction = {
      id,
      type: interaction.type,
      clientId: interaction.clientId,
      description: interaction.description,
      outcome: interaction.outcome || null,
      nextSteps: interaction.nextSteps || null,
      date: new Date(),
      metaData: interaction.metaData || null
    };
    this.clientInteractions.set(id, newInteraction);
    
    // Update the client's last contact date
    const client = this.clients.get(interaction.clientId);
    if (client) {
      client.lastContactDate = new Date(); // Direct update instead of using updateClient
      this.clients.set(client.id, client);
    }
    
    return newInteraction;
  }
  
  async getClientInteractions(clientId: number): Promise<ClientInteraction[]> {
    return Array.from(this.clientInteractions.values())
      .filter(interaction => interaction.clientId === clientId);
  }
  
  async getInteraction(id: number): Promise<ClientInteraction | undefined> {
    return this.clientInteractions.get(id);
  }
  
  // Journey stages methods
  async createJourneyStage(stage: InsertJourneyStage): Promise<JourneyStage> {
    const id = this.journeyStageCurrentId++;
    const newStage: JourneyStage = {
      id,
      name: stage.name,
      description: stage.description || null,
      order: stage.order,
      color: stage.color || '#4E89AE',
      isActive: stage.isActive !== undefined ? stage.isActive : true
    };
    this.journeyStages.set(id, newStage);
    return newStage;
  }
  
  async getJourneyStage(id: number): Promise<JourneyStage | undefined> {
    return this.journeyStages.get(id);
  }
  
  async getJourneyStages(): Promise<JourneyStage[]> {
    return Array.from(this.journeyStages.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async updateJourneyStage(id: number, stageUpdate: Partial<InsertJourneyStage>): Promise<JourneyStage | undefined> {
    const stage = this.journeyStages.get(id);
    if (!stage) return undefined;
    
    const updatedStage: JourneyStage = {
      ...stage,
      ...stageUpdate,
      id
    };
    
    this.journeyStages.set(id, updatedStage);
    return updatedStage;
  }
  
  // Journey progress methods
  async createJourneyProgress(progress: InsertJourneyProgress): Promise<JourneyProgress> {
    const id = this.journeyProgressCurrentId++;
    const newProgress: JourneyProgress = {
      id,
      clientId: progress.clientId,
      stageId: progress.stageId,
      startDate: progress.startDate || new Date(),
      completionDate: progress.completionDate || null,
      notes: progress.notes || null,
      isCompleted: progress.isCompleted !== undefined ? progress.isCompleted : false
    };
    this.journeyProgress.set(id, newProgress);
    return newProgress;
  }
  
  async getClientJourneyProgress(clientId: number): Promise<JourneyProgress[]> {
    return Array.from(this.journeyProgress.values())
      .filter(progress => progress.clientId === clientId);
  }
  
  async updateJourneyProgress(id: number, progressUpdate: Partial<InsertJourneyProgress>): Promise<JourneyProgress | undefined> {
    const progress = this.journeyProgress.get(id);
    if (!progress) return undefined;
    
    // If marking as completed and no completion date is provided, set it to now
    if (progressUpdate.isCompleted && !progressUpdate.completionDate) {
      progressUpdate.completionDate = new Date();
    }
    
    const updatedProgress: JourneyProgress = {
      ...progress,
      ...progressUpdate,
      id
    };
    
    this.journeyProgress.set(id, updatedProgress);
    return updatedProgress;
  }
  
  // Analytics events methods
  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const id = this.analyticsEventCurrentId++;
    const newEvent: AnalyticsEvent = {
      id,
      clientId: event.clientId || null,
      eventType: event.eventType,
      timestamp: new Date(),
      eventData: event.eventData || null,
      pageUrl: event.pageUrl || null,
      referrer: event.referrer || null,
      sessionId: event.sessionId || null,
      userAgent: event.userAgent || null,
      ipAddress: event.ipAddress || null
    };
    this.analyticsEvents.set(id, newEvent);
    return newEvent;
  }
  
  async getAnalyticsEvents(filters?: { clientId?: number, eventType?: string, startDate?: Date, endDate?: Date }): Promise<AnalyticsEvent[]> {
    let events = Array.from(this.analyticsEvents.values());
    
    if (filters) {
      if (filters.clientId !== undefined) {
        events = events.filter(event => event.clientId === filters.clientId);
      }
      
      if (filters.eventType !== undefined) {
        events = events.filter(event => event.eventType === filters.eventType);
      }
      
      if (filters.startDate !== undefined) {
        events = events.filter(event => event.timestamp >= filters.startDate!);
      }
      
      if (filters.endDate !== undefined) {
        events = events.filter(event => event.timestamp <= filters.endDate!);
      }
    }
    
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export const storage = new MemStorage();
