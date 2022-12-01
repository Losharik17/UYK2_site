import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../containers/Container';
import { Article } from '../Article/Article';
import { Button } from '../Button/Button';
import { useFetchAllArticlesQuery } from '../../services/articles';
import { SkeletonArticle } from '../Article/SkeletonArticle';
import { IArticle } from '../../models/IArticle';
import { PosterWrapper } from '../PosterWrapper';
import { loadNewsVariants } from '../../constants/variants';

export const Science = () => {
    const [ articles, setArticles ] = useState<IArticle[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(0);
    const [ numberOfPages, setNumberOfPages ] = useState<number>(0);
    const { data: fetchedArticles, isLoading } = useFetchAllArticlesQuery(currentPage);
    const array = [ 1, 2, 3, 4 ];

    useEffect(() => {
        if (!fetchedArticles) {
            return;
        };
        if (!numberOfPages) {
            setNumberOfPages(fetchedArticles.number_pages);
        }
        setArticles([ ...articles, ...fetchedArticles.array ])
    }, [ fetchedArticles ]);

    const clickHandler = () => {
        setCurrentPage(page => page + 1);
    };

    return (
        <Container>
            <PosterWrapper title='Научная деятельность'>          
                <ul className="articles">
                    { articles &&
                        articles.map((article: IArticle, index: number) => {
                            return <motion.li
                                key={ article.id }
                                variants={ loadNewsVariants }
                                initial={ 'hidden' }
                                animate={ 'visible' }
                                exit={ 'exit' }
                            >
                                <Article article={ article } isLoading={ isLoading }/>
                            </motion.li>
                        }) 
                    }
                    { isLoading && 
                        <>
                            { array.map((item, index) => {
                                return <SkeletonArticle key={ index }/>
                            })}
                        </>         
                    }
                    <Button onClick={ clickHandler } disabled={ isLoading || (currentPage + 1) > numberOfPages }>Еще статьи</Button>
                </ul>
            </PosterWrapper>
        </Container>
    );
};