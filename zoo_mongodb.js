const { MongoClient } = require("mongodb");

// Connection URI and database name
const uri = "mongodb+srv://praveenmbsc22:musharrat1234@musharrat.wmbmopz.mongodb.net/?retryWrites=true&w=majority";
const dbName = "zoo";

// Collection names
const animalsCollectionName = "animals";

// Main function
async function main() {
  // Connect to MongoDB
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log("Connected to MongoDB");

  // Get the animals collection
  const db = client.db(dbName);
  const animalsCollection = db.collection(animalsCollectionName);

  // Add animals to the zoo
  await addAnimals(animalsCollection);

  // Calculate total alive animals after n years
  const years = 5; // Number of years
  const totalAliveAnimals = await calculateTotalAliveAnimals(animalsCollection, years);
  console.log(`After ${years} years, there will be ${totalAliveAnimals} animals alive in the zoo.`);

  // Disconnect from MongoDB
  await client.close();
  console.log("Disconnected from MongoDB");
}

// Function to add animals to the collection
async function addAnimals(collection) {
  const animals = [
    { species: "Lion", population: 10, mortalityRate: 0.1 },
    { species: "Elephant", population: 5, mortalityRate: 0.05 },
    { species: "Giraffe", population: 8, mortalityRate: 0.2 }
  ];

  const result = await collection.insertMany(animals);
  console.log(`${result.insertedCount} animals added to the zoo.`);
}

// Function to calculate the total number of alive animals after n years
async function calculateTotalAliveAnimals(collection, years) {
  const animals = await collection.find().toArray();

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

// Call the main function
main().catch(console.error);
