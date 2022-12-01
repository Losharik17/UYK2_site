import './Events.scss';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useFetchAllEventsQuery } from '../../services/events';
import { loadNewsVariants } from '../../constants/variants';
import { IEvent } from '../../models/IEvent';
import { SkeletonEventsItem } from './SkeletonEventsItem';
import { PosterWrapper } from '../PosterWrapper';
import { EventsItem } from './EventsItem';
import { Button } from '../Button/Button';
import { Error } from '../Error/Error';

export const Events = () => {
    const [ events, setEvents ] = useState<IEvent[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(0);
    const [ numberOfPages, setNumberOfPages ] = useState<number>(0);
    const { data: fetchedEvents , error, isLoading } = useFetchAllEventsQuery(currentPage);
    const skeletonEvents = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
    
    useEffect(() => {
        if (fetchedEvents) {
            if (!numberOfPages) {
                setNumberOfPages(fetchedEvents.number_pages)
            }
            setEvents([ ...events, ...fetchedEvents.array ])
        }
    }, [ fetchedEvents ]);
    
    const clickHandler = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <PosterWrapper title={ "Мероприятия" }>
            <div className="events">
                <div className="events__posts">
                    <ul className="events__list">
                        <AnimatePresence>
                            { error && <Error>Произошла ошибка при загрузке мероприятий</Error>}
                            { events && events.map((item, index) => {
                                return <motion.li 
                                        variants={ loadNewsVariants }
                                        initial={ 'hidden' }
                                        animate={ 'visible' }
                                        exit={ 'exit' }
                                        key={ item.id } 
                                        className="events__item"
                                    >
                                            <EventsItem event={ item }/>
                                    </motion.li>
                                    })}
                            { isLoading && skeletonEvents.map((skeleton, index) => {
                                return <SkeletonEventsItem key={ index }/>
                            }) }
                        </AnimatePresence>
                    </ul>
                    <Button onClick={ clickHandler } disabled={ isLoading || (currentPage + 1) > numberOfPages }>Все мероприятия</Button>
                </div>
            </div>
        </PosterWrapper>
            
    );
};