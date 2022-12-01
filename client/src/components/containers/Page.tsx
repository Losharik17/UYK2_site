import React, { FC, ReactNode } from 'react';
import { About } from '../About/About';

interface PageProps {
    children: ReactNode
};

export const Page: FC<PageProps> = ({ children }) => {
    return (
        <>
            <main
                className={ 'page' }
            >
                <About/>
                { children }
            </main>
        </>
    );
};