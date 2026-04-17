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

//==================
//Security Middleware
//==================

//Defend http header 
app.use(helmet());

//Authorize for frontend call the API
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', credential: true
}));

//Body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Global Rate Limit
import rateLimit from 'express-rate-limit';

const GlobalLimit =rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: 'Too Many Request form ,Please try again',
})