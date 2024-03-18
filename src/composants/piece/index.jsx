// src/components/PuzzleGame.js
import React from 'react';
import './styles.css';

export default function Piece ({ props }) {

  return (
    <div className="piece" 
        /*style={{
            backgroundImage: `url("${props.imageUrl}")`,
            backgroundPosition: `${-props.x * props.size}px ${-props.y * props.size}px`,
            width: `${props.size}px`,
            height: `${props.size}px`,
        }}
        draggable
        onDragStart={props.onDragStart}
        id={props.id}*/>
    </div>
  );
};
