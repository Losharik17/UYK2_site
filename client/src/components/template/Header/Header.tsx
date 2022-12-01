import './Header.scss';
import React, { FC } from 'react';
import { MotionValue, motion, useTransform } from 'framer-motion';
import { Container } from '../../containers/Container';
import { CustomLink } from '../../CustomLink';
import { HeaderMenu } from './components/HeaderMenu';
import { backgroundColorSize, boxShadowSize, heightSizes, imageSizes, fontSizes } from '../../../constants/header-sizes';

interface HeaderProps {
    offsetY: Array<number>;
    scrollY: MotionValue<number>;
};

export const Header: FC<HeaderProps> = ({ offsetY, scrollY }) => {
    const backgroundColor = useTransform(scrollY, offsetY, backgroundColorSize);
    const boxShadow = useTransform(scrollY, offsetY, boxShadowSize);

    const bigHeaderHeight = useTransform(scrollY, offsetY, heightSizes.big);
    const smallHeaderHeight = useTransform(scrollY, offsetY, heightSizes.small);

    const bigLogoWidth = useTransform(scrollY, offsetY, imageSizes.big);
    const smallLogoWidth = useTransform(scrollY, offsetY, imageSizes.small);

    const bigSubTitleFontSize = useTransform(scrollY, offsetY, fontSizes.bigSubTitle);
    const smallSubTitleFontSize = useTransform(scrollY, offsetY, fontSizes.smallSubTitle);
    const bigTitleFontSize = useTransform(scrollY, offsetY, fontSizes.bigTitle);
    const smallTitleFontSize = useTransform(scrollY, offsetY, fontSizes.smallTitle);

    const windowWidth = (window.innerWidth > 767);

    return (
        <>
            <motion.header
                className="header"
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: 'tween', duration: 0.2}}
                style={{ backgroundColor, boxShadow }}
            >
                <Container>
                    <motion.div className="header__body" style={{ height: windowWidth ? bigHeaderHeight : smallHeaderHeight }}>
                        <CustomLink to={ '/' } className="logo">
                            <div className="logo__image">
                                <motion.img
                                    src="http://185.87.50.137:8080/static/images/logo_uyk2.png" 
                                    alt="" 
                                    style={{ width: windowWidth ? bigLogoWidth : smallLogoWidth }}
                                />
                            </div>
                            <div className="logo__text">
                                <motion.div 
                                    className="logo__sub-title" 
                                    style={{ fontSize: windowWidth ? bigSubTitleFontSize : smallSubTitleFontSize }}
                                >
                                    КФ МГТУ им. Н.Э.Баумана
                                </motion.div>
                                <motion.div 
                                    className="logo__title" 
                                    style={{ fontSize: windowWidth ?  bigTitleFontSize : smallTitleFontSize }}
                                >
                                    кафедра ИУК2
                                </motion.div>
                            </div>
                        </CustomLink>
                        <HeaderMenu/>
                    </motion.div>
                </Container>
            </motion.header>
        </>
    );
};
