import { ICourseObject } from './../models/ICourse';
import { serverApi } from './api';

export const courseApi = serverApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllCourses: build.query<ICourseObject, number>({
            query: () => ({
                url: '/plans',
            }),
            providesTags: result => ['Courses']
        }),
    })
});

export const {
    useFetchAllCoursesQuery
} = courseApi;