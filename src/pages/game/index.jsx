import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {DndContext} from '@dnd-kit/core';

import Layout from '../../composants/layout';
import Puzzle from '../../composants/puzzle';
import Piece from '../../composants/piece';

import './styles.css';

export default function Game () {

  const game = useSelector(state => state.game);

  const [containerSize, setContainerSize] = useState(600);
  const [ratioImage, setRatioImage] = useState(null);

  const numberPieces = game.initialNumberPieces;
  const imageURL= game.initialImageUrl;
  const totalPieces = numberPieces * numberPieces;

  const maxWidth = 600;
  const pieceSize = 100; 


  
  const img = new Image();
  img.src = imageURL;
  img.onload = () => {
    const aspectRatio = img.width - img.height;
    setRatioImage(aspectRatio)
  };
 

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
      const containers = document.querySelectorAll('.puzzle__pieces--container');
      containers.forEach(container => {
        container.style.border = 'none';
      });
  
      target.appendChild(document.getElementById(data));
  
      const pieceId = parseInt(data.split('_')[1]);
      const containerId = parseInt(target.id.split('_')[1]);
      
      if (pieceId === containerId) {
        target.style.border = '2px solid yellow';
      }
    }
  }

  const createPiece = (index) => {
    const x = index % numberPieces;
    const y = Math.floor(index / numberPieces);
    const backgroundPositionX = -x * pieceSize + 'px';
    const backgroundPositionY = -y * pieceSize + 'px';

    return (
      <Piece
        key={index}
        id={`piece_${index}`}
        imageUrl={imageURL}
        onDragStart={handleDrag}
        backgroundPosition={`${backgroundPositionX} ${backgroundPositionY}`}
        nombrePieces={numberPieces}
        pieceSize={pieceSize}
      />
    );
  };
  
  const resetPuzzle = () => {
    const container = document.querySelector('.container__pieces');
    const pieces = container.querySelectorAll('div');
    pieces.forEach(piece => container.removeChild(piece));
  };

  const restartPuzzle = () => {
    const container = document.querySelector('.container__pieces');
    container.innerHTML = '';
  
    for (let i = 1; i <= totalPieces; i++) {
      const pieceElement = createPiece(i);
      container.appendChild(pieceElement);
    }
  };

  const endPuzzle = () => {
    
  };

  return (
    <Layout>
      <DndContext>
        <div className='game'>
          <button onClick={resetPuzzle}>reset</button>
          <button onClick={restartPuzzle}>restart</button>
          {numberPieces && (
          <Puzzle
            nombrePieces={numberPieces}
            containerSize={containerSize}
            totalPieces={totalPieces}
            onDrop={handleDrop}
            allowDrop={handleAllowDrop}
            ratioImage={ratioImage}
          />
        )}

        <div className='container__pieces' onDragOver={handleDrag}>
            {Array.from({ length: totalPieces }).map((_, index) => (
              createPiece(index)
            ))}
        </div>
        </div>
        </DndContext>
    </Layout>
  );
};
