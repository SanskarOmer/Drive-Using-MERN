const express = require('express');
const userRouter = require('./routes/user.routes');

const app = express();


app.set('view engine', 'ejs');

app.use('',userRouter);
app.use(express.static('public'));




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});