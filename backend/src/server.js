import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// middleware to parse JSON requests
app.use(
    cors({
        origin: 'http://localhost:5173'
    })
);
app.use(express.json()); // this middleware will parse the incoming request body if it is in JSON format and make it available under req.body
app.use(rateLimiter);

// our simple custom middleware to log request method and url
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} and req url is ${req.url}`);
//     next(); //move to the next middleware or route handler the next handler is next in line that is named as notesRoutes
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port", PORT)
    })
})
