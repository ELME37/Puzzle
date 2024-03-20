import React from 'react';
import './styles.css';

export default function Puzzle({ nombrePieces, containerSize, totalPieces, onDrop, allowDrop, ratioImage }) {

  let aspectRatio = '';
 
  if (ratioImage >= 0) {
    if (ratioImage <= 50) {
      aspectRatio = '1/1';
    } else {
      aspectRatio = '9/16';
    }
  } else {
    aspectRatio = '4/3';
  }
  
  return (
    <div className="puzzle"
      style={{
        '--nombre-pieces': nombrePieces,
        '--container-size': containerSize,
        '--ratio-image': aspectRatio,
      }}
    >
      {Array.from({ length: totalPieces }).map((_, index) => (
          <div key={index} 
            className="puzzle__pieces--container"
            id={`puzzle_${index}`}
            onDrop={onDrop}
            onDragOver={allowDrop}>
          </div>
        ))}
    </div>
  );
}