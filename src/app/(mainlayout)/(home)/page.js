"use client"
import Destination from '@/components/Home/Destination';
import Hero from '@/components/Home/Hero';
import Blog from '@/components/Home/blog';
import Deals from '@/components/Home/deals';
import Packages from '@/components/Home/packages';
import React from 'react';
import Category from '@/components/Home/recommend';
import Image from 'next/image';
import '../../../styles/home.css'
import Link from 'next/link';
import Gallery from '@/components/Home/gallery';



const Home = () => {
    const whatsappURL = 'https://wa.me/8801872400423';
    return (
        <section className='container mx-auto relative'>
            <Hero />
            <Deals />
            <Packages />
            <Destination />
            <Category />
            <Gallery/>
            <Blog />
            <Link href={whatsappURL} target="_blank" rel="noopener noreferrer" className='fixed bottom-5 right-5 z-50'>
                    <Image
                        src="/Assets/whatsapp.gif"
                        alt="WhatsApp"
                        style={{ width: '70px', height: '70px', cursor: 'pointer' }}
                        width={500}
                        height={500}
                        className="whatsapp-image"
                    />
            </Link>
        </section>
    );
};

export default Home;