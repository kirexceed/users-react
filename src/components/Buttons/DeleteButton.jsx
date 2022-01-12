import React from 'react';
import './Buttons.css';

export default function DeleteButton({click}) {
    return (
        <div onClick={click} className="button-delete">&#215;</div>
    )
}
