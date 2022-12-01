import './LatestPosts.scss';
import React from 'react';

export const SkeletonLatestPosts = () => {
    const posts = [ 1, 2, 3 ];
    
    return (
        <div className="latest-posts">
            <div className="latest-posts__title title">
                Последние новости
            </div>
            <ul className='latest-posts__list skelet'>
                { posts &&
                    posts.map((post) => {
                        return  <li key={ post } className="latest-posts__item latest-post skeleton">
                                <div className="latest-post__image">
                                </div>
                                <div className='latest-post__title'></div>
                            </li>
                    })
                }
            </ul>
        </div>
    );
};
