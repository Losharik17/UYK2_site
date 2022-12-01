import './Article.scss';
import React, { FC } from 'react';

export const SkeletonArticle: FC = () => {

    return (
        <div className="science__article article">
            <div className="article__content">
                <div  className="article__title skeleton"></div>
                <div className="article__image skeleton"></div>
            </div>
        </div>
    );
};