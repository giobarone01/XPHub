import { useState } from 'react';

export default function TouchFeedback({ children, className, activeClassName, onClick, delayMs = 200, ...props }) {
    const [isActive, setIsActive] = useState(false);

    const handleTouchStart = () => {
        setIsActive(true);
    };

    const handleTouchEnd = () => {
        setTimeout(() => {
            setIsActive(false);
        }, 150);
    };

    const handleClick = (e) => {
        if (onClick) {
            setIsActive(true);
            setTimeout(() => {
                onClick(e);
            }, delayMs);
        }
    };

    return (
        <div
            className={`${className} ${isActive ? activeClassName : ''}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onClick={handleClick}
            {...props}
        >
            {children}
        </div>
    );
}