import React, { useState } from 'react';
import Modal from '../../composants/modal';
import Puzzle from '../../composants/puzzle';
import Piece from '../../composants/piece';

import './styles.css';

export default function Game() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombrePieces, setNombrePieces] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [ratioImage, setRatioImage] = useState(null);

  const containerSize = 600;
  const pieceSize = 100;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    setNombrePieces(formData.nombrePieces);
    setImageUrl(URL.createObjectURL(formData.selectedImage));
    closeModal();

    // Créer une nouvelle image pour obtenir l'aspect ratio
    const img = new Image();
    img.src = URL.createObjectURL(formData.selectedImage);
    img.onload = () => {
      const aspectRatio = img.width - img.height;
      setRatioImage(aspectRatio);
    };
  };

  const handleDrag = (event) => {
  };

  const handleAllowDrop= (event) => {
    event.preventDefault();
  };

  function handleDrop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let target = event.target;
    
    if (target.classList.contains('puzzle__pieces--container') && target.children.length === 0) {
        target.appendChild(document.getElementById(data));
        
        // Récupérer les informations sur le conteneur de destination
        const containerSizeWidth = parseInt(getComputedStyle(target.parentElement).width);
        const containerSizeHeight = parseInt(getComputedStyle(target.parentElement).height);
        const numberPieces = nombrePieces;
        
        // Calculer la taille des pièces et la position du background
        const pieceSize = containerSizeWidth / numberPieces;
        const pieceSize2 = containerSizeHeight / numberPieces;

        const pieceIndex = parseInt(data.split('_')[1]); // Récupérer l'index de la pièce déplacée
        const rowIndex = Math.floor(pieceIndex / numberPieces); // Calculer la ligne de la pièce dans le conteneur source
        const colIndex = pieceIndex % numberPieces; // Calculer la colonne de la pièce dans le conteneur source
        
        // Calculer la position du background de la pièce dans le conteneur cible
        const backgroundPosX = -colIndex * pieceSize;
        const backgroundPosY = -rowIndex * pieceSize2;
        
        // Mettre à jour le style de la pièce déplacée
        document.getElementById(data).style.width = pieceSize + 'px';
        document.getElementById(data).style.height = pieceSize2 + 'px';
        document.getElementById(data).style.backgroundSize = containerSizeWidth + 'px ' + containerSizeHeight + 'px';
        document.getElementById(data).style.backgroundPosition = backgroundPosX + 'px ' + backgroundPosY + 'px';
    }
  }

  const totalPieces = nombrePieces * nombrePieces;

  return (
    <div className='game'>
      <h1 className='game__title'>Créer votre puzzle personnalisé</h1>
      <p>créer vos propres puzzle</p>
      <img className='miniature' src={imageUrl} alt="" />
      <button onClick={openModal}>Ouvrir le formulaire</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} onFormSubmit={handleFormSubmit} />
      {nombrePieces && (
        <Puzzle
          nombrePieces={nombrePieces}
          containerSize={containerSize}
          totalPieces={totalPieces}
          onDrop={handleDrop}
          allowDrop={handleAllowDrop}
          ratioImage={ratioImage}
        />
      )}
      <div className='container__pieces' onDragOver={handleDrag}>
        {Array.from({ length: totalPieces }).map((_, index) => {
          // Calcul des coordonnées x et y pour chaque pièce
          const x = index % nombrePieces;
          const y = Math.floor(index / nombrePieces);

          // Calcul de la position de fond pour chaque pièce
          const backgroundPositionX = -x * pieceSize + 'px';
          const backgroundPositionY = -y * pieceSize+ 'px';

          return (
            <Piece 
              key={index}
              id={`piece_${index}`}
              imageUrl={imageUrl}
              onDragStart={handleDrag}
              backgroundPosition={`${backgroundPositionX} ${backgroundPositionY}`}
              nombrePieces={nombrePieces}
              pieceSize={pieceSize}
            />
          );
        })}
      </div>
    </div>
  );
}
