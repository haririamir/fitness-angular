import express from 'express';
import exerciseRoute from './routes/exerciseRoute';
import planRoute from './routes/planRoute';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', exerciseRoute);
app.use('/api', planRoute);
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
