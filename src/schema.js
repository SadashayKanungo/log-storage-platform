const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    index: true,
  },
  message: {
    type: String,
    required: true,
    index: { type: 'text' },
  },
  resourceId: {
    type: String,
    required: true,
    index: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  traceId: {
    type: String,
    required: true,
    index: true,
  },
  spanId: {
    type: String,
    required: true,
    index: true,
  },
  commit: {
    type: String,
    required: true,
    index: true,
  },
  metadata: {
    parentResourceId: {
      type: String,
      required: true,
      index: true,
    },
  },
});

// Ensure the compound text index on the 'message' field
logSchema.index({ message: 'text' });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
