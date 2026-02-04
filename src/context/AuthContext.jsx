import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user session on mount
        const savedUser = localStorage.getItem('civic_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const sendOtp = async (phoneNumber) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'OTP sent successfully' });
            }, 1000);
        });
    };

    const verifyOtp = async (phoneNumber, otp) => {
        // Simulate API validation (accept any 4-digit OTP for demo)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (otp.length === 4) {
                    resolve({ success: true });
                } else {
                    reject({ success: false, message: 'Invalid OTP' });
                }
            }, 1000);
        });
    };

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('civic_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('civic_user');
    };

    const updateUser = (updates) => {
        const newUser = { ...user, ...updates };
        setUser(newUser);
        localStorage.setItem('civic_user', JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            sendOtp,
            verifyOtp,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
