import './Footer.scss';
import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../../containers/Container';
import { footerVariants } from '../../../constants/variants';

export const Footer = () => {
    return (
        <motion.footer className="footer"
            variants={ footerVariants }
            initial={ 'hidden' }
            animate={ 'visible' }
            exit={ 'exit' }
        >
            <Container>
                <div className="footer__body">
                    <div className="date">@2022</div>
                </div>
            </Container>
        </motion.footer>
    );
};