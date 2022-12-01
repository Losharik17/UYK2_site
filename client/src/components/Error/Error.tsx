import './Error.scss';
import React, { FC, ReactNode } from 'react';

interface ErrorProps {
    children: ReactNode;
};

export const Error: FC<ErrorProps> = ({ children }) => {
    return (
        <div className={ 'error '}>
            { children }
        </div>
    );
};