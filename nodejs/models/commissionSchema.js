// models/commissionSchema.js
const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema({
  equipment_id: {
    type: String,
    required: true,
  },
  commission_amount: {
    type: Number,
    required: true,
  },
  commission_rate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

const Commission = mongoose.model('Commission', commissionSchema);

module.exports = Commission;
