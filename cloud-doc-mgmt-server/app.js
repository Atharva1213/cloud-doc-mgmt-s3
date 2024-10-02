//require the module
const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');
const cors = require('cors');
dotenv.config({ path: '.env' });
const { NODE_ENV, PORT } = require('./constants/constants');

const { connectToDatabase, synchronizeData } = require('./db/database');

connectToDatabase(NODE_ENV);

// setTimeout(async()=>{
//    await synchronizeData();
// },5000)

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Server Set Up Succesfully (Health Check)' });
});

app.listen(PORT, () => {
  console.log(chalk.green.bold(`Server Listening on ${PORT}`));
});
