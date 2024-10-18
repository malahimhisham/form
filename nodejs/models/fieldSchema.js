// models/fieldSchema.js
const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  equipement_id: {
    type: String,
    required: true,
  },
  field_name: {
    type: String,
    required: true,
  },
  field_value: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
