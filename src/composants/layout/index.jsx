import React from 'react';
import './styles.css';

export default function Layout ({children}){
    return (
    <div className="container">
        {children}
    </div>)
}