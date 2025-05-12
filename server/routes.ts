import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTeamConfigSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to create a new team configuration
  app.post("/api/teams", async (req, res) => {
    try {
      const validatedData = insertTeamConfigSchema.parse(req.body);
      const teamConfig = await storage.createTeamConfig(validatedData);
      res.status(201).json(teamConfig);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid team configuration data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create team configuration" });
      }
    }
  });

  // API endpoint to get team configurations history
  app.get("/api/teams", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const teamConfigs = await storage.getTeamConfigs(limit);
      res.json(teamConfigs);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve team configurations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
