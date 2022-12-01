import './About.scss';
import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../containers/Container';
import { Canvas } from './Canvas/Canvas';
import { aboutVariants } from '../../constants/variants';
import { useFetchDescriptionQuery } from '../../services/about';

export const About = () => {
    const { data: about, isLoading, error } = useFetchDescriptionQuery(0);

    return (
        <section className="about">
            <Canvas/>
            <div className="about__body">
                <Container>
                    {/* { about && 
                        <motion.div 
                            className="about__content"
                            variants={ aboutVariants }
                            initial={ 'hidden' }
                            animate={ 'visible' }
                            transition={{ type: 'tween', duration: 1 }}
                        >
                                <>
                                    <h1 className='about__title'>{ about.title }</h1>
                                    <h2 className='about__text' dangerouslySetInnerHTML={{ __html: about.text }}></h2>
                                </>
                        </motion.div>
                    } */}
                </Container>
            </div>
        </section>
    );
};