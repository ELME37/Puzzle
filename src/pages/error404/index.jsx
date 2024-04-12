import React, { useState } from 'react';

import './styles.css'

const Error404 = () => {
  const [numberPieces, setNumberPieces] = useState(2);
  const [totalPieces, setTotalPieces] = useState(numberPieces * numberPieces);

  const createPiece = (id) => {
    const p = document.createElement('p');
    p.textContent = id;
    p.id = id;
    return p;
  };

  const modification = () => {
    const container = document.querySelector('.containerPieces');
    const pieces = container.querySelectorAll('p');
    pieces.forEach(piece => container.removeChild(piece));
  };

  const reset = () => {
    const container = document.querySelector('.containerPieces');
    container.innerHTML = '';
    for (let i = 1; i <= totalPieces; i++) {
      container.appendChild(createPiece(i));
    }
  };

  return (
    <div className='error404'>
      <div className='containerPieces'>
      {Array.from({ length: totalPieces }).map((_, index) => (
        <p id={index + 1} key={index + 1}>{index + 1}</p>
      ))}
      </div>
      <button onClick={modification}>modification</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};

export default Error404;
