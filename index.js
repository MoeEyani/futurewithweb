// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  contactSubmissions;
  quizResults;
  clients;
  clientInteractions;
  journeyStages;
  journeyProgress;
  analyticsEvents;
  userCurrentId;
  contactSubmissionCurrentId;
  quizResultCurrentId;
  clientCurrentId;
  clientInteractionCurrentId;
  journeyStageCurrentId;
  journeyProgressCurrentId;
  analyticsEventCurrentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.quizResults = /* @__PURE__ */ new Map();
    this.clients = /* @__PURE__ */ new Map();
    this.clientInteractions = /* @__PURE__ */ new Map();
    this.journeyStages = /* @__PURE__ */ new Map();
    this.journeyProgress = /* @__PURE__ */ new Map();
    this.analyticsEvents = /* @__PURE__ */ new Map();
    this.userCurrentId = 1;
    this.contactSubmissionCurrentId = 1;
    this.quizResultCurrentId = 1;
    this.clientCurrentId = 1;
    this.clientInteractionCurrentId = 1;
    this.journeyStageCurrentId = 1;
    this.journeyProgressCurrentId = 1;
    this.analyticsEventCurrentId = 1;
    this.initDefaultJourneyStages();
  }
  async initDefaultJourneyStages() {
    const defaultStages = [
      { name: "Initial Contact", description: "First interaction with the client", order: 1, color: "#4E89AE", isActive: true },
      { name: "Needs Assessment", description: "Evaluating client requirements", order: 2, color: "#43658B", isActive: true },
      { name: "Proposal", description: "Offering solutions and services", order: 3, color: "#2E4756", isActive: true },
      { name: "Negotiation", description: "Finalizing terms and contracts", order: 4, color: "#FF5722", isActive: true },
      { name: "Active Project", description: "Implementation of services", order: 5, color: "#4CAF50", isActive: true },
      { name: "Review & Feedback", description: "Evaluation of delivered services", order: 6, color: "#9C27B0", isActive: true },
      { name: "Completed", description: "Project successfully delivered", order: 7, color: "#2196F3", isActive: true }
    ];
    for (const stage of defaultStages) {
      await this.createJourneyStage(stage);
    }
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Contact submission methods
  async createContactSubmission(submission) {
    const id = this.contactSubmissionCurrentId++;
    const contactSubmission = {
      ...submission,
      id,
      submittedAt: /* @__PURE__ */ new Date()
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values());
  }
  // Quiz result methods
  async createQuizResult(result) {
    const id = this.quizResultCurrentId++;
    const quizResult = {
      ...result,
      id,
      email: result.email || null,
      submittedAt: /* @__PURE__ */ new Date()
    };
    this.quizResults.set(id, quizResult);
    return quizResult;
  }
  async getQuizResults() {
    return Array.from(this.quizResults.values());
  }
  // Client management methods
  async createClient(client) {
    const id = this.clientCurrentId++;
    const now = /* @__PURE__ */ new Date();
    const newClient = {
      id,
      name: client.name,
      email: client.email,
      company: client.company,
      status: client.status || "New",
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
  async getClient(id) {
    return this.clients.get(id);
  }
  async getClientByEmail(email) {
    return Array.from(this.clients.values()).find(
      (client) => client.email === email
    );
  }
  async getClients() {
    return Array.from(this.clients.values());
  }
  async updateClient(id, clientUpdate) {
    const client = this.clients.get(id);
    if (!client) return void 0;
    const updatedClient = {
      ...client,
      ...clientUpdate,
      id,
      lastContactDate: /* @__PURE__ */ new Date()
    };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }
  // Client interactions methods
  async createClientInteraction(interaction) {
    const id = this.clientInteractionCurrentId++;
    const newInteraction = {
      id,
      type: interaction.type,
      clientId: interaction.clientId,
      description: interaction.description,
      outcome: interaction.outcome || null,
      nextSteps: interaction.nextSteps || null,
      date: /* @__PURE__ */ new Date(),
      metaData: interaction.metaData || null
    };
    this.clientInteractions.set(id, newInteraction);
    const client = this.clients.get(interaction.clientId);
    if (client) {
      client.lastContactDate = /* @__PURE__ */ new Date();
      this.clients.set(client.id, client);
    }
    return newInteraction;
  }
  async getClientInteractions(clientId) {
    return Array.from(this.clientInteractions.values()).filter((interaction) => interaction.clientId === clientId);
  }
  async getInteraction(id) {
    return this.clientInteractions.get(id);
  }
  // Journey stages methods
  async createJourneyStage(stage) {
    const id = this.journeyStageCurrentId++;
    const newStage = {
      id,
      name: stage.name,
      description: stage.description || null,
      order: stage.order,
      color: stage.color || "#4E89AE",
      isActive: stage.isActive !== void 0 ? stage.isActive : true
    };
    this.journeyStages.set(id, newStage);
    return newStage;
  }
  async getJourneyStage(id) {
    return this.journeyStages.get(id);
  }
  async getJourneyStages() {
    return Array.from(this.journeyStages.values()).sort((a, b) => a.order - b.order);
  }
  async updateJourneyStage(id, stageUpdate) {
    const stage = this.journeyStages.get(id);
    if (!stage) return void 0;
    const updatedStage = {
      ...stage,
      ...stageUpdate,
      id
    };
    this.journeyStages.set(id, updatedStage);
    return updatedStage;
  }
  // Journey progress methods
  async createJourneyProgress(progress) {
    const id = this.journeyProgressCurrentId++;
    const newProgress = {
      id,
      clientId: progress.clientId,
      stageId: progress.stageId,
      startDate: progress.startDate || /* @__PURE__ */ new Date(),
      completionDate: progress.completionDate || null,
      notes: progress.notes || null,
      isCompleted: progress.isCompleted !== void 0 ? progress.isCompleted : false
    };
    this.journeyProgress.set(id, newProgress);
    return newProgress;
  }
  async getClientJourneyProgress(clientId) {
    return Array.from(this.journeyProgress.values()).filter((progress) => progress.clientId === clientId);
  }
  async updateJourneyProgress(id, progressUpdate) {
    const progress = this.journeyProgress.get(id);
    if (!progress) return void 0;
    if (progressUpdate.isCompleted && !progressUpdate.completionDate) {
      progressUpdate.completionDate = /* @__PURE__ */ new Date();
    }
    const updatedProgress = {
      ...progress,
      ...progressUpdate,
      id
    };
    this.journeyProgress.set(id, updatedProgress);
    return updatedProgress;
  }
  // Analytics events methods
  async createAnalyticsEvent(event) {
    const id = this.analyticsEventCurrentId++;
    const newEvent = {
      id,
      clientId: event.clientId || null,
      eventType: event.eventType,
      timestamp: /* @__PURE__ */ new Date(),
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
  async getAnalyticsEvents(filters) {
    let events = Array.from(this.analyticsEvents.values());
    if (filters) {
      if (filters.clientId !== void 0) {
        events = events.filter((event) => event.clientId === filters.clientId);
      }
      if (filters.eventType !== void 0) {
        events = events.filter((event) => event.eventType === filters.eventType);
      }
      if (filters.startDate !== void 0) {
        events = events.filter((event) => event.timestamp >= filters.startDate);
      }
      if (filters.endDate !== void 0) {
        events = events.filter((event) => event.timestamp <= filters.endDate);
      }
    }
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull()
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  phone: true,
  message: true
});
var quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  email: text("email"),
  score: integer("score").notNull(),
  q1: text("q1").notNull(),
  q2: text("q2").notNull(),
  q3: text("q3").notNull(),
  q4: text("q4").notNull(),
  q5: text("q5").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull()
});
var insertQuizResultSchema = createInsertSchema(quizResults).pick({
  email: true,
  score: true,
  q1: true,
  q2: true,
  q3: true,
  q4: true,
  q5: true
});
var clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company").notNull(),
  phone: text("phone"),
  status: text("status").notNull().default("lead"),
  // lead, prospect, active, completed, churned
  industry: text("industry"),
  size: text("size"),
  // small, medium, large, enterprise
  source: text("source"),
  // website, referral, social, etc.
  notes: text("notes"),
  initialContactDate: timestamp("initial_contact_date").defaultNow().notNull(),
  lastContactDate: timestamp("last_contact_date").defaultNow().notNull(),
  metaData: jsonb("meta_data")
});
var insertClientSchema = createInsertSchema(clients).pick({
  name: true,
  email: true,
  company: true,
  phone: true,
  status: true,
  industry: true,
  size: true,
  source: true,
  notes: true,
  metaData: true
});
var clientInteractions = pgTable("client_interactions", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  type: text("type").notNull(),
  // email, call, meeting, proposal, contract, etc.
  description: text("description").notNull(),
  outcome: text("outcome"),
  date: timestamp("date").defaultNow().notNull(),
  nextSteps: text("next_steps"),
  metaData: jsonb("meta_data")
});
var insertClientInteractionSchema = createInsertSchema(clientInteractions).pick({
  clientId: true,
  type: true,
  description: true,
  outcome: true,
  nextSteps: true,
  metaData: true
});
var journeyStages = pgTable("journey_stages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
  color: text("color").notNull().default("#4E89AE"),
  isActive: boolean("is_active").notNull().default(true)
});
var insertJourneyStageSchema = createInsertSchema(journeyStages).pick({
  name: true,
  description: true,
  order: true,
  color: true,
  isActive: true
});
var journeyProgress = pgTable("journey_progress", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  stageId: integer("stage_id").notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  completionDate: timestamp("completion_date"),
  isCompleted: boolean("is_completed").notNull().default(false),
  notes: text("notes")
});
var insertJourneyProgressSchema = createInsertSchema(journeyProgress).pick({
  clientId: true,
  stageId: true,
  startDate: true,
  completionDate: true,
  isCompleted: true,
  notes: true
});
var analyticsEvents = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id"),
  eventType: text("event_type").notNull(),
  eventData: jsonb("event_data"),
  pageUrl: text("page_url"),
  referrer: text("referrer"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  sessionId: text("session_id"),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address")
});
var insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).pick({
  clientId: true,
  eventType: true,
  eventData: true,
  pageUrl: true,
  referrer: true,
  sessionId: true,
  userAgent: true,
  ipAddress: true
});

