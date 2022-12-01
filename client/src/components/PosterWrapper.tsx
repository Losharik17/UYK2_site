import React, { FC, ReactNode } from 'react';
import { PageTitle } from './PageTitle/PageTitle';

interface PosterWrapperProps {
    title?: string;
    children: ReactNode;
};

export const PosterWrapper: FC<PosterWrapperProps> = ({ title, children }) => {
    return (
        <div className='poster__wrapper'>
            <PageTitle>{ title }</PageTitle>
            { children }
        </div>
    );
};
