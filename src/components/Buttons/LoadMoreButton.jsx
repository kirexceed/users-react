import React from 'react';
import { useFetch } from '../../hooks/useFetch/useFetch';
import './Buttons.css';

export function LoadMoreButton({handler}) {
    
    return (
        <button className="refresh-button" onClick={handler}>Reload</button>
    )
}
