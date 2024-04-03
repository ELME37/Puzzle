import React from 'react';
import { useDrag } from 'react-dnd';
import './styles.css';

export default function Piece ({id, imageUrl, backgroundPosition, nombrePieces, pieceSize }) {

  const [{ isDragging }, drag] = useDrag({
    type: 'PIECE',
    item: { id, type: 'PIECE' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
      
  return (
    <div className={`piece ${isDragging ? 'piece--dragging' : ''}`}
        style={{
          '--nombre-pieces': nombrePieces,
          '--piece-size': pieceSize,
            backgroundImage: `url("${imageUrl}")`,
            backgroundPosition: backgroundPosition,
            backgroundOrigin: "border-box",
        }}
        id={id}
        ref={drag}
        >
    </div>
  );
};
