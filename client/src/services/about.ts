import { IAbout } from '../models/IAbout';
import { serverApi } from './api';

export const aboutApi = serverApi.injectEndpoints({
    endpoints: (build) => ({
        fetchDescription: build.query<IAbout, number>({
            query: () => ({
                url: `/text/short_description`,  
            }),
            providesTags: result => ['About']
        }),
        fetchAbout: build.query<IAbout, number>({
            query: () => ({
                url: `/text/about`,  
            }),
            providesTags: result => ['About']
        }),
    })
});

export const {
    useFetchDescriptionQuery,
    useFetchAboutQuery
} = aboutApi;