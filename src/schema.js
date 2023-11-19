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
}, {
    virtuals: {
      timestampString: {
        get() {
          return this.timestamp.toISOString();
        }
      }
    }
  });

// Ensure the compound text index on the 'message' field
logSchema.index({ message: 'text' });
logSchema.index({ timestamp: -1 });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
