import React from 'react';
import './styles.css';

export default function Puzzle({ nombreColonnes, nombreLignes }) {

  return (
    <div
      className="puzzle"
      style={{
        '--nombre-colonnes': nombreColonnes,
        '--nombre-lignes': nombreLignes,
      }}
    >
    </div>
  );
}