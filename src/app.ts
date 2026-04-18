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
    standardHeaders: true,
    legacyHeaders: false
});

app.use(GlobalLimit);

// ============================================================
// Routes (Import file that has been create routes )
// ============================================================
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Secure Login API is running',
      timestamp: new Date().toISOString()
    });
  });

app.get('/', (req: Request, res: Response) => {
    res.json({
      message: '🔐 Secure Login & Brute Force Detection API',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        security: '/api/security',
        users: '/api/users'
      },
      documentation: '/api/docs'
    });
  });

//error handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  });
//global error
app.use((err: any, req: Request, res: Response, next: any) => {
    console.error('Error:', err);
    
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  });

const startServer = async () => {
    try {
      //    connect mongo
      await connectDatabase();
      
      // start Express server
      app.listen(port, () => {
        console.log('\n🚀 ========================================');
        console.log(`🔐 Secure Login API Server`);
        console.log(`📡 Server running on port ${port}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 URL: http://localhost:${port}`);
        console.log('🚀 ========================================\n');
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  };
  
  // Start the application
  startServer();
  
  export default app;
  