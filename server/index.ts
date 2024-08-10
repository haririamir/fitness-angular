import express from 'express';
import cors from 'cors';
import {
  authRoute,
  exerciseRoute,
  planRoute,
  userRoute,
  workoutRoute,
} from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoute);
app.use('/api', exerciseRoute);
app.use('/api', planRoute);
app.use('/api', workoutRoute);
app.use('/api', userRoute);
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  }
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
