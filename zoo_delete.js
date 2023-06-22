const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://praveenmbsc22:musharrat1234@musharrat.wmbmopz.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'zoo';

// Function to add an animal to the zoo collection
async function addAnimal(animal) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('animals');
    const result = await collection.insertOne(animal);

    console.log(`Animal added with ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Error adding animal:', err);
  } finally {
    client.close();
  }
}

// Function to find all animals in the zoo collection
async function findAllAnimals() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('animals');
    const animals = await collection.find().toArray();

    console.log('All animals in the zoo:');
    console.log(animals);
  } catch (err) {
    console.error('Error finding animals:', err);
  } finally {
    client.close();
  }
}

// Function to update an animal in the zoo collection
async function updateAnimal(filter, update) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('animals');
    const result = await collection.updateOne(filter, { $set: update });

    console.log(`${result.modifiedCount} animal updated.`);
  } catch (err) {
    console.error('Error updating animal:', err);
  } finally {
    client.close();
  }
}

// Function to delete animals from the zoo collection
async function deleteAnimals(filter) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('animals');
    const result = await collection.deleteMany(filter);

    console.log(`${result.deletedCount} animals deleted.`);
  } catch (err) {
    console.error('Error deleting animals:', err);
  } finally {
    client.close();
  }
}

// Example usage

// Add a new animal
const newAnimal = {
  species: 'Lion',
  population: 10,
  mortalityRate: 0.1
};
addAnimal(newAnimal);

// Find all animals
// findAllAnimals();

// Update an animal
// const filter = { species: 'Lion' };
// const update = { $set: { population: 12 } };
// updateAnimal(filter, update);

// Delete animals
const deleteFilter = { species: 'Elephant' };
deleteAnimals(deleteFilter);
