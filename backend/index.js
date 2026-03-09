import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import { userRouter } from './routes/userRoute.js';
import { noteRouter } from './routes/noteRoute.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);

async function connectDB() {
    const mongoUrl = process.env.MONGO_URI;
    const port = process.env.PORT;

    try {

        if (!mongoUrl) {
            throw new Error("Couldn't find mongo url");
        }

        await mongoose.connect(`${mongoUrl}`);
        app.listen(port, () => {
            console.log(`Connected to database, Server is now listening to port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}
connectDB();