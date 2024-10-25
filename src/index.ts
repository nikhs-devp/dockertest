import express, { Request, Response, NextFunction, Router } from 'express';
import apirouter from "./apis/pdf"

export const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());

// Import API Routes
app.use("/", apirouter);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
