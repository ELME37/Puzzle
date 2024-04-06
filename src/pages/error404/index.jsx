import React, { useState } from 'react';
import './styles.css'; // Assurez-vous d'avoir un fichier CSS pour styliser votre composant

const DragAndDrop = () => {
  const [dragging, setDragging] = useState(false);

  const handleTouchStart = (e) => {
    setDragging(true);
    const touch = e.touches[0];
    e.currentTarget.style.position = 'absolute';
    e.currentTarget.style.left = `${touch.clientX - e.currentTarget.offsetWidth / 2}px`;
    e.currentTarget.style.top = `${touch.clientY - e.currentTarget.offsetHeight / 2}px`;
    e.currentTarget.style.transition = 'none'; // Désactiver les transitions pendant le déplacement pour une expérience plus fluide
    document.body.style.overflow = 'hidden'; // Désactiver le défilement du corps pendant le déplacement
  };

  const handleTouchMove = (e) => {
    if (dragging) {
      const touch = e.touches[0];
      e.currentTarget.style.left = `${touch.clientX - e.currentTarget.offsetWidth / 2}px`;
      e.currentTarget.style.top = `${touch.clientY - e.currentTarget.offsetHeight / 2}px`;
    }
  };

  const handleTouchEnd = (e) => {
    setDragging(false);
    e.currentTarget.style.transition = ''; // Rétablir les transitions une fois le déplacement terminé
    document.body.style.overflow = ''; // Rétablir le défilement du corps une fois le déplacement terminé
    // Ajoutez ici la logique pour gérer le relâchement de l'élément
  };

  return (
    <div className="drag-and-drop"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd} // Gérer le cas où le toucher est annulé
    >
      Drag me!
    </div>
  );
};

export default DragAndDrop;
