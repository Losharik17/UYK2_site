import React, { FC } from 'react';
import { INew } from '../../models/INew';
import { CustomLink } from '../CustomLink';

interface NewsItemProps {
    newsItem: INew;
};

export const NewsItem: FC<NewsItemProps> = ({ newsItem }) => {

    return (
        <CustomLink to={ `/posts/news/${newsItem.id}` } className="new">
            <div className="new__image">
                <img src={ newsItem.full_img_url } alt="Новость"/>
            </div>
            <div className="new__title">{ newsItem.title }</div>
        </CustomLink>
    );
};