import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const TOYS_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(TOYS_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch toys");
        return response.json();
      })
      .then(setToys)
      .catch((error) => console.error("Error loading toys:", error));
  }, []);

  function handleClick() {
    setShowForm((current) => !current);
  }

  function handleAddToy(newToy) {
    setToys((currentToys) => [...currentToys, newToy]);
  }

  function handleLikeToy(updatedToy) {
    setToys((currentToys) =>
      currentToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  function handleDeleteToy(deletedId) {
    setToys((currentToys) =>
      currentToys.filter((toy) => toy.id !== deletedId)
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;
