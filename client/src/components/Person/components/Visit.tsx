import './Visit.scss';
import React from 'react';
import { Title } from '../../Title/Title';
import { useFetchAboutQuery } from '../../../services/about';

export const Visit = () => {
    const { data: about, isLoading } = useFetchAboutQuery(0);

    return (
        <div className="visit">
            { isLoading &&
                <>
                    <div className="visit__title skeleton"></div>
                    <div className="visit__text skeleton"></div>
                </>
            }
            { about && 
                <>
                    <div className="visit__title">
                        <Title>{ about.title }</Title>
                    </div>
                    <div className="visit__text" dangerouslySetInnerHTML={{ __html: about.text }}></div>
                </>
            }
        </div>
    );
};