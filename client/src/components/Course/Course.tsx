import './Course.scss';
import React, { FC } from 'react';
import { IPlan } from '../../models/ICourse';
import { Title } from '../Title/Title';


interface CourseProps {
    numberOfCourse: number;
    plans: IPlan[];
};

export const Course: FC<CourseProps> = ({ numberOfCourse, plans }) => {

    return (
        <div className="course">
            <div className="course__title">
                <Title>
                    { numberOfCourse } Курс
                </Title>
            </div>
            <div className="course__semesters">
                { plans.map((plan, index) => {
                    return <div className="course__semester semester">
                                <div className="semester__image">
                                    <img src={ plan.full_img_url } alt="Отрезок"/>
                                </div>
                                <div className="semester__title">{ plan.semester } семестр</div>
                            </div>
                })}
            </div>
        </div>
    );
};