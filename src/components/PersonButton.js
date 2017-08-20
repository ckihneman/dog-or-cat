import React from 'react';

import './PersonButton.css';

export default function PersonButton({listId, text, onClick, disabled}) {
    return (
        <button
            className={`PersonButton PersonButton--${listId}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
