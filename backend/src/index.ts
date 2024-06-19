import express from 'express';
import todoRouter from './routes/todos'

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json())
app.use('/todos', todoRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
