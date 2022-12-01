import React from 'react';

export const SkeletonEventsItem = () => {

    return (
        <div className='event'>
            <div className='event__title skeleton skeleton-text'></div>
            <div className='event__date skeleton skeleton-text skeleton-text__body'></div>
        </div>
    );
};