"use client"
import React, { useEffect, useState } from 'react';

import { FormControl, FormControlLabel, MenuItem, Pagination, Radio, RadioGroup, Select, Stack } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import { useQuery } from 'react-query';
import { RxCross2 } from 'react-icons/rx';

import { useParams } from 'next/navigation';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import '../../../../styles/tour.css'




const Tour = () => {
    const params = useParams();
    const id = params.id;
    // division
    const [divi, setDivi] = useState('');
    const [selected, setSelected] = useState('');
    // duration
    const [value, setValue] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(null);
    // category
    const [selectedStatus, setSelectedStatus] = useState('');

    // filtering
    const [filteredDetails, setFilteredDetails] = useState([]);

    // fetch by category id
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/category/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, [id]);

    // fetch category
    const { data: category } = useQuery("category", async () => {
        const response = await axios.get("http://localhost:5000/category");
        return response.data;
    });

    const applyFilters = () => {
        const filtered = data?.filter((info) => {

            const divisionFilter = selected === '' || info.division === selected;

            // Convert the value to an integer for comparison
            const intValue = parseInt(value);
            // Check if the duration is less than or equal to the selected duration value
            const durationFilter = isNaN(intValue) || info.duration <= intValue;
            return (
                divisionFilter && durationFilter
            );
        });
        setFilteredDetails(filtered);
    };
    useEffect(() => {
        applyFilters();
    }, [data, selected, selectedDuration, value]);
    return (
        <>
            <Hero data={data} category={category} />
            <Pkg data={data} isLoading={isLoading} divi={divi} setDivi={setDivi} selected={selected} setSelected={setSelected} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} selectedDuration={selectedDuration} setSelectedDuration={setSelectedDuration} filteredDetails={filteredDetails} value={value} setValue={setValue} category={category} />
        </>
    );
};

export default Tour;

