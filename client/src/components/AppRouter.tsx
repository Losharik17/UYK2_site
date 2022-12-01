import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, Navigate, useLocation  } from 'react-router-dom';
import { IRoute, publicRoutes } from '../routes/routes';

export const AppRouter = () => {
    const location = useLocation();
    const buildRoutes = (routes: IRoute[]) => {
        return routes.map(route => {
            if (route.children) {
                return (
                    <Route 
                        path={route.path} 
                        key={route.path} 
                        element={<route.component />}
                    >
                        {buildRoutes(route.children)}
                    </Route>
                )
            }
            else {
                return <Route 
                    path={route.path} 
                    key={route.path} 
                    element={<route.component />} 
                />
            }
        });
    };

    return (
        <AnimatePresence exitBeforeEnter initial={ false }>
            <Routes location={ location } key={ location.key }>
                { buildRoutes(publicRoutes) }
                <Route path={ '*' } element={ <Navigate to='/' replace /> }></Route>
            </Routes>
        </AnimatePresence>
    );
};