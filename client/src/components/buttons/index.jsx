import React from 'react';

export default function Buttons({ onClickHandler, value, title, className }) {
    const handleClick = (event) => {
        // Ensure value is passed correctly to the handler
        if (onClickHandler) {
            // Create a synthetic event with the value if needed
            const syntheticEvent = {
                ...event,
                target: {
                    ...event.target,
                    value: value || event.target.value,
                },
                currentTarget: {
                    ...event.currentTarget,
                    value: value || event.currentTarget.value,
                },
            };
            onClickHandler(syntheticEvent);
        }
    };

    return (
        <button onClick={handleClick} value={value} className={className}>
            {title}
        </button>
    );
}