const Hero = ({ category, data }) => {
    return (
        <>
            <div className="page-header -mt-7">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center"
                        style={{
                            minHeight: '350px'
                        }}>
                        <h3 className="display-4 text-white uppercase mb-4">Your Destination</h3>
                        <div className="w-3/4">
                            {/* <div className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-1 mb-5 sticky" style={{ top: '5px' }}>
                                <input className="font-bold uppercase rounded-full w-full py-2 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Search" />
                                <div className="bg-gray-600 p-2 hover:bg-lime-400 cursor-pointer  rounded-full">
                                    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div> */}
                            <Category data={data} category={category} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Pkg = ({ data, isLoading, divi, setDivi, selected, setSelected, selectedStatus, setSelectedStatus, selectedDuration, setSelectedDuration, filteredDetails, value, setValue, category }) => {
    return (
        <>
            <div className="container mx-auto lg:flex gap-5 my-10 h-full">
                <div className="lg:w-1/4 shadow-lg rounded border p-5 h-full lg:sticky top-20">
                    <Filtering divi={divi} setDivi={setDivi} selected={selected} setSelected={setSelected} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} selectedDuration={selectedDuration} setSelectedDuration={setSelectedDuration} value={value} setValue={setValue} data={data} />
                </div>
                <div className="lg:w-3/4">
                    <div className='shadow-lg rounded border p-5'>
                        {
                            isLoading ?
                                <>
                                    <Loader />
                                </>
                                :
                                <>
                                    {
                                        filteredDetails?.map((pkg, i) => {
                                            return (
                                                <>
                                                    <article className={`md:flex bg-white transition hover:shadow-xl${i === data.length - 1 ? '' : ' mb-5'}`} key={i}>
                                                        <div className="hidden md:block rotate-180 p-2 [writing-mode:_vertical-lr]">
                                                            <time
                                                                datetime="2022-10-10"
                                                                className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                                                            >
                                                                <span>{pkg.amount} TK</span>
                                                                <span className="w-px flex-1 bg-gray-900/10"></span>
                                                                <span>{pkg.duration} Days</span>
                                                            </time>
                                                        </div>

                                                        <div className="sm:basis-56">
                                                            <Image
                                                                alt="Guitar"
                                                                src={pkg.coverimg}
                                                                className="aspect-square h-48 md:h-full w-full object-cover"
                                                                width={500}
                                                                height={500}
                                                            />
                                                        </div>

                                                        <div className="flex flex-1 flex-col justify-between">
                                                            <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                                                                <a href="#">
                                                                    <h3 className="font-bold uppercase text-gray-900">
                                                                        {pkg.location}
                                                                    </h3>
                                                                </a>

                                                                <p className="mt-2 line-clamp-4 text-sm/relaxed text-gray-700">
                                                                    {pkg?.description?.map(desc => desc.desc)}
                                                                </p>
                                                            </div>

                                                            <div className="sm:flex sm:items-end sm:justify-end">
                                                                <Link
                                                                    href={`/packagedetails/${pkg._id}`}
                                                                    className='block bg-lime-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-lime-400  '
                                                                >
                                                                    Visit here
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </>
                                            )
                                        })
                                    }
                                </>
                        }
                        <Paginations />
                    </div>

                </div>
            </div>
        </>
    )
}
const Filtering = ({
    divi, setDivi, selected, setSelected, selectedDuration, setSelectedDuration, value, setValue, data
}) => {

    const handleShowAllDataChange = (event) => { }

    // duration
    const durations = [
        { value: 1, label: '1 day' },
        { value: 2, label: '2 days' },
        { value: 3, label: '3-4 days' },
        { value: 4, label: '5+ days' },
    ];
    const handleChanged = (event) => {
        const selectedValue = event.target.value;
        const selectedLabel = durations.find(item => item.value === parseInt(selectedValue))?.label;
        setSelectedDuration(selectedLabel);
        setValue(selectedValue);
    };

    const clearDuration = () => {
        setSelectedDuration('');
        setValue('');
        handleShowAllDataChange();
    };

    // division

    const division = [
        { value: 1, label: 'Dhaka' },
        { value: 2, label: 'Chittagong' },
        { value: 3, label: 'Barisal' },
        { value: 4, label: 'Khulna' },
        { value: 5, label: 'Rajshahi' },
        { value: 6, label: 'Rangpur' },
        { value: 7, label: 'Sylhet' },
        { value: 8, label: 'Mymensingh' },
    ];

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        const selectedLabel = division.find(item => item.value === selectedValue)?.label;
        setSelected(selectedLabel)
        setDivi(selectedValue);
    };

    const clearDivision = () => {
        setSelected('');
        setDivi('');
        handleShowAllDataChange();
    };

    return (
        <>
            <p className='mb-3'>Packages: {data?.length > 1 ? <span>{data?.length} Packages found</span> : <span>{data?.length} Package found</span>} </p>
            <hr />
            <div>
                <p className='my-3 font-bold'>Filter type :</p>
                <div className='flex flex-wrap items-center'>
                    {selectedDuration ?

                        <>
                            <div className='px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer flex items-center gap-1 mb-3' onClick={clearDuration}><p><RxCross2 /></p><p>{selectedDuration}</p></div><span className='mx-2'>,</span>
                        </>
                        :
                        <></>
                    }
                    {
                        selected ?
                            <>
                                <div className='px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer flex items-center gap-1 mb-3' onClick={clearDivision}><p><RxCross2 /></p><p>{selected}</p></div><span className='mx-2'>,</span>
                            </>
                            : (
                                <></>
                            )}
                </div>
                <hr />
            </div>
            <div className="py-4">
                <h2 className="text-lg font-semibold mb-2">Select Travel Duration:</h2>

                <FormControl component="fieldset">
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChanged}
                    >
                        {durations.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

            </div>
            <hr />
            <div className="py-4">
                <h2 className="text-lg font-semibold mb-2">Select Division:</h2>
                <div className="space-y-2">
                    <FormControl sx={{ width: '100%' }} size="small">
                        <Select
                            value={divi}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="" disabled>
                                <em>All</em>
                            </MenuItem>
                            {division.map(item => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label} Division
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

        </>
    );
};

// const Category = ({ category, data }) => {
//     console.log('data:', data, 'category:', category);
//     return (
//         <>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

//                 {
//                     category?.map((category, i) => (
//                         <Link href={`/tour/${category?.catId}`} key={i}>
//                             <div className={`p-2 shadow hover:shadow-lg rounded flex gap-3  justify-between items-center cursor-pointer h-full hover:bg-blue-800 ease-in-out duration-400 text-black hover:text-white text-sm ${data?.some(title => title?.category === category?.title) ? 'bg-blue-800 text-white active' : 'bg-white'}`}>
//                                 <h1>{category.title}</h1>
//                                 <Image
//                                     src={category.icon}
//                                     alt={category.title}
//                                     width={200}
//                                     height={200}
//                                     className='w-10 h-10' />
//                             </div>

//                         </Link>

//                     ))
//                 }
//             </div>
//         </>
//     )
// }
const Category = ({ category, data }) => {
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
        <>
            <div className="">

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
                            slidesPerView: 2,

                        },
                        768: {
                            slidesPerView: 3,

                        },
                        1024: {
                            slidesPerView: 4,

                        },
                    }}
                    modules={[Autoplay, Navigation, FreeMode]}
                    className="mySwiper"
                >
                    {
                        category?.map((category, i) => (
                            <SwiperSlide key={i}>
                                <Link href={`/tour/${category?.catId}`} >
                                    <div className={`p-2 shadow hover:shadow-lg rounded flex gap-3  justify-around items-center cursor-pointer h-full hover:bg-blue-800 ease-in-out duration-400 text-black hover:text-white text-sm ${data?.some(title => title?.category === category?.title) ? 'bg-blue-800 text-white active' : 'bg-white'}`}>
                                        <h1>{category.title}</h1>
                                        <Image
                                            src={category.icon}
                                            alt={category.title}
                                            width={200}
                                            height={200}
                                            className='w-10 h-10' />
                                    </div>
                                </Link>
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
            </div>
        </>
    )
}
const Paginations = () => {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div className='flex justify-center mt-5'>
            <Stack spacing={2}>
                <Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={handleChange} sx={{
                    "& .Mui-selected": {
                        background: '#A3E635 !important'
                    }
                }} />
            </Stack>
        </div>
    )
}

const Loader = () => {
    return (
        <>
            <article className="md:flex bg-white transition shadow hover:shadow-xl mb-5">
                <div className="hidden md:block rotate-180 p-2 [writing-mode:_vertical-lr]">
                    <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
                        <div className="bg-gray-300 h-5 w-12 animate-pulse"></div>
                        <div className="w-px flex-1 bg-gray-900/10"></div>
                        <div className="bg-gray-300 h-5 w-12 animate-pulse"></div>
                    </div>
                </div>

                <div className="sm:basis-56">
                    <div className="aspect-square h-48 md:h-full w-full bg-gray-300 animate-pulse"></div>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                        <div className="bg-gray-300 h-6 w-3/4 animate-pulse"></div>
                        <div className="bg-gray-300 h-4 mt-2 w-5/6 animate-pulse"></div>
                    </div>

                    <div className="sm:flex sm:items-end sm:justify-end">
                        <div className="block bg-lime-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-lime-400  animate-pulse">
                            Loading...
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}