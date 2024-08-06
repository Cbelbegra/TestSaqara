import React from 'react';
import Sidebar from './Sidebar';
import { PropsWithChildren } from 'react';
import '../MainLayout.css';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="content p-4">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
