import Link from 'next/link';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { HiMailOpen } from 'react-icons/hi';
import { IoMdCall } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { FaFacebookF } from 'react-icons/fa';
import '../styles/footer.css'
import { BiLogoLinkedin } from 'react-icons/bi';

const Footer = () => {
    return (
        <div className="bg-[#212121] text-white px-3 lg:px-5 py-10">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-10 justify-between">
                    {/* Column 1 */}
                    <div className="mb-5 lg:w-96">
                        <a href="/" className="navbar-brand">
                            <h1 className="text-2xl uppercase font-bold">
                                Baundule Club
                            </h1>
                        </a>
                        <p className='mt-3'>
                            Sed ipsum clita tempor ipsum ipsum amet sit ipsum lorem amet labore rebum lorem ipsum dolor. No sed vero lorem dolor dolor
                        </p>
                        <h6 className="text-white text-uppercase mt-4 mb-3" style={{ letterSpacing: '5px' }}>
                            Follow Us
                        </h6>
                        <div className="flex justify-start gap-3">
                            <a className="btn-square" href="#">
                                <BsTwitter className=""/>
                            </a>
                            <a className="btn-square" href="#">
                                <FaFacebookF className=""/>
                            </a>
                            <a className="btn-square" href="#">
                                <BiLogoLinkedin className=""/>
                            </a>
                            <a className="btn-square" href="#">
                                <BsInstagram className=""/>
                            </a>
                        </div>
                    </div>
                    {/* Column 2 */}
                    {/* <div className="mb-5">
                        <h5 className="text-white text-uppercase mb-4" style={{ letterSpacing: '5px' }}>
                            Our Services
                        </h5>
                        <div className="flex flex-col justify-start">
                            <Link className="text-white-50 mb-2 flex items-center" href="#">
                                <AiOutlineArrowRight className="text-sm mr-2" />About
                            </Link>
                            <Link className="text-white-50 mb-2 flex items-center" href="#">
                                <AiOutlineArrowRight className="text-sm mr-2" />Services
                            </Link>
                            <Link className="text-white-50 mb-2 flex items-center" href="#">
                                <AiOutlineArrowRight className="text-sm mr-2" />Packages
                            </Link>
                            <Link className="text-white-50 mb-2 flex items-center" href="#">
                                <AiOutlineArrowRight className="text-sm mr-2" />Blog
                            </Link>
                        </div>
                    </div> */}
                    {/* Column 4 */}
                    <div className="mb-5">
                        <h5 className="text-white text-uppercase mb-4" style={{ letterSpacing: '5px' }}>
                            Contact Us
                        </h5>
                        <div className='flex items-center gap-2 text-sm md:text-base'>
                            <MdLocationOn />
                            <p>123 Street, New York, USA</p>
                        </div>
                        <div className='flex items-center gap-2 text-sm md:text-base my-2'>
                            <HiMailOpen />
                            <a href="mailto:asifsikder23@gmail.com">asifsikder23@gmail.com</a>
                        </div>
                        <div className='flex items-center gap-1  text-sm md:text-base'>
                            <IoMdCall />
                            <a href="tel:+8801872400423">+8801872400423</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
