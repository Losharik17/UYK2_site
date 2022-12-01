import React, { FC } from 'react';
import { IEvent } from '../../models/IEvent';
import { formatDate } from '../../utils/formatDate';
import { CustomLink } from '../CustomLink';

interface EventsItemProps {
    event: IEvent;
};

export const EventsItem: FC<EventsItemProps> = ({ event }) => {

    return (
        <div className='event'>
            <CustomLink to={ `/posts/events/${event.id}` } className='event__title'>
                { event.title }
            </CustomLink>
            { event.end_date ?
                <div className='event__date'>{ formatDate(event.start_date, true) } - { formatDate(event.end_date) }</div>
                :
                <div className='event__date'>{ formatDate(event.start_date, true) }</div>
            }
        </div>
    );
};