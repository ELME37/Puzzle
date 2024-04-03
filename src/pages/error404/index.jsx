import React, { useState, useEffect } from 'react';

function Formulaire() {
  // États pour le prénom, le nom et leurs copies initiales
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [prenomInit, setPrenomInit] = useState('');
  const [nomInit, setNomInit] = useState('');

  // Effet pour mettre à jour les copies initiales lors du montage du composant
  useEffect(() => {
    // Utilisation d'une fonction de rappel pour définir les valeurs initiales
    setPrenomInit(prevPrenom => prevPrenom || prenom);
    setNomInit(prevNom => prevNom || nom);
  }, [prenom, nom]);

  // Fonction pour réinitialiser les valeurs à leurs copies initiales
  const resetToInitialValues = () => {
    setPrenom(prenomInit);
    setNom(nomInit);
  };

  // Gestionnaires d'événements pour la modification du prénom et du nom
  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleClear = () => {
    setPrenom('')
    setNom('')
  };

  const handleClearInit = () => {
    setPrenomInit('')
    setNomInit('')
  };

  const handleNomandPrenom = () => {
    console.log(nom, prenom)
    console.log(nomInit, prenomInit)
  };

  return (
    <div>
      <form>
        <label htmlFor="prenom">Prénom :</label>
        <input
          type="text"
          id="prenom"
          value={prenom}
          onChange={handlePrenomChange}
        />
        <br />
        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={handleNomChange}
        />
      </form>
      <button onClick={resetToInitialValues}>Réinitialiser</button>
      <button onClick={handleNomandPrenom}>Soumettre</button>
      <button onClick={handleClear}>Vider les données</button>
      <button onClick={handleClearInit}>Vider les données initiales</button>
    </div>
  );
}

export default Formulaire;
