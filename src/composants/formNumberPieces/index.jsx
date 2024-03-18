import React, { useState } from 'react';

function FormNumberPieces({ onFormSubmit }) {
  const [nombreColonnes, setNombreColonnes] = useState('');
  const [nombreLignes, setNombreLignes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ nombreColonnes, nombreLignes });
    console.log(nombreColonnes, nombreLignes)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de colonnes :
        <input
          type="number"
          value={nombreColonnes}
          onChange={(e) => setNombreColonnes(e.target.value)}
          required
          min={2}
          max={20}
        />
      </label>
      <br />
      <label>
        Nombre de lignes :
        <input
          type="number"
          value={nombreLignes}
          onChange={(e) => setNombreLignes(e.target.value)}
          required
          min={2}
          max={20}
        />
      </label>
      <br />
      <button type="submit">Soumettre</button>
    </form>
  );
}

export default FormNumberPieces;
