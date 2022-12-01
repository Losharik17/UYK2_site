import './Person.scss';
import React from 'react';
import { Title } from '../Title/Title';


export const Person = () => {
    return (
        <div className="person">
            <div className="person__info">
                <p className='person__zav'>
                    <Title>Заведующий кафедры</Title>
                </p>
                <p className="person__name">
                    Чухраев Игорь Владимирович
                </p>
                <p className="person__contact">
                    Тел: <span>+7 (991) 328-29-96</span>
                </p>
                <p className="person__contact">
                    Почта: <span>iuk2@bmstu.ru</span>
                </p>
            </div>
            <div className="person__image">
                <img src={ 'http://185.87.50.137:8080/static/images/head_of_department.jpg' } alt=""/>
            </div>
        </div>
    );
};