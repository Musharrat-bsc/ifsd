const prompt=require('prompt-sync')();
class Animal {
    constructor(species, population, mortalityRate) {
      this.species = species;
      this.population = population;
      this.mortalityRate = mortalityRate;
    }
  
    calculateAliveAnimals(years) {
      let currentPopulation = this.population;
  
      for (let i = 1; i <= years; i++) {
        currentPopulation -= currentPopulation * this.mortalityRate;
      }
  
      return Math.floor(currentPopulation);
    }
  }
  
  class Zoo {
    constructor() {
      this.animals = [];
    }
  
    addAnimal(animal) {
      this.animals.push(animal);
    }
  
    calculateTotalAliveAnimals(years) {
      let totalAliveAnimals = 0;
  
      for (const animal of this.animals) {
        totalAliveAnimals += animal.calculateAliveAnimals(years);
      }
  
      return totalAliveAnimals;
    }
  }
  
  // Main code
  function main() {
    const zoo = new Zoo();
    
    // User input
    const numAnimals = parseInt(prompt("Enter the number of animals in the zoo:"));
    
    for (let i = 0; i < numAnimals; i++) {
      const species = prompt(`Enter the species of animal ${i + 1}:`);
      const population = parseInt(prompt(`Enter the population of ${species}:`));
      const mortalityRate = parseFloat(prompt(`Enter the mortality rate of ${species} (as a decimal):`));
      
      const animal = new Animal(species, population, mortalityRate);
      zoo.addAnimal(animal);
    }
  
    const years = parseInt(prompt("Enter the number of years:"));
  
    const totalAliveAnimals = zoo.calculateTotalAliveAnimals(years);
    console.log(`After ${years} years, there will be ${totalAliveAnimals} animals alive in the zoo.`);
  }
  
  // Call the main function
  main();
  