// server/routes.ts
import { ZodError } from "zod";

// server/services/email.ts
import nodemailer from "nodemailer";
var transporter = null;
var testAccount = null;
async function initializeMailService() {
  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.NODE_ENV === "production") {
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "mail.spacemail.com",
        // Use SpaceMail server
        port: parseInt(process.env.EMAIL_PORT || "587"),
        // Default SMTP port
        secure: process.env.EMAIL_SECURE === "true",
        // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          // Your email address 
          pass: process.env.EMAIL_PASSWORD
          // Your email password
        }
      });
      console.log("Email service initialized with real SMTP transport");
      return true;
    } else {
      console.log("Creating ethereal test account for email testing...");
      testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log("Email service initialized with test account");
      console.log("Test account credentials:", { user: testAccount.user, pass: testAccount.pass });
      return true;
    }
  } catch (error) {
    console.error("Failed to initialize email service:", error);
    return false;
  }
}
async function sendEmail(params) {
  try {
    if (!transporter) {
      const initialized = await initializeMailService();
      if (!initialized) {
        console.warn("Email not sent: mail service not initialized");
        return false;
      }
      if (!transporter) {
        return false;
      }
    }
    const mailOptions = {
      from: params.from,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
      cc: params.cc,
      bcc: params.bcc
    };
    if (params.replyTo) {
      mailOptions.replyTo = params.replyTo;
    }
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${params.to}, message ID: ${info.messageId}`);
    if (testAccount) {
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
async function sendContactFormNotification(name, email, message, phone, company) {
  const ceoEmail = "CEO@futurewith.co";
  const notificationEmail = "info@futurewith.co";
  const subject = `New Contact Form Submission from ${name}`;
  const text2 = `
    New contact form submission received:
    
    Name: ${name}
    Email: ${email}
    ${phone ? `Phone: ${phone}` : ""}
    ${company ? `Company: ${company}` : ""}
    
    Message:
    ${message}
  `;
  const html = `
    <h2>New Contact Form Submission</h2>
    <p>You've received a new inquiry from the website contact form.</p>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
      </tr>
      ${phone ? `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
      </tr>
      ` : ""}
      ${company ? `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${company}</td>
      </tr>
      ` : ""}
    </table>
    <h3>Message:</h3>
    <p style="background-color: #f9f9f9; padding: 12px; border-left: 4px solid #4E89AE;">${message.replace(/\n/g, "<br>")}</p>
  `;
  return sendEmail({
    to: ceoEmail,
    from: notificationEmail,
    subject,
    text: text2,
    html,
    replyTo: email
  });
}
async function sendContactFormAutoResponse(name, email) {
  const notificationEmail = "info@futurewith.co";
  const subject = "Thank you for contacting Future With";
  const text2 = `
    Dear ${name},
    
    Thank you for reaching out to Future With. We have received your inquiry and a member of our team will be in touch with you shortly.
    
    In the meantime, feel free to explore our website for more information about our services and success stories.
    
    Best regards,
    The Future With Team
  `;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #2D3748; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Thank You for Contacting Us</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #eaeaea; background-color: #ffffff;">
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to Future With. We have received your inquiry and a member of our team will be in touch with you shortly.</p>
        <p>In the meantime, feel free to explore our website for more information about our services and success stories.</p>
        <p>Best regards,<br>The Future With Team</p>
      </div>
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Future With. All rights reserved.</p>
        <p>Phone: +967730600011 | Email: info@futurewith.co</p>
      </div>
    </div>
  `;
  return sendEmail({
    to: email,
    from: notificationEmail,
    subject,
    text: text2,
    html
  });
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      let emailSent = false;
      let autoResponseSent = false;
      try {
        emailSent = await sendContactFormNotification(
          validatedData.name,
          validatedData.email,
          validatedData.message,
          validatedData.phone || void 0,
          validatedData.company
        );
        autoResponseSent = await sendContactFormAutoResponse(
          validatedData.name,
          validatedData.email
        );
      } catch (emailError) {
        console.error("Error sending contact form emails:", emailError);
      }
      res.status(201).json({
        success: true,
        data: {
          submission,
          emailNotification: {
            sent: emailSent,
            recipient: "CEO@futurewith.co"
          },
          autoResponse: {
            sent: autoResponseSent
          }
        },
        message: "Your message has been sent successfully."
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  app2.post("/api/quiz-result", async (req, res) => {
    try {
      const validatedData = insertQuizResultSchema.parse(req.body);
      const result = await storage.createQuizResult(validatedData);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  app2.post("/api/clients", async (req, res) => {
    try {
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.status(201).json({
        success: true,
        data: client
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  app2.get("/api/clients", async (req, res) => {
    try {
      const clients2 = await storage.getClients();
      res.status(200).json({
        success: true,
        data: clients2
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });
  app2.get("/api/clients/:id", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid client ID"
        });
      }
      const client = await storage.getClient(clientId);
      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client not found"
        });
      }
      res.status(200).json({
        success: true,
        data: client
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });
  app2.patch("/api/clients/:id", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid client ID"
        });
      }
      const validatedData = insertClientSchema.partial().parse(req.body);
      const updatedClient = await storage.updateClient(clientId, validatedData);
      if (!updatedClient) {
        return res.status(404).json({
          success: false,
          message: "Client not found"
        });
      }
      res.status(200).json({
        success: true,
        data: updatedClient
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  app2.post("/api/client-interactions", async (req, res) => {
    try {
      const validatedData = insertClientInteractionSchema.parse(req.body);
      const interaction = await storage.createClientInteraction(validatedData);
      res.status(201).json({
        success: true,
        data: interaction
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  app2.get("/api/clients/:id/interactions", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid client ID"
        });
      }
      const interactions = await storage.getClientInteractions(clientId);
      res.status(200).json({
        success: true,
        data: interactions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });
  app2.get("/api/journey-stages", async (req, res) => {
    try {
      const stages = await storage.getJourneyStages();
      res.status(200).json({
        success: true,
        data: stages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });
  app2.post("/api/journey-progress", async (req, res) => {
    try {
      const validatedData = insertJourneyProgressSchema.parse(req.body);
      const progress = await storage.createJourneyProgress(validatedData);
      res.status(201).json({
        success: true,
        data: progress
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  app2.get("/api/clients/:id/journey-progress", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid client ID"
        });
      }
      const progress = await storage.getClientJourneyProgress(clientId);
      res.status(200).json({
        success: true,
        data: progress
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });
  app2.patch("/api/journey-progress/:id", async (req, res) => {
    try {
      const progressId = parseInt(req.params.id);
      if (isNaN(progressId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid progress ID"
        });
      }
      const validatedData = insertJourneyProgressSchema.partial().parse(req.body);
      const updatedProgress = await storage.updateJourneyProgress(progressId, validatedData);
      if (!updatedProgress) {
        return res.status(404).json({
          success: false,
          message: "Journey progress not found"
        });
      }
      res.status(200).json({
        success: true,
        data: updatedProgress
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  app2.post("/api/analytics-events", async (req, res) => {
    try {
      const validatedData = insertAnalyticsEventSchema.parse(req.body);
      const event = await storage.createAnalyticsEvent(validatedData);
      res.status(201).json({
        success: true,
        data: event
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  app2.get("/api/analytics-events", async (req, res) => {
    try {
      const filters = {};
      if (req.query.clientId) {
        const clientId = parseInt(req.query.clientId);
        if (!isNaN(clientId)) {
          filters.clientId = clientId;
        }
      }
      if (req.query.eventType) {
        filters.eventType = req.query.eventType;
      }
      if (req.query.startDate) {
        filters.startDate = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filters.endDate = new Date(req.query.endDate);
      }
      const events = await storage.getAnalyticsEvents(filters);
      res.status(200).json({
        success: true,
        data: events
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  await initializeMailService();
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
