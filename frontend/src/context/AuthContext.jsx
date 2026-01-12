import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    // Set token in header for this request
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const res = await api.get('/auth/me', config);
                    setUser(res.data);
                } catch (error) {
                    console.error(error);
                    setToken(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        setToken(res.data.token);
        setUser(res.data);
    };

    const register = async (username, email, password) => {
        const res = await api.post('/auth/register', { username, email, password });
        setToken(res.data.token);
        setUser(res.data);
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
