import express from "express";
import routes from "./routes/index.routes.js"; 
import cors from "cors"
const app = express();

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST"]
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', routes);

export default app;