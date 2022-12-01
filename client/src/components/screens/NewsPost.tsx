import { Navigate, useParams } from 'react-router';
import { INew } from '../../models/INew';
import { useFetchAllNewsQuery, useFetchOneNewsQuery } from '../../services/news';
import { Container } from '../containers/Container';
import { Error } from '../Error/Error';
import { LatestPosts } from '../LatestPosts/LatestPosts';
import { SkeletonLatestPosts } from '../LatestPosts/SkeletonLatestPosts';
import { PageTitle } from '../PageTitle/PageTitle';
import { Post } from '../Post/Post';
import { SkeletonPost } from '../Post/SkeletonPost';

export const NewsPost = () => {
    const { id } = useParams();
    const { data: news, isLoading: isNewsLoading, error: newsError } = useFetchAllNewsQuery(0);
    const { data: newsItem, isLoading: isNewsItemLoading, error: newsItemError } = useFetchOneNewsQuery(Number(id));

    return (
        <Container>
            <PageTitle></PageTitle>
            { !isNewsItemLoading && !newsItem && <Navigate to={ '/'} replace/>}
            { isNewsItemLoading && <SkeletonPost/> }
            { newsItemError && <Error>Произошла ошибка при загрузке новости</Error> }
            { newsItem && <Post key={ newsItem.id } post={ newsItem }/> }

            { isNewsLoading && <SkeletonLatestPosts/> }     
            { newsError && <Error>Произошла ошибка при загрузке последних новостей</Error> }  
            { news &&
                <LatestPosts posts={ news.array.filter((newsItem: INew) => newsItem.id !== Number(id)) }/>
            }
        </Container>
    );
};