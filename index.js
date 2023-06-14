//imports from packages

const express = require("express");
const mongoose = require("mongoose");

//import from other files

const authRouter = require("./routes/auth");
//init
const PORT = 3000;
const app = express();
const DB =
  "mongodb+srv://yazanfarrah03:OcqR6C85ei0OHPUS@cluster0.7nkhaij.mongodb.net/?retryWrites=true&w=majority";
// middleware
//app.use(express.json()); passes incoming requests with json payloads 
app.use(express.json());
app.use(authRouter);

//connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB Connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, () => {
  console.log(`Connected at ${PORT}`);
});
