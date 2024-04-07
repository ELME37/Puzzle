import React from 'react';
import './styles.css';

export default function Piece ({id, imageUrl, onDragStart, backgroundPosition, nombrePieces, pieceSize }) {

    const handleDragStart = (event) => {
        onDragStart(event);
        event.dataTransfer.setData("text", event.target.id);
      };

      const handleTouchStart = (event) => {
        // Logique pour gérer le début de l'action tactile
    };

    const handleTouchMove = (event) => {
        // Logique pour gérer le mouvement tactile
    };

    const handleTouchEnd = (event) => {
        // Logique pour gérer la fin de l'action tactile
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
        onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
    </div>
  );
};
