const mongoose = require('mongoose');
const Log = require("./schema");

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

const connect = async () => {
  try {
    await mongoose.connect(mongodbUri);

    console.log('Connected to the database');

    // Check if the 'logs' collection exists, and create it if not
    if (!(await Log.exists())) {
      await Log.createCollection();
      console.log('Collection "logs" is ready');
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};

const ingest = async (logData) => {
  try {
    const logEntry = new Log(logData);
    await logEntry.save();
  } catch (error) {
    console.error('Error inserting log entry:', error.message);
    return false;
  }
};

const constructQuery = (filters) => {
  // Construct the query based on the requestBody
  var query = {};
  if(filters.message) query.$text = { $search: filters.message };
  if(filters.parentResourceId) query.metadata = { parentResourceId: filters.parentResourceId};
  if(filters.level) query.level = filters.level;
  if(filters.resourceId) query.resourceId = filters.resourceId;
  if(filters.traceId) query.traceId = filters.traceId;
  if(filters.spanId) query.spanId = filters.spanId;
  if(filters.commit) query.commit = filters.commit;
  if(filters.startTime) query.timestamp = { $gte: new Date(filters.startTime) };
  if(filters.endTime) query.timestamp = { 
    ...query.timestamp,
    $lt: new Date(filters.endTime)
  };
  // console.log(query);
  return query;
};

const search = async (queryObject) => {
  try {
    const query = constructQuery(queryObject);
    let result = await Log.find(query).exec();
    return result;
  } catch (error) {
    console.error('Error executing search query:', error.message);
    return error;
  }
};

module.exports = {
  connect,
  ingest,
  search,
};
