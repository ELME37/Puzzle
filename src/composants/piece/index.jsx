import React from 'react';
import './styles.css';

export default function Piece ({id, imageUrl, onDragStart, backgroundPosition, nombrePieces, pieceSize }) {

    const handleDragStart = (event) => {
        onDragStart(event);
        event.dataTransfer.setData("text", event.target.id);
      };
      
  return (
    <div className="piece" 
        style={{
          '--nombre-pieces': nombrePieces,
          '--piece-size': pieceSize,
            backgroundImage: `url("${imageUrl}")`,
            backgroundPosition: backgroundPosition,
            backgroundOrigin: "border-box",
        }}
        id={id}
        draggable={true}
        onDragStart={handleDragStart}
        >
    </div>
  );
};
