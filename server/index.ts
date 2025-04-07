import express, { Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import os from "os";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom request logger for API routes
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite in dev, serve static in prod
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Run server on port 5000 and listen to all IPs
  const port = process.env.PORT || 5000;
  const host = "0.0.0.0";

  server.listen(port, host, () => {
    const networkInterfaces = os.networkInterfaces();
    const localIp = Object.values(networkInterfaces)
      .flat()
      .find((iface: any) => iface?.family === "IPv4" && !iface.internal)?.address;

    console.log(`Server running at:`);
    console.log(`- Local:   http://localhost:${port}`);
    if (localIp) console.log(`- Network: http://${localIp}:${port}`);
  });
})();
