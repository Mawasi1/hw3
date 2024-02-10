import express from "express";
import 'dotenv/config';
import { planRoutes } from './routes/planRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';

connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/plans', planRoutes);
app.use(errorHandler);

let server;
const startServer = () => {
  server = app.listen(port, () => console.log(`Server started on port ${port}`));
  return server;
};

// Conditionally start the server if not being imported
if (process.env.NODE_ENV === 'production') {
  startServer();
}


export { app, startServer };
