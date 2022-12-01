import React from 'react';

export const SkeletonNewsItem = () => {
    return (
        <div>
            <div className="new__image skeleton"></div>
            <div className="new__title skeleton skeleton-text"></div>
        </div>
    );
};