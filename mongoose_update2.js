const mongoose = require('mongoose');

async function main() {
  const databaseURI = 'mongodb+srv://praveenmbsc22:musharrat1234@musharrat.wmbmopz.mongodb.net/?retryWrites=true&w=majority';
  const collectionName = 'animals';

  await mongoose.connect(databaseURI);

  const animalSchema = new mongoose.Schema({
    species: String,
    population: Number,
    mortalityRate: Number
  });

  const Animal = mongoose.model('Animal', animalSchema, collectionName);

  // Add a new animal to the zoo
  const newAnimal = new Animal({
    species: 'Lion',
    population: 10,
    mortalityRate: 0.1
  });

  await newAnimal.save();
  console.log('Animal added successfully.');

  // Find all animals in the zoo
  // const animals = await Animal.find();
  // console.log('All animals in the zoo:');
  // console.log(animals);

  // Update an animal's population and mortality rate
  const filter = { species: 'Lion' };
  const update = { population: 12, mortalityRate: 0.15 };
  const updateResult = await Animal.updateOne(filter, update);
  console.log(`Updated ${updateResult.modifiedCount} animal.`);

  // Find the updated animal
  const updatedAnimal = await Animal.findOne(filter);
  console.log('Updated animal:');
  console.log(updatedAnimal);

  // Delete animals from the zoo
//   const deleteFilter = { species: 'Lion' };
//   const deleteResult = await Animal.deleteMany(deleteFilter);
//   console.log(`Deleted ${deleteResult.deletedCount} animals.`);
  
//   // Find all animals after deletion
//   const remainingAnimals = await Animal.find();
//   console.log('Remaining animals in the zoo:');
//   console.log(remainingAnimals);
// }
}
main().catch(err => console.log(err));
