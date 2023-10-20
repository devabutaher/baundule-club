"use client"
import Image from 'next/image';
import { useState } from 'react';
import { MdLocationPin } from 'react-icons/md';
import { TbCurrencyTaka } from 'react-icons/tb';

import axios from 'axios';
import Link from 'next/link';
import { useQuery, useQueryClient } from 'react-query';
import '../../styles/packages.css';

const Packages = () => {
    const [displayedPackages, setDisplayedPackages] = useState(3);
    const loadMore = () => {
        setDisplayedPackages(data.length);
    };

    const { data, isLoading } = useQuery("packages", async () => {
        const response = await axios.get("https://baundule-club-server.vercel.app/toppackages");
        return response.data;
    });

    const queryClient = useQueryClient();
    queryClient.invalidateQueries('package');
    return (
        <>
            <div className="container mx-auto my-14">
                <div className="text-center mb-3 pb-3">
                    <h6 className="text-lime-700 uppercase" style={{ letterSpacing: '5px' }}>Packages</h6>
                    <h1 className='text-xl md:text-4xl font-bold '>Perfect Tour Packages</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-5 lg:mx-24 gap-10">
                    {
                        data?.slice(0, displayedPackages).map((packages, i) => {
                            return (
                                <>
                                    <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg" key={i}>
                                        <Image
                                            alt="Office"
                                            src={packages.coverimg}
                                            className="h-56 w-full object-cover"
                                            width={500}
                                            height={500}
                                        />

                                        <div className="bg-white p-4">
                                            <div className='flex gap-1 items-center text-lg font-semibold'>
                                                <MdLocationPin className='text-lime-500' />
                                                <h1>{packages.location}</h1>
                                            </div>
                                            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                                {
                                                    packages.description.map(desc => desc.desc)
                                                }
                                            </p>
                                            <div className="border-t mt-4 pt-4 flex justify-between items-center">
                                                <Link
                                                    href={`/packagedetails/${packages._id}`}
                                                    className="group inline-flex items-center gap-1 text-sm font-medium text-[#65A30D]"
                                                >
                                                    Find out more

                                                    <span
                                                        aria-hidden="true"
                                                        className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                                                    >
                                                        &rarr;
                                                    </span>
                                                </Link>
                                                <h5 className="m-0 text-lg font-semibold flex items-center">
                                                    <TbCurrencyTaka className='text-xl' /> {packages.amount}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className=''>
                    {displayedPackages < data?.length && (
                        <div className="text-center mt-4">
                            <button
                                onClick={loadMore}
                                className="bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Packages;