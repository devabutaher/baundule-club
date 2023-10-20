"use client"
import UserContext from '@/components/context/UserContext';
import Footer from '@/shared/Footer';
import Navbar from '@/shared/Navbar';
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
                    <Navbar />
                    {children}
                    <Footer />
                </UserContext>
            </QueryClientProvider>
        </div>
    );
};

export default MainLayout;