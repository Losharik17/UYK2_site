import { Navigate, useParams } from 'react-router';
import { IEvent } from '../../models/IEvent';
import { useFetchAllEventsQuery, useFetchOneEventQuery } from '../../services/events';
import { Container } from '../containers/Container';
import { Error } from '../Error/Error';
import { LatestPosts } from '../LatestPosts/LatestPosts';
import { SkeletonLatestPosts } from '../LatestPosts/SkeletonLatestPosts';
import { PageTitle } from '../PageTitle/PageTitle';
import { Post } from '../Post/Post';
import { SkeletonPost } from '../Post/SkeletonPost';

export const EventPost = () => {
    const { id } = useParams();
    const { data: events, isLoading, error: eventsError } = useFetchAllEventsQuery(0);
    const { data: eventItem, isLoading: isEventLoading, error: eventItemError } = useFetchOneEventQuery(Number(id));

    return (
        <Container>
            <PageTitle></PageTitle>
            { !isEventLoading && !eventItem && <Navigate to={ '/'} replace/>}
            { isEventLoading && <SkeletonPost/> }
            { eventItemError && <Error>Произошла ошибка при загрузке мероприятия</Error> }
            { eventItem && <Post key={ eventItem.id } post={ eventItem }/> }

            { isLoading && <SkeletonLatestPosts/> }   
            { eventsError && <Error>Произошла ошибка при загрузке последних мероприятий</Error> }  
            { events &&
                <LatestPosts posts={ events.array.filter((event: IEvent) => event.id !== Number(id)) }/>
            }
        </Container>
    );
};