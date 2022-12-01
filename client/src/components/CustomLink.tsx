import React, { FC, ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

interface CustomLinkProps { 
    to: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
};

export const CustomLink: FC<CustomLinkProps> = ({ children, to, className, onClick }) => {
    const location = useLocation();
    const preventLocate = (e: MouseEvent) => {
        if (location.pathname === to) {
            e.preventDefault();
            return;
        } else {
            scrollHandler();
        }
    };

    const scrollHandler = () => {
        window.scrollTo(0, 420);
        if (onClick) {
            onClick();
        };
    };

    return (
        <NavLink to={ to } className={ className } onClick={ (e: any) => preventLocate(e) }>
            { children }
        </NavLink>
    );
};
