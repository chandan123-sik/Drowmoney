import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Pages
import UserLayout from './module/user/UserLayout';
import Home from './module/user/pages/Home';
import Earn from './module/user/pages/Earn';
import History from './module/user/pages/History';
import Events from './module/user/pages/Events';
import Profile from './module/user/pages/Profile';
import Wallet from './module/user/pages/Wallet';
import Income from './module/user/pages/Income';
import Marketing from './module/user/pages/Marketing';
import MarketingHistory from './module/user/pages/MarketingHistory';
import TaskRunner from './module/user/pages/TaskRunner';
import ContestView from './module/user/pages/ContestView';
import BusinessIdeas from './module/user/pages/BusinessIdeas';

// Auth Pages
import AuthLayout from './module/user/auth/AuthLayout';
import Login from './module/user/auth/Login';
import Register from './module/user/auth/Register';
import KycSetup from './module/user/auth/KycSetup';
import PendingApproval from './module/user/auth/PendingApproval';

import { UserProvider } from './module/user/context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
        {/* Redirecting root to /user/auth/login first instead of home immediately */}
        <Route path="/" element={<Navigate to="/user/auth/login" replace />} />

        {/* Auth Module Routes */}
        <Route path="/user/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="kyc" element={<KycSetup />} />
          <Route path="pending" element={<PendingApproval />} />
        </Route>

        {/* User Module Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="earn" element={<Earn />} />
          <Route path="income" element={<Income />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="marketing-history" element={<MarketingHistory />} />
          <Route path="history" element={<History />} />
          <Route path="events" element={<Events />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<Profile />} />
          <Route path="business-ideas" element={<BusinessIdeas />} />
        </Route>

        {/* Immersive User Routes (No Bottom Nav) */}
        <Route path="/user/task/:id" element={<TaskRunner />} />
        <Route path="/user/contest/:id" element={<ContestView />} />

        {/* Fallback for safety */}
        <Route path="*" element={<Navigate to="/user/auth/login" replace />} />
      </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;


