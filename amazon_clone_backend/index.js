//imports from packages

const express = require('express');


//import from other files  

const authRouter = require('./routes/auth');
const app = express();


// middleware

app.use(authRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Connected at ${PORT}`);
});
