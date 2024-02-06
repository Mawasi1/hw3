import express from "express";
import 'dotenv/config';
import { planRoutes } from './routes/planRoutes.js';
import {errorHandler} from './middleware/errorMiddleware.js';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/plans', planRoutes );
app.use(errorHandler);

app.listen(port,() => console.log(`Server started on port ${port}`));
