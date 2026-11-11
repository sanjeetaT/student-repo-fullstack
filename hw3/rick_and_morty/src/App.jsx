
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Request API data, retrying if it fails
async function getData(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Could not load data');
      return await response.json();
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
}

// Get the first 100 characters
async function getCharacters() {
  const characters = [];

  for (let page = 1; page <= 5; page++) {
    const data = await getData(`/api/character?page=${page}`);
    characters.push(...data.results);
  }

  return characters;
}

// Get all locations
async function getLocations() {
  const locations = [];
  let page = 1;
  let next = true;

  while (next) {
    const data = await getData(`/api/location?page=${page}`);
    locations.push(...data.results);
    next = data.info.next;
    page++;
  }

  return locations;
}

// Home page
function Home() {
  return (
    <div>
      <h2>Welcome to Rick and Morty Explorer!</h2>
      <p>Explore characters, species, and locations.</p>
    </div>
  );
}

// Here is the Characters page
function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters().then(setCharacters).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Characters</h2>
      <p>Total characters: {characters.length}</p>

      <div className="character-grid">
        {characters.map((character) => (
          <div className="character-card" key={character.id}>
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Species page
function Species() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters().then(setCharacters).catch(console.error);
  }, []);

  const groups = {};

  characters.forEach((character) => {
    const species = character.species || 'Unknown';

    if (!groups[species]) groups[species] = [];
    groups[species].push(character.name);
  });

  return (
    <div>
      <h2>Characters by Species</h2>

      {Object.entries(groups).map(([species, names]) => (
        <div className="info-card" key={species}>
          <h3>{species}: {names.length}</h3>
          <ul>
            {names.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Locations page
function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then(setLocations).catch(console.error);
  }, []);

  const counts = {};

  locations.forEach((location) => {
    const type = location.type || 'Unknown';
    counts[type] = (counts[type] || 0) + 1;
  });

  return (
    <div>
      <h2>Locations by Type</h2>
      <p>Total locations: {locations.length}</p>

      {Object.entries(counts).map(([type, count]) => (
        <div className="info-card" key={type}>
          <h3>{type}</h3>
          <p>Number of locations: {count}</p>
        </div>
      ))}
    </div>
  );
}

// Main App
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>Rick and Morty API Project</h1>

        <nav>
          <Link to="/home">Home</Link>
          <Link to="/characters">Characters</Link>
          <Link to="/species">Species</Link>
          <Link to="/locations">Locations</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/species" element={<Species />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
