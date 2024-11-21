import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import vehicleRoutes from './routes/vehicleRoutes.mjs';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/vehicles', vehicleRoutes);

export default app;
