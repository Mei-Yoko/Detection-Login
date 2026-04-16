//Main Application Entry point
import  express ,{ Application, Request, Response  } from 'express';
import cors form 'cors';
import helmet from 'helmet';
import dotenv form 'dotenv';
import { connectDatabase } from './config/database';

//load env
dotenv.config();

//Create Application
const app: Application = express();
const port = process.env.PORT || 5000;

//Security Middleware