import { FaRegUser } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { RiPagesLine } from "react-icons/ri";
import { MdLuggage } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
    const menuItems = [
        { label: 'Home', link: '/' },
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Users', link: '/dashboard/users' },
        { label: 'Bookings', link: '/dashboard/booking' },
        { label: 'Packages', link: '/dashboard/packages' },
        { label: 'Blogs', link: '/dashboard/blogs' },
        { label: 'Pages', link: '/dashboard/pages' },
        { label: 'Profile', link: '/dashboard/profile' },
        { label: 'Settings', link: '/dashboard/settings' },
    ];

    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (index) => {
        setActiveItem(index);
    };

    return (
        <>
            <div className="fixed flex flex-col top-16 left-0 w-14 hover:w-64 md:w-64 bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <div>
                        <ul className="flex flex-col py-4 space-y-1">
                            {menuItems.map((item, index) => (
                                <li key={index} className={`relative group ${activeItem === index ? 'bg-red-600' : ''}`}>
                                    <Link href={item.link}
                                        className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6`}
                                        onClick={() => handleItemClick(index)}>
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <Icon item={item} />
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">{item.label}</span>
                                    </Link>
                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2023</p>
                </div>
            </div>
        </>
    );
};

const Icon = ({ item }) => {
    return (
        <>
            {item.label === 'Home' && <AiOutlineHome className="w-5 h-5" />}
            {item.label === 'Dashboard' && <MdOutlineDashboard className="w-5 h-5" />}
            {item.label === 'Users' && <FaRegUser className="w-5 h-5" />}
            {item.label === 'Bookings' && <FaRegBookmark className="w-5 h-5" />}
            {item.label === 'Packages' && <MdLuggage className="w-5 h-5" />}
            {item.label === 'Blogs' && <CgWebsite className="w-5 h-5" />}
            {item.label === 'Pages' && <RiPagesLine className="w-5 h-5" />}
            {item.label === 'Profile' && <ImProfile className="w-5 h-5" />}
            {item.label === 'Settings' && <MdSettings className="w-5 h-5" />}
        </>
    );
};

export default Sidebar;
