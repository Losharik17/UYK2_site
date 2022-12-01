import React from 'react';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container } from '../containers/Container';
import { PageTitle } from '../PageTitle/PageTitle';
import { Course } from '../Course/Course';
import { useFetchAllCoursesQuery } from '../../services/courses';
import { Error } from '../Error/Error';
import { SkeletonCourse } from '../Course/SkeletonCourse';
import { ICourse } from '../../models/ICourse';

export const Courses = () => {
    const { data: courses, isLoading, error } = useFetchAllCoursesQuery(1);

    return (
    <div className="courses">
        <Container>
            <PageTitle>Учебный план</PageTitle>
            <div className="courses__body">
                { isLoading && <SkeletonCourse/> }
                { error && <Error>Произошла ошибка при загрузке курсов</Error> }
                { courses && 
                    <Swiper
                        modules={[Pagination, FreeMode]}
                        spaceBetween={ 50 }
                        slidesPerView={ 1 }
                        loop={ true }
                        pagination={{ clickable: true, renderBullet(index, className) {
                            return `<span class='${className}'><div>${index + 1} Курс</div></span>`;
                        }, }}
                        freeMode={{ enabled: true, sticky: true, momentum: true }}
                    >
                        {
                            courses.array.map((course: ICourse) => {
                                return <SwiperSlide key={ course.course_number }>
                                    <Course numberOfCourse={ course.course_number } plans={ course.plans }/> 
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                }  
            </div>
        </Container>
    </div>)
};
