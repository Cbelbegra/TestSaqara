import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Sidebar.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/validate-token`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data.valid) {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        checkToken();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        toast.success('Successfully logged out');
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <nav>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    {isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/projects">List of Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks">List of Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
