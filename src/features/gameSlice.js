import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    initialNumberPieces : 0,
    initialImageUrl : '',
  },
  reducers: {

    /**
     * Initialise toute la configuration initale
     */
    setInitialConfiguration: (state, action) => {
      state.initialNumberPieces = action.payload.numbersPieces
      state.initialImageUrl = action.payload.imageUrl
    }, 

    /**
     * Modifier le nombre de pièce actuellement utilisé
     */

     // Sauvegarde localStorage, sessioStorage ou Cookies
  },
});

export const { 
  setInitialConfiguration,
  setCurrentNumberPieces
} = gameSlice.actions;
export default gameSlice.reducer;