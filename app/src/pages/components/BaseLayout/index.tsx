import React from 'react';
import Header from '../../../components/Header/Header.tsx';
import Footer from '../../../components/Footer/Footer.tsx';

interface Props {
    children: React.ReactNode
}

const BaseLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main className="page-content">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default BaseLayout;
