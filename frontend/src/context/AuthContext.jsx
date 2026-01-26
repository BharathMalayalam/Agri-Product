import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (userid, password) => {
        try {
            const res = await axios.post('/api/auth/login', { userid, password });
            // The backend returns { message, role }. It likely doesn't return the full user object based on the code I saw earlier.
            // I saw: res.json({ message: 'Login successful!', role: user.role });
            // We need to store at least the role and userid. 
            // Ideally backend should return the user object or ID. 
            // For now we will store what we sent plus the role.
            // Wait, let's check auth.js again.
            // It sends message and role. It doesn't send the _id or name. This is a problem for "Order" which needs customer ID.
            // I need to update auth.js to return user info.

            // Assuming I update backend:
            const userData = { userid, role: res.data.role, ...res.data.user };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Login failed' };
        }
    };

    const signup = async (userData) => {
        try {
            const res = await axios.post('/api/auth/signup', userData);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Signup failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
