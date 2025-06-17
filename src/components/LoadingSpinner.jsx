import React from 'react';

export default function LoadingSpinner({ size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    return (
        <div role="status" className={`flex items-center justify-center ${className}`}>
            <div
                className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-my-cyan border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
                aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
        </div>
    );
}
