/// <reference types="vite/client" />
import axios from 'axios';
import { Experience, Booking } from '../types';

const API_URL = 'https://altamontana-production.up.railway.app/api/'; 

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (credentials: any) => api.post('/auth/login', credentials);
export const getProfile = () => api.get('/auth/profile');
export const updateProfile = (data: any) => api.put('/auth/update-profile', data);

export const getExperiences = () => api.get<Experience[]>('/experiences');
export const createExperience = (experience: any) => api.post('/experiences', experience);
export const deleteExperience = (id: number) => api.delete(`/experiences/${id}`);
export const getExperience = (id: number) => api.get<Experience>(`/experiences/${id}`);

export const updateExperience = (id: number, experience: Experience) => api.put(`/experiences/${id}`, experience);



export const getSiteContent = () => api.get<any[]>('/sitecontent');
export const createSiteContent = (content: any) => api.post('/sitecontent', content);
export const updateSiteContent = (id: number, content: any) => api.put(`/sitecontent/${id}`, content);



export const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<{url: string}>('/experiences/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
export const createBooking = (booking: Booking) => api.post<Booking>('/bookings', booking);

// Webpay Plus
export const createWebpayTransaction = (experienceId: number, amount: number) => 
    api.post<{token: string, url: string}>('/webpay/create', { experienceId, amount });
export const commitWebpayTransaction = (token: string) => 
    api.get(`/webpay/commit?token_ws=${token}`);

export default api;