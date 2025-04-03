import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  quizResults, type QuizResult, type InsertQuizResult
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private quizResults: Map<number, QuizResult>;
  private userCurrentId: number;
  private contactSubmissionCurrentId: number;
  private quizResultCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.quizResults = new Map();
    this.userCurrentId = 1;
    this.contactSubmissionCurrentId = 1;
    this.quizResultCurrentId = 1;
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
      submittedAt: new Date() 
    };
    this.quizResults.set(id, quizResult);
    return quizResult;
  }
  
  async getQuizResults(): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values());
  }
}

export const storage = new MemStorage();
