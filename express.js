const express = require('express');
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

const app = express();
const port = 3000; // Choose a suitable port number

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://praveenmbsc22:musharrat1234@musharrat.wmbmopz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define Animal schema
const animalSchema = new mongoose.Schema({
  species: String,
  population: Number,
  mortalityRate: Number,
});

const Animal = mongoose.model('Animal', animalSchema);

// Define Zoo schema
const zooSchema = new mongoose.Schema({
  animals: [animalSchema],
});

const Zoo = mongoose.model('Zoo', zooSchema);

// Define the routes
app.post('/animals', async (req, res) => {
  try {
    const { species, population, mortalityRate } = req.body;
    const animal = new Animal({ species, population, mortalityRate });
    await animal.save();
    res.status(201).json({ message: 'Animal added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/zoo', async (req, res) => {
  try {
    const zoo = new Zoo();
    const animals = await Animal.find();
    zoo.animals = animals;
    await zoo.save();
    res.status(201).json({ message: 'Zoo created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/zoo', async (req, res) => {
  try {
    const zoo = await Zoo.findOne();
    if (zoo) {
      const years = parseInt(req.query.years);
      const totalAliveAnimals = zoo.calculateTotalAliveAnimals(years);
      res.json({ totalAliveAnimals });
    } else {
      res.status(404).json({ error: 'Zoo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
