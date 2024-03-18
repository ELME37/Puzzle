import React, { useState } from 'react';
import Modal from '../../composants/modal';
import Puzzle from '../../composants/puzzle';
import Piece from '../../composants/piece';

import './styles.css';

export default function Game() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombreColonnes, setNombreColonnes] = useState('');
  const [nombreLignes, setNombreLignes] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // Mettre à jour les états après la soumission du formulaire
    setNombreColonnes(formData.nombreColonnes);
    setNombreLignes(formData.nombreLignes);
    closeModal();
  };

  // Calculer le nombre total de pièces en fonction du nombre de colonnes et de lignes
  const totalPieces = nombreColonnes * nombreLignes;

  // Utilisez les valeurs actuelles de nombreColonnes et nombreLignes dans votre JSX
  return (
    <div className='game'>
      <h1 className='game__title'>Créer votre puzzle personnalisé</h1>
      <button onClick={openModal}>Ouvrir le formulaire</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} onFormSubmit={handleFormSubmit} />
      {nombreColonnes && nombreLignes && (
        <Puzzle
          nombreColonnes={nombreColonnes}
          nombreLignes={nombreLignes}
        />
      )}
      <div className='container__pieces'>
        {Array.from({ length: totalPieces }).map((_, index) => (
          <Piece key={index} />
        ))}
      </div>
    </div>
  );
}
