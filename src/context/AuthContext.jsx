import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Axios default config
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    // Check if user is logged in on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            checkAuth(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const checkAuth = async (token) => {
        try {
            const res = await api.get('/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.user);
        } catch (err) {
            localStorage.removeItem('token');
            setError(err.response?.data?.message || 'Session expired');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setError(null);
        try {
            const res = await api.post('/auth/login', { email, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
        } catch (err) {
            let message = err.response?.data?.message || 'Login failed';
            if (err.response?.data?.errors) {
                const details = err.response.data.errors.map(e => e.message).join('. ');
                message = `${message}: ${details}`;
            } else if (!err.response) {
                message = 'Server is unreachable. Please ensure the backend is running.';
            }
            setError(message);
            return { success: false, message };
        }
    };

    const register = async (userData) => {
        setError(null);
        try {
            const res = await api.post('/auth/register', userData);
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
        } catch (err) {
            let message = err.response?.data?.message || 'Registration failed';
            if (err.response?.data?.errors) {
                const details = err.response.data.errors.map(e => e.message).join('. ');
                message = `${message}: ${details}`;
            } else if (!err.response) {
                message = 'Server is unreachable. Please ensure the backend is running.';
            }
            setError(message);
            return { success: false, message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
