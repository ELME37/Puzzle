import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setInitialConfiguration } from '../../features/gameSlice';
import routes from '../../router/routes';

import './styles.css';

export default function FormNumberPieces() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [numberPieces, setNumberPieces] = useState('');
  const [pieceImage, setPieceImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (numberPieces && pieceImage) {
      dispatch(setInitialConfiguration({
        numbersPieces:numberPieces,
        imageUrl: URL.createObjectURL(pieceImage),
      }));
      navigate(routes.game)

    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setPieceImage(file);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label>
        Nombre de pièces :
        <select
          value={numberPieces}
          onChange={(e) => setNumberPieces(e.target.value)}
          required
        >
          <option value="" disabled>Nbre de pièces</option>
          <option value="2">4 pièces</option>
          <option value="3">9 pièces</option>
          <option value="4">16 pièces</option>
          <option value="5">25 pièces</option>
          <option value="6">36 pièces</option>
          <option value="7">49 pièces</option>
          <option value="8">64 pièces</option>
          <option value="9">81 pièces</option>
          <option value="10">100 pièces</option>
        </select>
      </label>
      <br />
      <input type="file" accept="image/*" required onChange={handleImageChange} />
      <button className='buttonForm' type="submit">Jouer</button>
    </form>
  );
}
