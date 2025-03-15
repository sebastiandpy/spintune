import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Album data and track information will be served from the frontend
  // This is a simple app with no database for album data

  const httpServer = createServer(app);

  return httpServer;
}
