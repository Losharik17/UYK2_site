import './Article.scss';
import React, { FC } from 'react';
import { IArticle } from '../../models/IArticle';
import { CustomLink } from '../CustomLink';


interface ArticleProps {
    article: IArticle;
    isLoading: boolean;
};

export const Article: FC<ArticleProps> = ({ article }) => {

    return (
        <CustomLink to={ `/posts/articles/${article.id}` } className="science__article article">
            <div className="article__content">
                <div  className="article__title">
                    <div>
                        { article.title }
                    </div>
                </div>
                <div className="article__image">
                    <img src={ article.full_img_url } alt=""/>
                </div>
                {/* <div className="article__text" dangerouslySetInnerHTML={{ __html: article.text }}/> */}
            </div>
        </CustomLink>
    );
};