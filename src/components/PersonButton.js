import React from 'react';

import './PersonButton.css';

export default function PersonButton({ onClick, className, disabled, text }) {
    return (
        <button
            className={`PersonButton ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
