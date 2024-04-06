import React, { useState, useRef } from 'react';

function Test() {
  const initialTotalPieces = 5;
  const [totalPieces, setTotalPieces] = useState(initialTotalPieces);
  const divRefs = useRef([]);

  const handleInit = () => {
    // Supprime toutes les div existantes
    divRefs.current.forEach(div => div.remove());

    // Crée le nombre initial de div
    for (let i = 0; i < initialTotalPieces; i++) {
      const newDiv = document.createElement("div");
      newDiv.textContent = `Div ${i + 1}`;
      divRefs.current.push(newDiv);
      document.body.appendChild(newDiv);
    }

    setTotalPieces(initialTotalPieces);
  };

  const handleCreateDiv = () => {
    // Crée une nouvelle div
    const newDiv = document.createElement("div");
    newDiv.textContent = `Div ${totalPieces + 1}`;
    divRefs.current.push(newDiv);
    document.body.appendChild(newDiv);
    setTotalPieces(prevTotalPieces => prevTotalPieces + 1);
  };

  const handleRemoveDiv = () => {
    // Supprime la dernière div
    if (totalPieces > 0) {
      const lastDiv = divRefs.current.pop();
      lastDiv.remove();
      setTotalPieces(prevTotalPieces => prevTotalPieces - 1);
    }
  };

  return (
    <div>
      <button onClick={handleInit}>Init</button>
      <button onClick={handleCreateDiv}>Créer une div</button>
      <button onClick={handleRemoveDiv}>Supprimer une div</button>
    </div>
  );
}

export default Test;
