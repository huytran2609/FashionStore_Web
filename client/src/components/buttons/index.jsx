import React from 'react';

export default function Buttons({ onClickHandler, value, title, className }) {
    return (
        <button onClick={onClickHandler} value={value} className={className}>
            {title}
        </button>
    );
}

