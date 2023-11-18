"use client"
import UserContext from '@/components/context/UserContext';
import Sidebar from '@/components/dashboard/sidebar';
import DashHeader from '@/shared/DashHeader';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const MainLayout = ({ children }) => {
    return (
        <div>
            <Toaster />
            <QueryClientProvider client={queryClient}>
                <UserContext>
                    <div className='min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased'>
                        <DashHeader />
                        <Sidebar />
                        <div className='ml-14 md:ml-64'>
                            {children}
                        </div>
                    </div>
                </UserContext>
            </QueryClientProvider>
        </div>
    );
};

export default MainLayout;
