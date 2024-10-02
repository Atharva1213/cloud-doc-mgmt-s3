const mongoose = require('mongoose');
const { CLUSTERURLS, TESTDB1 } = require('../constants/constants');
const chalk = require('chalk');
const User = require('../Modal/user_table');

let currentClusterIndex = 0;

async function connectToDatabase(NODE_ENV) {
  let connected = false;

  if (NODE_ENV === 'development') {
    try {
      await mongoose.connect(TESTDB1);
      console.log(chalk.green.bold('Connected to the TEST Database!'));
      connected = true;
    } catch (error) {
      console.log(chalk.red.bold('Failed to connect to the TEST database:'));
      process.exit(1);
    }
  } else {
    while (currentClusterIndex < CLUSTERURLS.length && !connected) {
      const dbURI = CLUSTERURLS[currentClusterIndex];
      try {
        await mongoose.connect(dbURI);
        connected = true;
        console.log(
          chalk.green.bold(
            `Connected to MongoDB PRODDB: ${currentClusterIndex + 1}`
          )
        );
      } catch (error) {
        console.log(
          chalk.red.bold(
            `Failed to connect to PRODDB:${currentClusterIndex + 1}`
          )
        );
        currentClusterIndex++;
      }
    }

    if (!connected) {
      console.log(
        chalk.red.bold(
          'All MongoDB clusters are unavailable. Application cannot connect to the database.'
        )
      );
      process.exit(1);
    }
  }

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log(
      chalk.green.bold('MongoDB connection established successfully!')
    );
  });
}

async function connectToDatabaseLive(clusterURI) {
  try {
    await mongoose.connect(clusterURI);
    console.log(
      chalk.green.bold(`Connected to MongoDB cluster: ${clusterURI}`)
    );
  } catch (error) {
    console.log(
      chalk.red.bold(`Failed to connect to MongoDB cluster: ${clusterURI}`)
    );
    throw error;
  }
}

async function syncDataToClusters(liveData) {
  if (liveData.length === 0) {
    console.log(chalk.red.bold('No data to synchronize.'));
    return;
  }

  for (const clusterURI of CLUSTERURLS) {
    try {
      await connectToDatabaseLive(clusterURI);
      await User.deleteMany({});

      await User.insertMany(liveData);
      console.log(
        chalk.green.bold(`Data synchronized to cluster: ${clusterURI}`)
      );
      mongoose.connection.close();
    } catch (error) {
      console.log(
        chalk.red.bold(`Failed to sync data to cluster: ${clusterURI}`)
      );
    }
  }
}

async function synchronizeData() {
  liveData = await User.find({});
  await syncDataToClusters(liveData);
}

module.exports = { connectToDatabase, synchronizeData, connectToDatabaseLive };
