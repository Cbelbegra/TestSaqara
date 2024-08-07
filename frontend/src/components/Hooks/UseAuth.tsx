import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UseAuth = (onValidTokens: (() => void | Promise<void>)[]) => {
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_API_URL}/auth/validate-token`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (response.data.valid) {
                        for (const onValidToken of onValidTokens) {
                            await onValidToken();
                        }
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.error('Token validation failed:', error);
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        checkToken();
    }, [token, navigate, onValidTokens]);
};

export default UseAuth;
