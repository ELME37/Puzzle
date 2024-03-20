import React, { useState } from 'react';

function FormNumberPieces({ onFormSubmit }) {
  const [nombrePieces, setNombrePieces] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ nombrePieces });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de pièces :
        <select
          value={nombrePieces}
          onChange={(e) => setNombrePieces(e.target.value)}
          required
        >
          <option value="">Sélectionnez le nombre de pièces</option>
          <option value="2">4 pièces</option>
          <option value="3">9 pièces</option>
          <option value="4">16 pièces</option>
          <option value="5">25 pièces</option>
          <option value="6">36 pièces</option>
          <option value="7">49 pièces</option>
          <option value="8">64 pièces</option>
          <option value="9">81 pièces</option>
          <option value="10">100 pièces</option>
        </select>
      </label>
      <br />
      <button type="submit">Soumettre</button>
    </form>
  );
}

export default FormNumberPieces;
