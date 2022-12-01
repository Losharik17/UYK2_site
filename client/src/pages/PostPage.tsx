import React from 'react';
import { useMatch } from 'react-router';
import { Main } from '../components/containers/Main';
import { ArticlePost } from '../components/screens/ArticlePost';
import { EventPost } from '../components/screens/EventsPost';
import { NewsPost } from '../components/screens/NewsPost';

export const PostPage = () => {
    const matchToEvents = useMatch({ path: '/posts/events/:id' });
    const matchToNews = useMatch({ path: '/posts/news/:id' });
    return (
        <Main>
            {   matchToEvents ? <EventPost/> :
                matchToNews ? <NewsPost/> :
                <ArticlePost/>
            }
        </Main>
    );
};

