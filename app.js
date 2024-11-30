const express = require('express');
const app = express();

const userRouter = require('./routes/user.routes');
const mainRouter = require('./routes/main.routes');

const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();

const cookieParser = require('cookie-parser');
app.use(cookieParser());



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/',mainRouter);
app.use('/user',userRouter);




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});