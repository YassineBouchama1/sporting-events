interface DatabaseConfig {
  url: string;
}

interface JwtConfig {
  secret: string;
  expiresIn: string;
}

interface CorsConfig {
  origins: string[];
  credentials: boolean;
  methods: string[]; 
  allowedHeaders: string[]; 
  exposedHeaders: string[];
}

interface Config {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  cors: CorsConfig;
}

export const configuration = (): Config => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  database: {
    url: process.env.DATABASE_URL || 'mongodb://mongo:27017/sporting-events',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'yassinebouchama',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  cors: {
    origins: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    exposedHeaders: ['Authorization', 'Set-Cookie'],
  },
});
