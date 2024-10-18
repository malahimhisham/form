// server.js
const express = require("express");
const connectDB = require("./config/db");
const Field = require("./models/fieldSchema");
const Commission = require("./models/commissionSchema");

const cors = require("cors")

const app = express();
const PORT = 8000;

app.use(cors())

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Add the equipement model
const Equipement = require("./models/equipementSchema");

app.get('/equipements', async (req, res) => {
  try {
    const equipements = await Equipement.find(); // Fetch all equipements
    res.status(200).json(equipements); // Send the equipment data as a JSON response
  } catch (error) {
    console.error('Error fetching equipments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/equipements', async (req, res) => {
  try {
    const newEquipement = new Equipement({
      equipement_id: req.body.equipement_id, // Provide sample ID
      // Add other fields here if needed
    });
    await newEquipement.save();
    res.status(201).json({ message: 'Equipement added successfully' });
  } catch (error) {
    console.error('Error adding equipement:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to handle field submissions
app.post('/fields', async (req, res) => {
  try {
    const { field_name, field_value, description, equipement_id } = req.body;

    const newField = new Field({
      field_name,
      field_value,
      description,
      equipement_id, // Ensure equipement_id is saved
    });

    await newField.save();
    res.status(201).json({ message: 'Field submitted successfully' });
  } catch (error) {
    console.error('Error submitting field:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Endpoint to handle commission submissions
app.post('/commissions', async (req, res) => {
  try {
    const newCommission = new Commission(req.body);
    await newCommission.save();
    res.status(201).json({ message: 'Commission submitted successfully' });
  } catch (error) {
    console.error('Error submitting commission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
