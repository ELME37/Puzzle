import React, {useState} from 'react';
import './styles.css';

export default function Piece ({id, imageUrl, onDragStart, backgroundPosition, nombrePieces, pieceSize }) {
  const [dragging, setDragging] = useState(false);

    const handleDragStart = (event) => {
        onDragStart(event);
        event.dataTransfer.setData("text", event.target.id);
        event.currentTarget.classList.add('dragging');
      };
      
    const handleDragEnd = (event) => {
      setDragging(false);
      event.currentTarget.classList.remove('dragging');
    };
    
  return (
    <div className={`piece ${dragging ? 'dragging' : ''}`} 
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
        onDragEnd={handleDragEnd}
        >
    </div>
  );
};
