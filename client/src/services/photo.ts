// import { IPhoto } from './../models/IPhoto';
import { serverApi } from './api';

export const photoApi = serverApi.injectEndpoints({
    endpoints: (build) => ({
        fetchHeadOfDepartment: build.query<any, number>({
            query: () => ({
                url: `/static/images/head_of_department.jpg`,  
            }),
            providesTags: result => ['Photos']
        }),
        fetchDepartmentLogo: build.query<any, number>({
            query: () => ({
                url: `/static/images/logo_uyk2.png`,  
            }),
            providesTags: result => ['Photos']
        }),
        fetchMainLogo: build.query<string, number>({
            query: () => ({
                url: `/static/images/logo_mgtu.png`,  
            }),
            providesTags: result => ['Photos']
        }),
    })
});

export const {
    useFetchHeadOfDepartmentQuery,
    useFetchDepartmentLogoQuery,
    useFetchMainLogoQuery
} = photoApi;