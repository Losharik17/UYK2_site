import './Title.scss';
import React, { FC, ReactNode } from 'react';

interface TitleProps {
    children: ReactNode;
};

export const Title: FC<TitleProps> = ({ children }) => {
    return (
        <div className='title'>{ children }</div>
    );
};