"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { BiLogoFacebook, BiLogoLinkedin, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi';
import { BsInstagram } from 'react-icons/bs';
import { HiMailOpen } from 'react-icons/hi';
import { IoMdCall } from 'react-icons/io';
import '../styles/navbar.css';
import { AuthContext } from '@/components/context/UserContext';


const Navbar = () => {
    return (
        <>
            <TopNav />
            <BottomNav />
        </>
    );
};

export default Navbar;

const TopNav = () => {
    return (
        <>
            <section className='container mx-auto flex flex-col md:flex-row justify-around items-center my-3'>
                <div className='flex items-center gap-3 text-lg'>
                    <div className='flex items-center gap-2 text-[#656565] text-sm md:text-base'>
                        <HiMailOpen />
                        <a href="mailto:asifsikder23@gmail.com">asifsikder23@gmail.com</a>
                    </div>
                    <p className='text-sm md:text-base'>|</p>
                    <div className='flex items-center gap-1 text-[#656565] text-sm md:text-base'>
                        <IoMdCall />
                        <a href="tel:+8801872400423">+8801872400423</a>
                    </div>
                </div>
                <div className='my-2 md:my-0'>
                    <div className='flex items-center gap-5 text-lime-600 text-xl'>
                        <Link href={'/#'}> <BiLogoFacebook className='hover:text-lime-700' /></Link>
                        <Link href={'/#'}>  <BiLogoTwitter className='hover:text-lime-700' /></Link>
                        <Link href={'/#'}> <BiLogoLinkedin className='hover:text-lime-700' /></Link>
                        <Link href={'/#'}> <BsInstagram className='hover:text-lime-700' /></Link>
                        <Link href={'/#'}> <BiLogoYoutube className='hover:text-lime-700' /></Link>
                    </div>
                </div>
            </section>
        </>
    )
}
const BottomNav = () => {
    const { user, logOut } = useContext(AuthContext)

    const [scroll, setScroll] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    const menu = [
        { title: 'About', path: '/about' },
        { title: 'Service', path: '/service' },
        { title: 'Packages', path: '/packages' },
        { title: 'Blog', path: '/blog' },
        { title: 'Contact', path: '/contact' },
    ]
    return (
        <>
            <header
                className={
                    scroll
                        ? "bg-transparent sticky-bar stick"
                        : "sticky-bar stickyNav stickNav bg-white bg-opacity-60 backdrop-blur-md transition-all ease-in"
                }
            >
                <section className='container mx-auto'>
                    <div className="flex justify-between items-center  lg:rounded-lg">
                        <a href={"/"} className="cursor-pointer">
                            <div className="flex items-center">
                                <div>
                                    <Image src='/Assets/logo/logo.png' alt="" width={60} height={60} />
                                </div>
                                <h1 className='text-xl font-bold uppercase'>Baundule Club</h1>
                            </div>
                        </a>
                        <div className="lg:hidden">
                            <button className="navbar-burger flex items-center p-3" onClick={toggleMenu}>
                                <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="hidden  lg:flex lg:items-center lg:w-auto lg:space-x-6 mr-3">
                            {
                                menu.map((m, i) => (
                                    <>
                                        <li key={i} className='relative p-2'>
                                            <Link href={m.path}
                                                className="uppercase font-semibold text-sm  cursor-pointer ">{m.title}</Link>
                                        </li>

                                    </>
                                ))
                            }
                            <li>
                                {
                                    user ?
                                        <button onClick={logOut} className="bg-transparent hover:bg-lime-700 text-lime-600 font-semibold hover:text-white py-1 px-4 border border-lime-600 hover:border-transparent rounded">
                                            Dashboard
                                        </button>
                                        :
                                        <Link href={'/signin'} className="bg-transparent hover:bg-lime-700 text-lime-600 font-semibold hover:text-white py-1 px-4 border border-lime-600 hover:border-transparent rounded">
                                            Sign in
                                        </Link>
                                }
                            </li>
                        </ul>
                    </div>
                    <div className={`navbar-menu relative z-50 ${isMenuOpen ? '' : 'hidden'}`}>
                        <div className="navbar-backdrop fixed inset-0  opacity-25" onClick={closeMenu}>
                        </div>
                        <nav className="fixed top-0 left-0 bottom-0 flex justify-between flex-col w-5/6 max-w-sm py-6 px-6 h-screen bg-gray-900 bg-opacity-90 backdrop-blur-md transition-all ease-in overflow-y-auto">
                            <div>
                                <div className="flex justify-between items-center mb-8">
                                    <Link href={"/"} className="cursor-pointer border text-white px-4 py-2 text-lg font-bold uppercase">
                                        Baundule Club
                                    </Link>
                                    <button className="navbar-close" onClick={closeMenu}>
                                        <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <ul>
                                        {
                                            menu.map((m, i) => (
                                                <li key={i} className='mb-1'>
                                                    <Link href={m.path}
                                                        className="block p-4 text-sm text-white font-semibold  hover:bg-blue-50 hover:text-red-600 rounded cursor-pointer">{m.title}</Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            {
                                user ?
                                    // <Link href={'/dashboard'} className="bg-transparent hover:bg-[#7083ee] text-white font-semibold hover:text-white py-1 px-4 border border-white hover:border-transparent rounded text-center">
                                    //     Dashboard
                                    // </Link>
                                    <button onClick={logOut} className="bg-transparent hover:bg-[#7083ee] text-white font-semibold hover:text-white py-1 px-4 border border-white hover:border-transparent rounded text-center">
                                        Dashboard
                                    </button>

                                    :
                                    <Link href={'/signin'} className="bg-transparent hover:bg-[#7083ee] text-white font-semibold hover:text-white py-1 px-4 border border-white hover:border-transparent rounded text-center">
                                        Login
                                    </Link>
                            }
                        </nav>

                    </div>
                </section>

            </header>
        </>
    )
}