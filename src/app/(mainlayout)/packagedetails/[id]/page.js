"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

import { Accordion, AccordionDetails, AccordionSummary, Box, Fade, Modal, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineArrowDown, AiOutlineForm } from 'react-icons/ai';
import { BiPurchaseTag, BiSolidLocationPlus, BiSolidTime, BiTimer } from 'react-icons/bi';
import { BsFillFlagFill, BsGlobe2, BsInfoCircle } from 'react-icons/bs';
import { GiCheckMark, GiClick } from 'react-icons/gi';
import { MdLocationPin, MdOutlineDescription, MdOutlineTipsAndUpdates } from 'react-icons/md';
import { RiContactsFill, RiTeamFill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { TbCurrencyTaka } from 'react-icons/tb';
import { useQuery } from 'react-query';

import FsLightbox from 'fslightbox-react';
import toast from 'react-hot-toast';
import '../../../../styles/pkgdetails.css';



const PackagesDetails = () => {
    const params = useParams();
    const id = params.id;

    const { data: details } = useQuery("details", async () => {
        const response = await axios.get(`https://baundule-club-server.vercel.app/packages/${id}`);
        return response.data;
    });
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const totalValue = details?.amount * quantity

    const { handleSubmit, control, reset } = useForm();
    const handleFormSubmit = async (data) => {

        const phoneNumber = '+8801872400423';
        const packageLink = `https://baundule-club.vercel.app/packagedetails/${details._id}`;

        const message = `Hello, I am ${data.name}.
        I want to book ${details.location}. I already submit a booking form in your mail.
        Here is the link to the package: (${packageLink})`;

        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;


        const mergedData = {
            location: details.location,
            members: quantity,
            total: totalValue,
            ...data,
        }
        fetch('https://baundule-club-server.vercel.app/bookingform', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mergedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Booking information sent.');
                    setOpen(false)
                    reset()
                    setQuantity(1)
                    window.open(whatsappLink, '_blank');
                }
                else {
                    toast.error(data.message);
                }
            })
    }

    const iframeHtml = details?.mapURL
        .replace(/width="[^"]+"/, 'width="100%"')
        .replace(/height="[^"]+"/, 'height="250px"');

    return (
        <>
            <div className="page-header bg-scroll bg-inner division -mt-7">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center"
                        style={{
                            minHeight: '400px'
                        }}>
                        <h3 className="display-4 text-white uppercase mb-2 text-center">{details?.location}</h3>
                        <div className="flex text-white">
                            <p className='text-2xl text-center' style={{ letterSpacing: '5px' }}>Your Amazing Tour</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="lg:flex gap-5">
                    <div className="lg:w-2/3 box">
                        <Accord details={details} />
                    </div>
                    <div className="lg:w-1/3 box sticky top-16">
                        <div className='mb-3'>
                            <div >
                                <div dangerouslySetInnerHTML={{ __html: iframeHtml }}/>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <MdLocationPin className='text-lime-500 text-lg' />
                            <h1>{details?.location}</h1>
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <BsFillFlagFill className='text-lime-500 text-lg' />
                            <h1>{details?.division}</h1>
                        </div>

                        <div className='flex items-center gap-2 mb-3'>
                            <RiTeamFill className='text-lime-500 text-lg' />
                            <h1>From {details?.minmember} to {details?.maxmember} people</h1>
                        </div>
                        <div className='flex justify-between items-center
                        '>
                            <div className='flex items-center gap-2 '>
                                <BiSolidTime className='text-lime-500 text-lg' />
                                <h1>{details?.duration} days</h1>
                            </div>
                            <div className='flex items-center gap-2 '>
                                <TbCurrencyTaka className='text-lime-500 text-xl' />
                                <h1 className='font-bold text-xl'>{details?.amount} TK</h1>
                            </div>
                        </div>
                        <hr className='my-3' />
                        <div className='flex items-center gap-2 mb-3'>
                            <h1>Free cancellation up to twenty-four (24) hours before the start of the tour.</h1>
                        </div>
                        <hr className='my-3' />
                        <button className='btn text-center w-full bg-lime-500 text-white hover:bg-lime-700 py-2 rounded-lg' onClick={handleOpen}>
                            Book Now
                        </button>
                        <Forminfo open={open} setOpen={setOpen} handleClose={handleClose} handleOpen={handleOpen} details={details} handleDecrement={handleDecrement} handleIncrement={handleIncrement} quantity={quantity} totalValue={totalValue} handleFormSubmit={handleFormSubmit} setQuantity={setQuantity} handleSubmit={handleSubmit} control={control} />
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <Gallery details={details}/>
            </div>
        </>
    );
};

