import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import aboutusRouter from './routes/aboutus';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/aboutus', aboutusRouter);

//start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



