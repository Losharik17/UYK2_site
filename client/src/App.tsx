import './App.scss';
import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { AppRouter } from './components/AppRouter';
import { CubeLoader } from './components/CubeLoader/CubeLoader';
import { motion } from 'framer-motion';
import { appVariants, loaderVariants } from './constants/variants';

export const App = () => {
  const [ visible, setVisible ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 3500);
  }, []);

  return (
    <>
      <div className={ 'wrapper' }>
        { !visible && <motion.div 
            className='wrapper-loader'
            variants={ loaderVariants }
            initial={ 'hidden' }
            animate={ 'animate' }
          >
            <CubeLoader/>
          </motion.div>
        }
        <motion.div
          variants={ appVariants }
          initial={ 'hidden' }
          animate={ 'animate' }
        >
          <Layout>
            <AppRouter/>
          </Layout>
        </motion.div>
      </div>
    </>
  );
};