export default PackagesDetails;

const Forminfo = ({ open, handleClose, details, handleFormSubmit, quantity, handleDecrement, handleIncrement, totalValue, setQuantity, handleSubmit, control }) => {

    const formHandle = (data) => {
        handleFormSubmit(data)
    }

    const handleQuantityChange = (event) => {
        const newQuantity = parseFloat(event.target.value);
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                        boxShadow: 24,
                        p: 4,
                    }}
                        className="w-96"
                    >
                        <div className='flex justify-between items-center mb-3'>
                            <h6 className='font-bold text-lg'>
                                {details?.location}
                            </h6>

                        </div>
                        <hr />
                        <form onSubmit={handleSubmit(formHandle)}>
                            <div className='my-3 w-full'>
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            required
                                            hiddenLabel
                                            variant="filled"
                                            placeholder="Name..."
                                            size="small"
                                            sx={{
                                                width: '100%',
                                            }}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            required
                                            hiddenLabel
                                            variant="filled"
                                            placeholder="Your email address..."
                                            size="small"
                                            sx={{
                                                width: '100%',
                                                margin: '10px 0',
                                            }}
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="address"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            required
                                            hiddenLabel
                                            variant="filled"
                                            placeholder="Your address..."
                                            size="small"
                                            sx={{
                                                width: '100%',
                                                margin: '10px 0',
                                            }}
                                            {...field}
                                        />
                                    )}
                                />
                                <div className='flex justify-between gap-2 mt-2'>
                                    <Controller
                                        required
                                        name="phone"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                hiddenLabel
                                                variant="filled"
                                                placeholder="Phone Number..."
                                                size="small"
                                                sx={{
                                                    width: '100%',
                                                }}
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='flex items-center justify-between border mt-3 bg-[#E8E8E8]'>
                                    <p className='pl-3'>Member</p>
                                    <div className="flex items-center rounded">
                                        <button
                                            type="button"
                                            className="w-10 h-10 leading-10 text-white text-lg bg-lime-600 transition hover:opacity-75"
                                            onClick={handleDecrement}
                                        >
                                            -
                                        </button>

                                        <input
                                            type="number"
                                            id="Quantity"
                                            value={quantity}
                                            className="h-10 w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                            onChange={handleQuantityChange}
                                        />

                                        <button
                                            type="button"
                                            className="w-10 h-10 leading-10 bg-lime-600 text-white text-lg transition hover:opacity-75"
                                            onClick={handleIncrement}
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                                <div className="flex justify-end mt-8">
                                    <div className="w-screen max-w-lg">
                                        <dl className=" text-sm text-gray-700">
                                            <div className="flex justify-between">
                                                <dt>Subtotal</dt>
                                                <dd>{details?.amount}</dd>
                                            </div>

                                            <div className="flex justify-between">
                                                <dt>Members</dt>
                                                <dd>* {quantity}</dd>
                                            </div>
                                            <hr className='my-3' />

                                            <div className="flex justify-between !text-base font-medium mb-3">
                                                <dt>Total</dt>
                                                <dd>{totalValue} TK</dd>
                                            </div>
                                        </dl>


                                        <div className="flex justify-end">
                                            <button
                                                type='submit'
                                                className="block rounded bg-lime-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-lime-600"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

