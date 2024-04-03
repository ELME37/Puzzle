import React, { useState, useEffect } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

import Modal from '../../composants/modal';
import Puzzle from '../../composants/puzzle';
import Piece from '../../composants/piece';

import './styles.css';

export default function Game() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombrePiecesInit, setNombrePiecesInit] = useState('');
  const [imageUrlInit, setImageUrlInit] = useState(null);
  const [nombrePieces, setNombrePieces] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [ratioImage, setRatioImage] = useState(null);
  const [containerSize, setContainerSize] = useState(600);

  const maxWidth = 600;
  const pieceSize = 100;

  let aspectRatio = '';
 
  if (ratioImage >= 0) {
    if (ratioImage <= 50) {
      aspectRatio = 1/1;
    } else {
      aspectRatio = 9/16;
    }
  } else {
    aspectRatio = 4/3;
  }

  useEffect(() => {
    setNombrePiecesInit(prevNomberPieces => prevNomberPieces || nombrePieces);
    setImageUrlInit(prevImageUrl => prevImageUrl || imageUrl);
  }, [nombrePieces, imageUrl]);

  useEffect(() => {
  
    const updateContainerSize = () => {
      const size = Math.min(Math.floor(1 * window.innerWidth), maxWidth);
      setContainerSize(size);
    };

    updateContainerSize();

    window.addEventListener('resize', updateContainerSize);

    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };

  }, []);

  useEffect(() => {

    if (nombrePieces && containerSize) {
      const pieceElements = document.querySelectorAll('.piece');
      pieceElements.forEach((pieceElement) => {
        const pieceIndex = parseInt(pieceElement.id.split('_')[1]);
        const rowIndex = Math.floor(pieceIndex / nombrePieces);
        const colIndex = pieceIndex % nombrePieces;
        const pieceParent = pieceElement.parentElement;
        
        if (pieceParent.classList.contains('puzzle__pieces--container')) {
          const containerSizeWidth = containerSize;
          const containerSizeHeight = containerSize * aspectRatio;
          const numberPieces = nombrePieces;
  
          const pieceSize = containerSizeWidth / numberPieces;
          const pieceSize2 = containerSizeHeight / numberPieces;
  
          const backgroundPosX = -colIndex * pieceSize;
          const backgroundPosY = -rowIndex * pieceSize2;
  
          pieceElement.style.width = pieceSize + 'px';
          pieceElement.style.height = pieceSize2 + 'px';
          pieceElement.style.backgroundSize = containerSizeWidth + 'px ' + containerSizeHeight + 'px';
          pieceElement.style.backgroundPosition = backgroundPosX + 'px ' + backgroundPosY + 'px';
        } else {

          const containerSizeWidth = pieceSize;
          const containerSizeHeight = pieceSize * aspectRatio;
  
          const pieceSizeWidth = containerSizeWidth;
          const pieceSizeHeight = containerSizeHeight;
  
          const backgroundPosX = -colIndex * pieceSizeWidth;
          const backgroundPosY = -rowIndex * pieceSizeHeight;
  
          pieceElement.style.width = pieceSizeWidth + 'px';
          pieceElement.style.height = pieceSizeHeight + 'px';
          pieceElement.style.backgroundPosition = backgroundPosX + 'px ' + backgroundPosY + 'px';
        }
      });
    }
  }, [containerSize, nombrePieces, aspectRatio]);

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

    const img = new Image();
    img.src = URL.createObjectURL(formData.selectedImage);
    img.onload = () => {
      const aspectRatio = img.width - img.height;
      setRatioImage(aspectRatio);
    };
  };

  const restartPuzzle = () => {
    setNombrePieces(nombrePiecesInit);
    setImageUrl(imageUrlInit)
  };

  const resetPuzzle = () => {
    setNombrePieces('');
    setImageUrl(null)
  };
  
  const totalPieces = nombrePieces * nombrePieces;

  return (
    <DndProvider backend={HTML5Backend}>
    <div className='game'>
      <h1 className='game__title'>Créer votre puzzle personnalisé</h1>
      <p>créer vos propres puzzle</p>
      <button onClick={restartPuzzle}>Recommencer</button>
      <button onClick={resetPuzzle}>Réinitialiser le puzzle</button>
      <button onClick={openModal}>Ouvrir le formulaire</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} onFormSubmit={handleFormSubmit} />
      {nombrePieces && (
        <Puzzle
          nombrePieces={nombrePieces}
          containerSize={containerSize}
          totalPieces={totalPieces}
          ratioImage={ratioImage}
        />
      )}
      <div className='container__pieces'>
        {Array.from({ length: totalPieces }).map((_, index) => {

          const x = index % nombrePieces;
          const y = Math.floor(index / nombrePieces);

          const backgroundPositionX = -x * pieceSize + 'px';
          const backgroundPositionY = -y * pieceSize+ 'px';

          return (
            <Piece 
              key={index}
              id={`piece_${index}`}
              imageUrl={imageUrl}
              backgroundPosition={`${backgroundPositionX} ${backgroundPositionY}`}
              nombrePieces={nombrePieces}
              pieceSize={pieceSize}
            />
          );
        })}
      </div>
    </div>
    </DndProvider>
  );
}
