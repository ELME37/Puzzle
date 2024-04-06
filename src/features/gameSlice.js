import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    initialNumberPieces : 0,
    initialImageUrl : '',

    currentNumberPieces : 0,
    currentImageUrl : ''
  },
  reducers: {

    /**
     * Initialise toute la configuration initale
     */
    setInitialConfiguration: (state, action) => {
      state.initialNumberPieces = action.payload.numbersPieces
      state.initialImageUrl = action.payload.imageUrl
      state.currentNumberPieces = action.payload.numbersPieces
      state.currentImageUrl = action.payload.imageUrl
    }, 

    /**
     * Modifier le nombre de pièce actuellement utilisé
     */
    setCurrentNumberPieces: (state, action) => {
      state.currentNumberPieces = action.payload.numbersPieces
      state.currentImageUrl = action.payload.imageUrl
    },
     // Sauvegarde localStorage, sessioStorage ou Cookies
  },
});

export const { 
  setInitialConfiguration,
  setCurrentNumberPieces
} = gameSlice.actions;
export default gameSlice.reducer;