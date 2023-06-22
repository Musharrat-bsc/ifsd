import React, { useState } from 'react';

function ZooWidget() {
  const [animals, setAnimals] = useState([]);
  const [species, setSpecies] = useState('');
  const [population, setPopulation] = useState('');
  const [mortalityRate, setMortalityRate] = useState('');

  const handleSpeciesChange = (event) => {
    setSpecies(event.target.value);
  };

  const handlePopulationChange = (event) => {
    setPopulation(event.target.value);
  };

  const handleMortalityRateChange = (event) => {
    setMortalityRate(event.target.value);
  };

  const handleCreate = () => {
    const newAnimal = {
      id: Date.now(),
      species,
      population,
      mortalityRate
    };

    setAnimals([...animals, newAnimal]);
    setSpecies('');
    setPopulation('');
    setMortalityRate('');
  };

  const handleDelete = (id) => {
    const updatedAnimals = animals.filter(animal => animal.id !== id);
    setAnimals(updatedAnimals);
  };

  const handleUpdate = (id, newSpecies, newPopulation, newMortalityRate) => {
    const updatedAnimals = animals.map(animal => {
      if (animal.id === id) {
        return {
          ...animal,
          species: newSpecies,
          population: newPopulation,
          mortalityRate: newMortalityRate
        };
      }
      return animal;
    });

    setAnimals(updatedAnimals);
  };

  return (
    <div className="widget-container">
      <h3>Zoo Management</h3>

      <div className="input-field">
        <label htmlFor="speciesInput">Species:</label>
        <input
          type="text"
          id="speciesInput"
          value={species}
          onChange={handleSpeciesChange}
        />
      </div>

      <div className="input-field">
        <label htmlFor="populationInput">Population:</label>
        <input
          type="text"
          id="populationInput"
          value={population}
          onChange={handlePopulationChange}
        />
      </div>

      <div className="input-field">
        <label htmlFor="mortalityRateInput">Mortality Rate:</label>
        <input
          type="text"
          id="mortalityRateInput"
          value={mortalityRate}
          onChange={handleMortalityRateChange}
        />
      </div>

      <button onClick={handleCreate}>Create</button>

      <h4>Animals:</h4>
      <ul>
        {animals.map(animal => (
          <li key={animal.id}>
            {animal.species} - Population: {animal.population}, Mortality Rate: {animal.mortalityRate}
            <button onClick={() => handleDelete(animal.id)}>Delete</button>
            <button onClick={() => handleUpdate(animal.id, 'New Species', 'New Population', 'New Mortality Rate')}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ZooWidget;
