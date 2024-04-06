import React from 'react';

import FormNumberPieces from '../../composants/formNumberPieces';

import logo1 from '../../assets/images/logo/logo11.png'
import logo2 from '../../assets/images/logo/logo12.png'
import logo3 from '../../assets/images/logo/logo21.png'
import logo4 from '../../assets/images/logo/logo22.png'

import Layout from '../../composants/layout';

import './styles.css';

export default function Home () {  
    return (
        <Layout>
            <div className='home'>
                <h1 className='home__title'>Créer votre puzzle personnalisé</h1>
                <div className='container__images'>
                    <img className='logo partie1' src={logo1} alt="logo" />
                    <img className='logo partie2' src={logo2} alt="logo" />
                    <img className='logo partie3' src={logo3} alt="logo" />
                    <img className='logo partie4' src={logo4} alt="logo" />
                </div>
                <FormNumberPieces/>
            </div>
        </Layout>
    );
};
