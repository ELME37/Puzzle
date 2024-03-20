import React, { useState } from 'react';
import FormNumberPieces from '../formNumberPieces';
import './styles.css';

function Modal({ isOpen, onClose, onFormSubmit }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isOpen) return null;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (formData) => {
    const { nombrePieces } = formData;
    if (nombrePieces && selectedImage) {
      onFormSubmit({ nombrePieces, selectedImage });
      onClose();
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  return (
    <div className="modal">
      <FormNumberPieces onFormSubmit={handleSubmit} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button className='modal__btn--close' onClick={onClose}>Fermer la modale</button>
    </div>
  );
}

export default Modal;
