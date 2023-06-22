const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  const databaseURI = 'mongodb+srv://praveenmbsc22:musharrat1234@musharrat.wmbmopz.mongodb.net/?retryWrites=true&w=majority';
  const databaseName = 'zoo';
  const collectionName = 'animals';

  await mongoose.connect(databaseURI, { dbName: databaseName });

  const animalSchema = new mongoose.Schema({
    species: String,
    population: Number,
    mortalityRate: Number
  });

  animalSchema.methods.introduce = function() {
    console.log(`Species: ${this.species}`);
    console.log(`Population: ${this.population}`);
    console.log(`Mortality Rate: ${this.mortalityRate}`);
  };

  const Animal = mongoose.model('Animal', animalSchema, collectionName);

  // Find all animals
  const animals = await Animal.find();
  animals.forEach(animal => animal.introduce());
}
