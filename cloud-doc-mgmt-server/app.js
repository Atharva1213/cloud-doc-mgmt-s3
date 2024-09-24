//require the module
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({ path: '.env' });
require('./db/database');
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

app.get("/",(req,res)=>{
  res.json({message:"Server Set Up Succesfully (Health Check)"}); 
});
app.listen(PORT, () => {
  console.log(`Server Listening on ${process.env.PORT}`);
});