const Accord = ({ details }) => {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <>
            <div >
                <Accordion
                    elevation={0}
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        id="panel1d-header"
                        focusVisibleClassName="text-blue-300"
                        expandIcon={<div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:-rotate-180"
                        >
                            <AiOutlineArrowDown className='tabicon' />
                        </div>}
                        aria-controls="panel1a-content"
                        className="faqHeader"
                    >
                        <div className='flex items-center gap-2'>
                            <BsGlobe2 className='tabicon' /> <h1 className='font-bold text-lg uppercase'>Information</h1>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: '0'
                    }}>
                        <div className="p-4 ease duration-500">
                            {details?.information?.map((info, i) => (
                                <p key={i}>{info.desc}</p>
                            ))}
                            <div className='mb-3'>
                                <h2 className='font-bold my-3'>
                                    For booking this tour, please follow the following steps :
                                </h2>
                                <ul>
                                    <li>
                                        <div className="flex relative pb-12">
                                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                            </div>
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lime-500 inline-flex items-center justify-center text-white relative z-10">
                                                <GiClick />
                                            </div>
                                            <div className="flex-grow pl-4">
                                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 1</h2>
                                                <p className="leading-relaxed">Click on the Book Now Button</p>
                                            </div>
                                        </div>
                                        <div className="flex relative pb-12">
                                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                            </div>
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lime-500 inline-flex items-center justify-center text-white relative z-10">
                                                <AiOutlineForm />
                                            </div>
                                            <div className="flex-grow pl-4">
                                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 2</h2>
                                                <p className="leading-relaxed">Then fill up the form and submit.</p>
                                            </div>
                                        </div>
                                        <div className="flex relative">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lime-500 inline-flex items-center justify-center text-white relative z-10">
                                                <RiContactsFill />
                                            </div>
                                            <div className="flex-grow pl-4">
                                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 3</h2>
                                                <p className="leading-relaxed">After submitting you contact with admin about Tour and Payment</p>
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    elevation={0}
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <AccordionSummary
                        id="panel2d-header"
                        focusVisibleClassName="text-blue-300"
                        expandIcon={<div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:-rotate-180"
                        >
                            <AiOutlineArrowDown className='tabicon' />
                        </div>}
                        aria-controls="panel2a-content"
                        className="faqHeader"
                    >
                        <div className='flex items-center gap-2'>
                            <MdOutlineDescription className='tabicon' /> <h1 className='font-bold text-lg'>Description</h1>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: '0'
                    }}>
                        <div className="p-4 ease duration-500">
                            {
                                details?.description?.map((desc, i) => {
                                    return (
                                        <div key={i}>
                                            <p>
                                                {desc.desc}
                                            </p>
                                            <div>
                                                <p className='font-semibold my-2'>
                                                    The Caravan is facilitated with:
                                                </p>
                                                <ul className='list-disc ml-5'>
                                                    {desc.facilitated.map((facility, k) => (
                                                        <li key={k} className='list-outside'>
                                                            {facility}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <p className='font-semibold my-2'>
                                                    Hopping Destinations:
                                                </p>
                                                <ul className='list-disc mb-3 ml-5'>
                                                    {desc.hopdestination.map((hopping, k) => (
                                                        <li key={k} className='list-outside'>
                                                            {hopping}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <p className='font-semibold my-2'>
                                                    Complementary Food Menu:
                                                </p>
                                                <ul className='list-disc ml-5'>
                                                    {desc.food.map((menu, k) => (
                                                        <li key={k} className='list-outside'>
                                                            <span className='underline'>Welcome Snacks</span>:  {menu.welcome}
                                                        </li>
                                                    ))}
                                                    {desc.food.map((menu, k) => (
                                                        <li key={k} className='list-outside'>
                                                            <span className='underline'>Lunch Platter</span>:  {menu.lunch}
                                                        </li>
                                                    ))}
                                                    {desc.food.map((menu, k) => (
                                                        <li key={k} className='list-outside'>
                                                            <span className='underline'>Evening Snacks</span>:  {menu.evening}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    elevation={0}
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                >
                    <AccordionSummary
                        id="panel2d-header"
                        focusVisibleClassName="text-blue-300"
                        expandIcon={<div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:-rotate-180"
                        >
                            <AiOutlineArrowDown className='tabicon' />
                        </div>}
                        aria-controls="panel2a-content"
                        className="faqHeader"
                    >
                        <div className='flex items-center gap-2'>
                            <MdOutlineTipsAndUpdates className='tabicon' /> <h1 className='font-bold text-lg'>Travel Tips</h1>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: '0'
                    }}>
                        <div className="p-4 overflow-hidden ease duration-500 ">
                            <div className=''>
                                <ul className='list-disc ml-5'>
                                    {details?.tips?.map((tip, k) => (
                                        <li key={k} className='list-outside'>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    elevation={0}
                    expanded={expanded === 'panel4'}
                    onChange={handleChange('panel4')}
                >
                    <AccordionSummary
                        id="panel2d-header"
                        focusVisibleClassName="text-blue-300"
                        expandIcon={<div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:-rotate-180"
                        >
                            <AiOutlineArrowDown className='tabicon' />
                        </div>}
                        aria-controls="panel2a-content"
                        className="faqHeader"
                    >
                        <div className='flex items-center gap-2'>
                            <BiPurchaseTag className='tabicon' /> <h1 className='font-bold text-lg'>Inclusion & Exclusion</h1>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: '0'
                    }}>
                        <div className="p-4 overflow-hidden ease duration-500">
                            <div className=''>
                                <div className='list-disc ml-5'>
                                    {details?.inorexclu?.map((into, k) => (
                                        <div key={k}>
                                            <ul className=''>
                                                {into.in.map((enter, j) => (
                                                    <li key={j} className='flex items-center gap-3'>
                                                        <GiCheckMark className='text-green-600' />
                                                        {enter}
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className=''>
                                                {into.out.map((outt, j) => (
                                                    <li key={j} className='flex items-center gap-3'>
                                                        <RxCross2 className='text-red-600' />
                                                        {outt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    elevation={0}
                    expanded={expanded === 'panel5'}
                    onChange={handleChange('panel5')}
                >
                    <AccordionSummary
                        id="panel2d-header"
                        focusVisibleClassName="text-blue-300"
                        expandIcon={<div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:-rotate-180"
                        >
                            <AiOutlineArrowDown className='tabicon' />
                        </div>}
                        aria-controls="panel2a-content"
                        className="faqHeader"
                    >

                        <div className='flex items-center gap-2'>
                            <BiSolidLocationPlus className='tabicon' /> <h1 className='font-bold text-lg'>Pick Up Location</h1>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: '0'
                    }}>
                        <div className="p-4 overflow-hidden ease duration-500 ">
                            <p className=''><span className='font-bold'>Pick Up: </span>{details?.pickup}</p>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    elevation={0}
                    expanded={expanded === 'panel6'}
                    onChange={handleChange('panel6')}
                >
                    <AccordionSummary
                        id="panel2d-header"
                        focusVisibleClassName="text-blue-300"
                        expandIcon={<div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:-rotate-180"
                        >
                            <AiOutlineArrowDown className='tabicon' />
                        </div>}
                        aria-controls="panel2a-content"
                        className="faqHeader"
                    >
                        <div className='flex items-center gap-2'>
                            <BiTimer className='tabicon' /> <h1 className='font-bold text-lg'>Duration</h1>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: '0'
                    }}>
                        <div className="p-4 overflow-hidden ease duration-500 ">
                            <p className=''>
                                <span className='font-bold'>Timing Duration: </span>
                                {details?.duration <= 1 ? `${details?.duration} Day` : `${details?.duration} Days`}
                            </p>

                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    elevation={0}
                    expanded={expanded === 'panel7'}
                    onChange={handleChange('panel7')}
                >
                    <AccordionSummary
                        id="panel2d-header"
                        focusVisibleClassName="text-blue-300"
                        expandIcon={<div className="h-8 w-8 border border-gray-700 rounded-full items-center inline-flex justify-center transform transition ease duration-500 group-focus:-rotate-180"
                        >
                            <AiOutlineArrowDown className='tabicon' />
                        </div>}
                        aria-controls="panel2a-content"
                        className="faqHeader"
                    >
                        <div className='flex items-center gap-2'>
                            <BsInfoCircle className='tabicon' /> <h1 className='font-bold text-lg'>Additional Information</h1>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: '0'
                    }}>
                        <div className="p-4 overflow-hidden ease duration-500">
                            <div className=''>
                                <ul className='list-disc ml-5'>
                                    {details?.additional?.map((addinfo, k) => (
                                        <li key={k} className='list-outside'>
                                            {addinfo}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
}
const Gallery = ({details}) => {

    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 0
    });
    const openLightbox = (slideIndex) => {
        setLightboxController({ toggler: !lightboxController.toggler, slide: slideIndex });
    };

    const [swiperInstance, setSwiperInstance] = useState(null);
    const goPrev = () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    };
    const goNext = () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    };
    return (
        <div className='box'>
            <h1 className='text-xl font-bold mb-3'>FROM OUR GALLERY</h1>
            <p className='md:w-[70%] mb-5'>
                Explore our stunning collection of images from around the world. Our gallery showcases the beauty of different destinations, cultures, and experiences. Join us on a visual journey through the lens of our passionate photographers.
            </p>
            <Swiper
                onSwiper={setSwiperInstance}
                grabCursor={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                slidesPerView={3}
                spaceBetween={25}
                breakpoints={{
                    100: {
                        slidesPerView: 1,

                    },
                    768: {
                        slidesPerView: 2,

                    },
                    1024: {
                        slidesPerView: 3,

                    },
                }}
                modules={[Autoplay, Navigation, FreeMode]}
                className="mySwiper"
            >
                {
                    details?.images?.map((img, i) => (
                        <SwiperSlide key={img.id} onClick={() => openLightbox(i)}>
                            <Image
                                src={img.img}
                                className='w-full h-56 object-cover'
                                width={800}
                                height={500}
                                alt={details.location}
                            />
                        </SwiperSlide>
                    ))
                }
                <div className='relative flex justify-center'>
                    <div className="swiper-button-container">
                        <button className="swiper-button-prev" onClick={goPrev}>
                        </button>
                        <button className="swiper-button-next" onClick={goNext}>
                        </button>

                    </div>
                </div>
            </Swiper>
            <FsLightbox
                toggler={lightboxController.toggler}
                sources={details?.images?.map((image) => image.img)}
                sourceIndex={lightboxController.slide}
                type="image"
            />
        </div>
    )
}