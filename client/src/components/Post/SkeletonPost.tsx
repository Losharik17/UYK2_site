import React from 'react';

export const SkeletonPost = () => {
    return (
        <div className='post'>
            <div className="post__title skeleton skeleton-text__body">
                <div className='title'></div>
            </div>
            <div className="post__image skeleton">
            </div>
            <div className="post__text  skeleton" >                      
            </div>
        </div>
    );
};
