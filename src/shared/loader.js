import React from 'react';
import { FadeLoader } from 'react-spinners';

const Loader = ({isLoading}) => {
    return (
        <>
            <div className="flex justify-center items-center my-20">
                <FadeLoader
                    color='#65A30D'
                    loading={isLoading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </>
    );
};

export default Loader;