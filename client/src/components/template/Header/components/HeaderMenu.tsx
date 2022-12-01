import React, { useState } from 'react'
import { CustomLink } from '../../../CustomLink';

export const HeaderMenu = () => {
    const [ active, setActive ] = useState(false);

    const toggleHandler = () => {
        setActive(prev => !prev);
    };

    const scrollHandler = () => {
        setActive(prev => !prev);
    };

    return (
        <>
            <div className={ `header__menu ${active && 'active'}`}>
                <div className='menu'>
                    <div className="menu__body">
                        <ul className="menu__list">
                            <li><CustomLink to={ '/' } onClick={ scrollHandler } className="menu__link">Новости</CustomLink></li>
                            <li><CustomLink to={ '/about' } onClick={ scrollHandler } className="menu__link">О нас</CustomLink></li>
                            <li><CustomLink to={ '/courses' } onClick={ scrollHandler } className="menu__link">Студентам</CustomLink></li>
                            <li><CustomLink to={ '/science' } onClick={ scrollHandler } className="menu__link">Наука</CustomLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={ `header__burger ${active && 'active'}`} onClick={ toggleHandler }>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </>
    );
};
