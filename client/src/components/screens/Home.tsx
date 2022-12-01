import React from 'react';
import { Container } from '../containers/Container';
import { Events } from '../Events/Events';
import { News } from '../News/News';

export const Home = () => {
    return (
        <div className="poster">
            <Container>
                <div className="poster__body">
                    <News/>
                    <Events/>
                </div>
            </Container>
        </div>
    );
};