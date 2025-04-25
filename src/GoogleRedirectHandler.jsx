import {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import {GOOGLE_ACCESS_TOKEN, GOOGLE_REFRESH_TOKEN} from "./token.js";


const API_BASE_URL = import.meta.env.VITE_API_URL;

function RedirectGoogleAuth() {
    const navigate = useNavigate();
    const location = useLocation(); // 👈 safer than window.location

    useEffect(() => {
        console.log('RedirectGoogleAuth mounted');

        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('access_token');
        const refreshToken = queryParams.get('refresh_token');

        console.log('AccessToken:', accessToken);
        console.log('RefreshToken:', refreshToken);

        if (accessToken && refreshToken) {
            // Store in localStorage
            localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken);
            localStorage.setItem(GOOGLE_REFRESH_TOKEN, refreshToken);

            // Verify the user
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            axios
                .get(`${API_BASE_URL}/api/auth/user/`)
                .then((res) => {
                    console.log('User verified:', res.data);
                    navigate('/');
                })
                .catch((err) => {
                    console.error(
                        'Error verifying user:',
                        err.response?.data || err.message
                    );
                    navigate('/login');
                });
        } else {
            console.warn('Missing tokens in URL');
            navigate('/login');
        }
    }, [location.search, navigate]); // 👈 triggers if query string changes

    return <div>Logging you in...</div>;
}

export default RedirectGoogleAuth;