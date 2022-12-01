import React from 'react';
import { Container } from '../containers/Container';
import { PageTitle } from '../PageTitle/PageTitle';
import { Person } from '../Person/Person';
import { Visit } from '../Person/components/Visit';

export const Info = () => {
    return (
        <div className="main-info">
            <Container>
                <PageTitle>Описание кафедры</PageTitle>
                <div className="main-info__content">
                    <Person/>
                    <Visit/>
                </div>
            </Container>
        </div>
    );
};