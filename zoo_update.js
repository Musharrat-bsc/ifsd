const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://praveenmbsc22:musharrat1234@musharrat.wmbmopz.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'zoo';

// Function to update zoos in MongoDB based on specified filter and update
async function updateZoos(filter, update) {
  // Create a new MongoClient
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Get the zoos collection
    const collection = db.collection('animals');

    // Update zoos
    const result = await collection.updateMany(filter, update);

    console.log(`${result.modifiedCount} zoos updated.`);
  } catch (err) {
    console.error('Error updating zoos:', err);
  } finally {
    // Close the connection
    client.close();
  }
}

// Example usage
const filter = { species: 'Lion', population:  10  };
const update = { $set: { population: 200, mortalityRate: 0.2 } };
updateZoos(filter, update);
