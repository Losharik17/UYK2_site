import './Course.scss';
import React from 'react';

export const SkeletonCourse = () => {

    return (
        <div className="course">
            <div className="course__title">
            </div>
            <div className="course__semesters">
                <div className="course__semester semester">
                    <div className="semester__image skeleton"></div>
                    <div className="semester__title skeleton skeleton-text skeleton-text__body"></div>
                </div>
                <div className="course__semester semester">
                    <div className="semester__image skeleton"></div>
                    <div className="semester__title skeleton skeleton-text skeleton-text__body"></div>
                </div>
            </div>
        </div>
    );
};