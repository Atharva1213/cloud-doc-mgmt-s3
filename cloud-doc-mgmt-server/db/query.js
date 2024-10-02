const mongoose = require('mongoose');
const { CLUSTERURLS } = require('../constants/constants');
const chalk = require('chalk');
const User = require('../Modal/user_table');
const { connectToDatabaseLive } = require('./database');

async function insertDocumentIntoClusters(userData) {
  for (const clusterURI of CLUSTERURLS) {
    let connection;
    try {
      await mongoose.connection.close();
      await connectToDatabaseLive(clusterURI);
      const newUser = new User(userData);
      await newUser.save();
    } catch (error) {
      console.log(
        chalk.red.bold(`Error inserting document into cluster: ${clusterURI}`)
      );
    } finally {
      if (connection) {
        await mongoose.connection.close();
      }
    }
  }

  console.log(
    chalk.green.bold('Document insertion process completed for all clusters.')
  );
}

async function UpdateDocumentIntoClusters(userData) {
  for (const clusterURI of CLUSTERURLS) {
    let connection;
    try {
      await mongoose.connection.close();
      await connectToDatabaseLive(clusterURI);
      await User.updateOne(
        { userEmail: userData.userEmail },
        { $set: { documents: userData.documents } }
      );
    } catch (error) {
      console.log(
        chalk.red.bold(`Error Updating document into cluster: ${clusterURI}`)
      );
    } finally {
      if (connection) {
        await mongoose.connection.close();
      }
    }
  }

  console.log(
    chalk.green.bold('Document Updating process completed for all clusters.')
  );
}

module.exports = { insertDocumentIntoClusters, UpdateDocumentIntoClusters };
