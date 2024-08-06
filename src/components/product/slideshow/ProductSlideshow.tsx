'use client';

import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import Image from 'next/image';

interface Props {
    images: string[];
    title?: string;
    className?: string;
}

export const ProductSlideshow = ( { images, title, className }: Readonly<Props> ) => {

    const [ thumbsSwiper, setThumbsSwiper ] = useState<SwiperObject>();

    return (
        <div className={ className }>
            <Swiper
                style={ {
                    '--swiper-navigation-color': '#333',
                    '--swiper-pagination-color': '#333',
                } as React.CSSProperties }
                spaceBetween={ 10 }
                navigation={ true }
                thumbs={ { swiper: thumbsSwiper } }
                modules={ [ FreeMode, Navigation, Thumbs ] }
                className="mySwiper2">
                {
                    images.map( image => (
                        <SwiperSlide key={ image }>
                            <Image
                                src={ `/products/${ image }` }
                                alt={ title ?? 'Teslo Shop' }
                                width={ 1024 }
                                height={ 800 }
                                className='object-fill' />
                        </SwiperSlide>
                    ) )
                }
            </Swiper>
            <Swiper
                onSwiper={ setThumbsSwiper }
                spaceBetween={ 10 }
                slidesPerView={ 4 }
                freeMode={ true }
                watchSlidesProgress={ true }
                modules={ [ FreeMode, Navigation, Thumbs ] }
                className="mySwiper">
                {
                    images.map( image => (
                        <SwiperSlide key={ image }>
                            <Image
                                src={ `/products/${ image }` }
                                alt={ title ?? 'Teslo Shop' }
                                width={ 300 }
                                height={ 300 }
                                className='object-fill' />
                        </SwiperSlide>
                    ) )
                }
            </Swiper>
        </div>
    );
};
