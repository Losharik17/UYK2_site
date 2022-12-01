import { INewsObject } from './../models/INew';
import { serverApi } from './api';
import { INew } from '../models/INew';

export const newsApi = serverApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllNews: build.query<INewsObject, number>({
            query: (page_number = 1) => ({
                url: '/all_news',
                params: {
                    page_number: page_number
                }
            }),
            providesTags: result => ['News']
        }),
        fetchOneNews: build.query<INew, number>({
            query: (id) => ({
                url: `/news?id=${id}`,  
            }),
            providesTags: result => ['News']
        }),
    })
});

export const {
    useFetchAllNewsQuery,
    useFetchOneNewsQuery,
} = newsApi;