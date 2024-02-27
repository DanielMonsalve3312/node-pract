import express, { json } from 'express';
import { usersRouter } from './routes/users.js';
import { corsMiddleware } from './middelwares/cors.js';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware());

app.use("/users", usersRouter)

app.listen(PORT, () => {
    console.log("http://localhost:3000")
})