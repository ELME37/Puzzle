import React, {useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {DndContext} from '@dnd-kit/core';

import { setCurrentNumberPieces} from '../../features/gameSlice';

import Layout from '../../composants/layout';
import Puzzle from '../../composants/puzzle';
import Piece from '../../composants/piece';

import './styles.css';

export default function Game () {
  const [containerSize, setContainerSize] = useState(600);
  const [ratioImage, setRatioImage] = useState(null);
  const divContainerRef = useRef(null);

  const dispatch = useDispatch();
  const game = useSelector(state => state.game);
  const numberPiecesInit = game.initialNumberPieces;
  const imageURLInit = game.initialImageUrl;
  const numberPieces = game.currentNumberPieces;
  const imageURL = game.currentImageUrl;
  const numberPiecesTable = Array.from({ length: game.initialNumberPieces }, (_, index) => index);
  const totalPiecesInit = game.initialNumberPieces * game.initialNumberPieces;

  const [totalPieces, setTotalPieces] = useState(numberPieces * numberPieces);

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
        target.appendChild(document.getElementById(data));
    }
    console.log('fonction handledrop')
  };

  const resetPuzzle = () => {
    dispatch(setCurrentNumberPieces({
      numbersPieces: '',
      imageUrl: '',
    }));

    divContainerRef.current.innerHTML = '';
  };

 const restartPuzzle = () => {
  dispatch(setCurrentNumberPieces({
    numbersPieces: numberPiecesInit,
    imageUrl: imageURLInit,
  }));

  divContainerRef.current.innerHTML = '';

  // Crée le nombre initial de pièces et les ajoute au conteneur
  for (let i = 0; i < numberPiecesInit * numberPiecesInit; i++) {
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
        pieceSize={pieceSize}
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
