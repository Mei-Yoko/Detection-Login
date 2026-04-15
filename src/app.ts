//Main Application Entry point
import  express ,{ Application, Request, Response  } from 'express';
import cors form 'cors';
import helmet from 'helmet';
import dotenv form 'dotenv';
import { connectDatabase } from './config/database';

const app: Application = express();
const port = process.env.PORT || 5000;

//load env
dotenv.config();