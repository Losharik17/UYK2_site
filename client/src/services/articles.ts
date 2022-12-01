import { IArticle, IArticlesObject } from './../models/IArticle';
import { serverApi } from './api';

export const articlesApi = serverApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllArticles: build.query<IArticlesObject, number>({
            query: (page_number = 1) => ({
                url: '/articles',
                params: {
                    page_number: page_number
                }
            }),
            providesTags: result => ['Articles']
        }),
        fetchOneArticle: build.query<IArticle, number>({
            query: (id) => ({
                url: `/article?id=${id}`,  
            }),
            providesTags: result => ['Articles']
        }),
    })
});

export const {
    useFetchAllArticlesQuery,
    useFetchOneArticleQuery
} = articlesApi;