// chatbotApi.js
import axios from 'axios';

const chatbotApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            console.log('[❌] Failed queue retry due to error:', error);
            prom.reject(error);
        } else {
            console.log('[✅] Retrying queued request with new token');
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Attach tokens to each request
chatbotApi.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access');
        const googleAccessToken = localStorage.getItem('google_access_token');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            console.log('[🔐] Using access token for Authorization header');
        } else if (googleAccessToken) {
            config.headers.Authorization = `Bearer ${googleAccessToken}`;
            console.log('[🔐] Using Google access token for Authorization header');
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 responses
chatbotApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            console.warn('[⚠️] 401 Unauthorized - trying to refresh token...');

            originalRequest._retry = true;

            const refreshToken =
                localStorage.getItem('refresh') ||
                localStorage.getItem('google_refresh_token');

            if (!refreshToken) {
                console.error(
                    '[🚫] No refresh token available. Cannot refresh access.'
                );
                return Promise.reject(error);
            }

            if (isRefreshing) {
                console.log('[🔁] Already refreshing token — queuing this request...');
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axios(originalRequest);
                    })
                    .catch((err) => {
                        console.error(
                            '[🚫] Failed to retry queued request after refresh failure:',
                            err
                        );
                        return Promise.reject(err);
                    });
            }

            isRefreshing = true;

            try {
                console.log('[🔄] Refreshing access token...');
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
                    {
                        refresh: refreshToken,
                    }
                );

                const newAccessToken = response.data.access;
                const isGoogle = Boolean(localStorage.getItem('google_refresh_token'));

                if (isGoogle) {
                    localStorage.setItem('google_access_token', newAccessToken);
                    console.log('[✅] Google access token refreshed and stored');
                } else {
                    localStorage.setItem('access', newAccessToken);
                    console.log('[✅] Access token refreshed and stored');
                }

                chatbotApi.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return chatbotApi(originalRequest);
            } catch (err) {
                console.error(
                    '[🔥] Refresh failed. Logging out or asking to re-authenticate.',
                    err
                );
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default chatbotApi;