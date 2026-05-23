import express from "express";
// import prisma from "./database.js";
import router from "./routes/index.route.js";
import pinoHttp from 'pino-http' 
import logger from './configs/logger.config.js'

const app = express();
const port = 3000;

app.use(pinoHttp()) 
app.use(express.json());
app.use(router);

if (process.env.ENV !== 'production') {
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    logger.info(`Library API is running at http://localhost:${port}`)
    logger.info('Application started successfully')
  })
}

export default app