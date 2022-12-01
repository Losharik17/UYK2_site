import { serverApi } from './api';
import { IEvent, IEventsObject } from '../models/IEvent';

export const eventsApi = serverApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllEvents: build.query<IEventsObject, number>({
            query: (page_number = 1) => ({
                url: '/events',
                params: {
                    page_number: page_number
                }
            }),
            providesTags: result => ['Events']
        }),
        fetchOneEvent: build.query<IEvent, number>({
            query: (id) => ({
                url: `/event?id=${id}`,  
            }),
            providesTags: result => ['Events']
        }),
    })
});

export const {
    useFetchAllEventsQuery,
    useFetchOneEventQuery
} = eventsApi;