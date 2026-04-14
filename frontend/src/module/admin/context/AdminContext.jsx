import React, { createContext, useContext, useState } from 'react';
import { SettingsDataService } from '../../../services/SettingsDataService';

const AdminContext = createContext({
    isAdminLoggedIn: false,
    loginError: '',
    adminLogin: () => false,
    adminLogout: () => { },
});

export const AdminProvider = ({ children }) => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
        () => localStorage.getItem('admin_auth') === 'true'
    );
    const [loginError, setLoginError] = useState('');

    const adminLogin = (email, password) => {
        const config = SettingsDataService.getSettings();
        
        if (email === config.adminEmail && password === config.adminPassword) {
            setIsAdminLoggedIn(true);
            setLoginError('');
            localStorage.setItem('admin_auth', 'true');
            return true;
        } else {
            setLoginError('Invalid email or password.');
            return false;
        }
    };

    const adminLogout = () => {
        setIsAdminLoggedIn(false);
        localStorage.removeItem('admin_auth');
    };

    return (
        <AdminContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout, loginError }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
