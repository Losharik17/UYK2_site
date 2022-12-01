import './LatestPosts.scss';
import React, { FC } from 'react';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IArticle } from '../../models/IArticle';
import { IEvent } from '../../models/IEvent';
import { INew } from '../../models/INew';
import { CustomLink } from '../CustomLink';

interface LatestPostsProps {
    posts: IEvent[] | INew[] | IArticle[];
};

export const LatestPosts: FC<LatestPostsProps> = ({ posts }) => {
    
    return (
        <div className="latest-posts">
            <div className="latest-posts__title title">
                Последние новости
            </div>
            <ul className='latest-posts__list'>
                <Swiper
                    modules={[ FreeMode ]}
                    spaceBetween={ 50 }
                    slidesPerView={ 3 }
                    loop={ true }
                    freeMode={{ enabled: true, sticky: true }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1
                        },
                        540: {
                            slidesPerView: 2
                        },
                        767: {
                            slidesPerView: 3,
                        },
                    }}
                    
                >
                    { posts &&
                        posts.map((post) => {
                            return  <SwiperSlide key={ post.id }  style={{ height: 276 }}>
                                <li className="latest-posts__item latest-post">
                                    <CustomLink 
                                        to={
                                            ('start_date') in post ? `/posts/events/${post.id}` :
                                            ('date') in post ? `/posts/news/${post.id}` :
                                            `/posts/articles/${post.id}`
                                        }
                                        className="latest-post__image"
                                    >
                                        <img src={ post.full_img_url } alt="" />
                                    </CustomLink>
                                    <div className='latest-post__title'>
                                        <CustomLink 
                                            to={   
                                                ('start_date') in post ? `/posts/events/${post.id}` :
                                                ('date') in post ? `/posts/news/${post.id}` :
                                                `/posts/articles/${post.id}`
                                            }
                                        >
                                            { post.title }
                                        </CustomLink>
                                    </div>
                                </li>
                                    </SwiperSlide>
                        })
                    }
                </Swiper>
            </ul>
        </div>
    );
};
