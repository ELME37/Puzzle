import React from 'react';
import { useDrop } from 'react-dnd';
import './styles.css';

export default function Puzzle({ nombrePieces, containerSize, totalPieces, ratioImage }) {

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

  const [{ isOver }, drop] = useDrop({
    // Spécifiez le type d'élément que le conteneur Puzzle peut accepter
    accept: 'PIECE',
    // Fonction appelée lorsqu'un élément est déposé sur le conteneur Puzzle
    drop: (item, monitor) => {
      // Vérifiez si le conteneur Puzzle est vide et si le drop est autorisé
      if (monitor.canDrop() && !item.alreadyDropped) {
        // Mettez à jour l'état de la pièce pour indiquer qu'elle a été déposée
        item.alreadyDropped = true;
        // Faites quelque chose avec la pièce déposée, par exemple, ajoutez-la à un tableau ou mettez à jour l'état de votre application
        console.log('Piece dropped:', item.id);
        alert("test")
      }
    },
    // Fonction de collecte pour récupérer les informations sur le drop
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className={`puzzle ${isOver ? 'puzzle--over' : ''}`}
      style={{
        '--nombre-pieces': nombrePieces,
        '--container-size': containerSize,
        '--ratio-image': aspectRatio,
      }}
      ref={drop}
    >
      {Array.from({ length: totalPieces }).map((_, index) => (
          <div key={index} 
            className="puzzle__pieces--container"
            id={`puzzle_${index}`}
          >
          </div>
        ))}
    </div>
  );
}
