const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://praveenmbsc22:musharrat1234@musharrat.wmbmopz.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');

    // Define Animal schema
    const animalSchema = new mongoose.Schema({
      species: String,
      population: Number,
      mortalityRate: Number
    });

    // Create Animal model
    const Animal = mongoose.model('Animal', animalSchema);

    // Function to add animals to the collection
    async function addAnimals() {
      const animals = [
        { species: 'Lion', population: 10, mortalityRate: 0.1 },
        { species: 'Elephant', population: 5, mortalityRate: 0.05 },
        { species: 'Giraffe', population: 8, mortalityRate: 0.2 }
      ];

      const result = await Animal.insertMany(animals);
      console.log(`${result.length} animals added to the zoo.`);
    }

    // Function to calculate the total number of alive animals after n years
    async function calculateTotalAliveAnimals(years) {
      const animals = await Animal.find();

      let totalAliveAnimals = 0;

      for (const animal of animals) {
        let currentPopulation = animal.population;

        for (let i = 1; i <= years; i++) {
          currentPopulation -= currentPopulation * animal.mortalityRate;
        }

        totalAliveAnimals += Math.floor(currentPopulation);
      }

      return totalAliveAnimals;
    }

    // Main function
    async function main() {
      // Add animals to the zoo
      await addAnimals();

      // Calculate total alive animals after n years
      const years = 5; // Number of years
      const totalAliveAnimals = await calculateTotalAliveAnimals(years);
      console.log(`After ${years} years, there will be ${totalAliveAnimals} animals alive in the zoo.`);

      // Disconnect from MongoDB
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }

    // Call the main function
    main().catch(console.error);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
