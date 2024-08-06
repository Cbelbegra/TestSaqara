import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UseAuth = (onValidToken: () => void) => {
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (token) {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_API_URL}/auth/validate-token`,
                        {
                            headers:
                            {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    if (response.data.valid) {
                        onValidToken();
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    navigate('/login');
                    console.error(error);
                }
            } else {
                navigate('/login');
            }
        };

        checkToken();
    }, [token, navigate, onValidToken]);
};

export default UseAuth;
