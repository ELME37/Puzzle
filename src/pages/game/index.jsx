import React, {useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {DndContext} from '@dnd-kit/core';

import { setCurrentNumberPieces} from '../../features/gameSlice';

import Layout from '../../composants/layout';
import Puzzle from '../../composants/puzzle';
import Piece from '../../composants/piece';

import './styles.css';

export default function Game () {

  const dispatch = useDispatch();
  const game = useSelector(state => state.game);

  const divContainerRef = useRef(null);

  const [containerSize, setContainerSize] = useState(600);
  const [ratioImage, setRatioImage] = useState(null);
  const [numberPieces, setNumberPieces] = useState(game.currentNumberPieces);
  const [imageURL, setImageURL] = useState(game.currentImageUrl);
  const [totalPieces, setTotalPieces] = useState(numberPieces * numberPieces);

  console.log(totalPieces)

  const numberPiecesInit = game.initialNumberPieces;
  const imageURLInit = game.initialImageUrl;

  const totalPiecesInit = numberPiecesInit * numberPiecesInit;

  const numberPiecesTable = Array.from({ length: game.initialNumberPieces }, (_, index) => index);

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
  
  const resetPuzzle = () => {
    divContainerRef.current.innerHTML = '';
    setNumberPieces(0)
    setImageURL('')
  };

 const restartPuzzle = () => {
  setNumberPieces(numberPiecesInit)
  setImageURL(imageURLInit)

  for (let i = 0; i < totalPiecesInit; i++) {
    
    const x = i % numberPiecesInit;
    const y = Math.floor(i / numberPiecesInit);
    const backgroundPositionX = -x * pieceSize + 'px';
    const backgroundPositionY = -y * pieceSize + 'px';

      <Piece
        key={i}
        id={`piece_${i}`}
        imageUrl={imageURL}
        onDragStart={handleDrag}
        backgroundPosition={`${backgroundPositionX} ${backgroundPositionY}`}
        nombrePieces={numberPiecesInit}
        pieceSize={50}
      />
      setTotalPieces(prevTotalPieces => prevTotalPieces + 1);
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
            totalPieces={totalPiecesInit}
            onDrop={handleDrop}
            allowDrop={handleAllowDrop}
            ratioImage={ratioImage}
          />
        )}

        <div ref={divContainerRef}  className='container__pieces' onDragOver={handleDrag}>
          {Array.from({ length: totalPieces }).map((_, index) => {

            const x = index % numberPieces;
            const y = Math.floor(index / numberPieces);

            const backgroundPositionX = -x * pieceSize + 'px';
            const backgroundPositionY = -y * pieceSize+ 'px';

            return (
              <Piece 
                key={index}
                id={`piece_${index}`}
                imageUrl={imageURL}
                onDragStart={handleDrag}
                backgroundPosition={`${backgroundPositionX} ${backgroundPositionY}`}
                nombrePieces={numberPiecesInit}
                pieceSize={pieceSize}
              />
            );
          })}
        </div>
        </div>
        </DndContext>
    </Layout>
  );
};
