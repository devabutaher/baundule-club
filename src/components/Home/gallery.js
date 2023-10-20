
const Gallery = () => {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                    <div className="flex w-full mb-20 flex-wrap">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">Explore the World with Our Travel Gallery</h1>
                        <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
                            Discover the magic of different cultures and landscapes through our gallery of breathtaking travel experiences. Join us on a virtual tour through picturesque locations, get inspired, and start planning your next adventure. Whether you&apos;re an avid globetrotter or a novice explorer, our Travel Gallery is your passport to a world of wanderlust.
                        </p>
                    </div>
                    <div className="flex flex-wrap md:-m-2 -m-1">
                        <div className="flex flex-wrap w-1/2">
                            <div className="md:p-2 p-1 w-1/2">
                                <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://i.ibb.co/JdcKNZ3/1.jpg" />
                            </div>
                            <div className="md:p-2 p-1 w-1/2">
                                <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://i.ibb.co/tDWHTB5/4.jpg" />
                            </div>
                            <div className="md:p-2 p-1 w-full">
                                <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://i.ibb.co/bzsHcvB/4.jpg" />
                            </div>
                        </div>
                        <div className="flex flex-wrap w-1/2">
                            <div className="md:p-2 p-1 w-full">
                                <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://i.ibb.co/1fp4LFR/2.jpg" />
                            </div>
                            <div className="md:p-2 p-1 w-1/2">
                                <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://i.ibb.co/V06yySR/6.jpg" />
                            </div>
                            <div className="md:p-2 p-1 w-1/2">
                                <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://i.ibb.co/T1MSNx1/3.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Gallery;