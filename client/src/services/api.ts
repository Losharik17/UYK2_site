import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://185.87.50.137:8080/',
  prepareHeaders: (headers, { getState }) => {},
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const serverApi = createApi({
  baseQuery: baseQueryWithRetry,
   tagTypes: [ 'About', 'News', 'Events', 'Articles', 'Courses', 'Photos' ],
   endpoints: () => ({}),
})