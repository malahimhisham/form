const mongoose = require('mongoose');

const equipementSchema = new mongoose.Schema({
    equipement_id: {
    type: String,
    required: true
  },
  // Add any other fields you need
});

const Equipement = mongoose.model('EquipementID', equipementSchema);

module.exports = Equipement;
