import React, { FC, ReactNode } from 'react';
import './PageTitle.scss';

interface PageTitleProps {
    children?: ReactNode;
};

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
    return (
        <div className="page-title">
            { children }
        </div>
    );
};