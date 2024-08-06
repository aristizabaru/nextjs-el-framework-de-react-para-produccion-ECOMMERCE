'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';

interface Props {
    images: string[];
    title?: string;
    className?: string;
}

export const ProductMobileSlideshow = ( { images, title, className }: Readonly<Props> ) => {


    return (
        <div className={ className }>
            <Swiper
                style={ {
                    '--swiper-navigation-color': '#333',
                    '--swiper-pagination-color': '#333',
                    width: '100%',
                    height: '600px'
                } as React.CSSProperties }
                pagination={ true }
                modules={ [ FreeMode, Pagination ] }
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
        </div>
    );
};
