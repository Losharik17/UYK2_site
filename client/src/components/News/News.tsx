import './News.scss';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {  useFetchAllNewsQuery } from '../../services/news';
import { loadNewsVariants } from '../../constants/variants';
import { INew } from '../../models/INew';
import { NewsItem } from './NewsItem';
import { Button } from '../Button/Button';
import { Error } from '../Error/Error';
import { SkeletonNewsItem } from './SkeletonNewsItem';
import { PosterWrapper } from '../PosterWrapper';

export const News = () => {
    const [ news, setNews ] = useState<INew[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(0);
    const [ numberOfPages, setNumberOfPages ] = useState<number>(0);
    const { data: fetchedNews, isLoading, error } = useFetchAllNewsQuery(currentPage);
    const skeletonNews = [ 1, 2, 3, 4, 5, 6 ];
    useEffect(() => {
        if (!fetchedNews) {
            return;
        }
        if (!numberOfPages) {
            setNumberOfPages(fetchedNews.number_pages)
        }
        setNews([ ...news, ...fetchedNews.array]);
    }, [ fetchedNews ]);

    const clickHandler = () => {
        setCurrentPage(page => page + 1);
    }

    return (
        <PosterWrapper title={ 'Новости' }>
            <div className="news">
                <div className="news__posts">
                    <ul className="news__list">
                        <AnimatePresence>
                            { isLoading && skeletonNews.map((skeleton, index) => {
                                return <SkeletonNewsItem key={ index }/>
                            })}
                            { error && <Error>Произошла ошибка при загрузке новостей</Error>}
                            { news.map((item, index) => {
                                return  <motion.li 
                                    key={ item.id }
                                    variants={ loadNewsVariants }
                                    initial={ 'hidden' }
                                    animate={ 'visible' }
                                    exit={ 'exit' }
                                >
                                    <NewsItem newsItem={ item }/> 
                                </motion.li>
                            }) }
                        </AnimatePresence>
                    </ul>
                    <Button onClick={ clickHandler } disabled={ isLoading || (currentPage + 1) > numberOfPages }>Еще новости</Button>
                </div>  
            </div>
        </PosterWrapper>
    );
};

