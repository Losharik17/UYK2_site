import { Navigate, useParams } from 'react-router';
import { IArticle } from '../../models/IArticle';
import { useFetchAllArticlesQuery, useFetchOneArticleQuery } from '../../services/articles';
import { Container } from '../containers/Container';
import { Error } from '../Error/Error';
import { LatestPosts } from '../LatestPosts/LatestPosts';
import { SkeletonLatestPosts } from '../LatestPosts/SkeletonLatestPosts';
import { PageTitle } from '../PageTitle/PageTitle';
import { Post } from '../Post/Post';
import { SkeletonPost } from '../Post/SkeletonPost';

export const ArticlePost = () => {
    const { id } = useParams();
    const { data: articles, isLoading: isLastArticlesLoading, error: lastArticlesError } = useFetchAllArticlesQuery(0);
    const { data: articleItem, isLoading: isArticleLoading, error: articleItemError } = useFetchOneArticleQuery(Number(id));
    
    return (
        <Container>
            <PageTitle></PageTitle>
            { !isArticleLoading && !articleItem && <Navigate to={ '/'} replace/>}
            { isArticleLoading && <SkeletonPost/> }
            { articleItemError && <Error>Произошла ошибка при загрузке мероприятия</Error> }
            { articleItem && <Post key={ articleItem.id } post={ articleItem }/> }

            { isLastArticlesLoading && <SkeletonLatestPosts/> }   
            { lastArticlesError && <Error>Произошла ошибка при загрузке последних мероприятий</Error> }  
            { articles &&
                <LatestPosts posts={ articles.array.filter((article: IArticle) => article.id !== Number(id)) }/>
            }
        </Container>
    );
};