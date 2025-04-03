import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema, 
  insertQuizResultSchema,
  insertClientSchema,
  insertClientInteractionSchema,
  insertJourneyProgressSchema,
  insertAnalyticsEventSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { sendContactFormNotification, sendContactFormAutoResponse } from "./services/email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store submission in database
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send notification email to CEO
      let emailSent = false;
      let autoResponseSent = false;
      
      try {
        // Send email to CEO
        emailSent = await sendContactFormNotification(
          validatedData.name,
          validatedData.email,
          validatedData.message,
          validatedData.phone,
          validatedData.company
        );
        
        // Send auto-response to the user
        autoResponseSent = await sendContactFormAutoResponse(
          validatedData.name,
          validatedData.email
        );
      } catch (emailError) {
        console.error('Error sending contact form emails:', emailError);
        // Continue execution even if email fails
      }
      
      res.status(201).json({
        success: true,
        data: {
          submission,
          emailNotification: {
            sent: emailSent,
            recipient: 'CEO@futurewith.co'
          },
          autoResponse: {
            sent: autoResponseSent
          }
        },
        message: 'Your message has been sent successfully.'
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors
        });
      } else {
        console.error('Contact form submission error:', error);
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request'
        });
      }
    }
  });

  // Quiz result submission
  app.post('/api/quiz-result', async (req, res) => {
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
          message: 'Validation error',
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request'
        });
      }
    }
  });

  // Client Management Endpoints
  
  // Create client
  app.post('/api/clients', async (req, res) => {
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
          message: 'Validation error',
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request'
        });
      }
    }
  });
  
  // Get all clients
  app.get('/api/clients', async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.status(200).json({
        success: true,
        data: clients
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request'
      });
    }
  });
  
  // Get client by ID
  app.get('/api/clients/:id', async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid client ID'
        });
      }
      
      const client = await storage.getClient(clientId);
      if (!client) {
        return res.status(404).json({
          success: false,
          message: 'Client not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: client
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request'
      });
    }
  });
  
  // Update client
  app.patch('/api/clients/:id', async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid client ID'
        });
      }
      
      // Validate only the fields that are being updated
      const validatedData = insertClientSchema.partial().parse(req.body);
      
      const updatedClient = await storage.updateClient(clientId, validatedData);
      if (!updatedClient) {
        return res.status(404).json({
          success: false,
          message: 'Client not found'
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
          message: 'Validation error',
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request'
        });
      }
    }
  });
  
  // Client Interaction Endpoints
  
  // Create client interaction
  app.post('/api/client-interactions', async (req, res) => {
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
          message: 'Validation error',
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request'
        });
      }
    }
  });
  
  // Get client interactions by client ID
  app.get('/api/clients/:id/interactions', async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid client ID'
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
        message: 'An error occurred while processing your request'
      });
    }
  });
  
  // Journey Stage Endpoints
  
  // Get all journey stages
  app.get('/api/journey-stages', async (req, res) => {
    try {
      const stages = await storage.getJourneyStages();
      res.status(200).json({
        success: true,
        data: stages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request'
      });
    }
  });
  
  // Journey Progress Endpoints
  
  // Create journey progress for a client
  app.post('/api/journey-progress', async (req, res) => {
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
          message: 'Validation error',
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request'
        });
      }
    }
  });
  
  // Get client journey progress
  app.get('/api/clients/:id/journey-progress', async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid client ID'
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
        message: 'An error occurred while processing your request'
      });
    }
  });
  
  // Update journey progress
  app.patch('/api/journey-progress/:id', async (req, res) => {
    try {
      const progressId = parseInt(req.params.id);
      if (isNaN(progressId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid progress ID'
        });
      }
      
      // Validate only the fields that are being updated
      const validatedData = insertJourneyProgressSchema.partial().parse(req.body);
      
      const updatedProgress = await storage.updateJourneyProgress(progressId, validatedData);
      if (!updatedProgress) {
        return res.status(404).json({
          success: false,
          message: 'Journey progress not found'
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
          message: 'Validation error',
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request'
        });
      }
    }
  });
  
  // Analytics Events Endpoints
  
  // Create analytics event
  app.post('/api/analytics-events', async (req, res) => {
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
          message: 'Validation error',
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request'
        });
      }
    }
  });
  
  // Get analytics events with filtering
  app.get('/api/analytics-events', async (req, res) => {
    try {
      const filters: {
        clientId?: number;
        eventType?: string;
        startDate?: Date;
        endDate?: Date;
      } = {};
      
      if (req.query.clientId) {
        const clientId = parseInt(req.query.clientId as string);
        if (!isNaN(clientId)) {
          filters.clientId = clientId;
        }
      }
      
      if (req.query.eventType) {
        filters.eventType = req.query.eventType as string;
      }
      
      if (req.query.startDate) {
        filters.startDate = new Date(req.query.startDate as string);
      }
      
      if (req.query.endDate) {
        filters.endDate = new Date(req.query.endDate as string);
      }
      
      const events = await storage.getAnalyticsEvents(filters);
      res.status(200).json({
        success: true,
        data: events
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
