import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import cors from 'cors';
import sequelize from './config/database.js';
import userRoutes from './infrastructure/routes/userRoutes.js';
import taskRoutes from './infrastructure/routes/taskRoutes.js';
import errorMiddleware from './infrastructure/middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(json());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

app.use(errorMiddleware);

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});