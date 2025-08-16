import express, { Application } from 'express';
import { config } from './config';

// Placeholder for routes, middleware, etc.
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the backend! of LeaveDesk');
});

// You can add more routes, JWT auth, email integration here using config.JWT_SECRET, config.EMAIL_* etc.
 
export default app;