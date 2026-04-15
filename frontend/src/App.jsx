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
import IncomeInfo from './module/user/pages/IncomeInfo';
import Marketing from './module/user/pages/Marketing';
import MarketingHistory from './module/user/pages/MarketingHistory';
import TaskRunner from './module/user/pages/TaskRunner';
import ContestView from './module/user/pages/ContestView';
import BusinessIdeas from './module/user/pages/BusinessIdeas';
import InfoPage from './module/user/pages/InfoPage';
import HelpCenter from './module/user/pages/HelpCenter';
import FutureFund from './module/user/pages/FutureFund';
import PromoteBrand from './module/user/pages/PromoteBrand';
import WatchAndEarn from './module/user/pages/WatchAndEarn';
import AdPlayer from './module/user/pages/AdPlayer';
import QuizView from './module/user/pages/QuizView';
import LuckyDrawView from './module/user/pages/LuckyDrawView';
import GoldPredictionView from './module/user/pages/GoldPredictionView';
import TaskRaceView from './module/user/pages/TaskRaceView';

// Auth Pages
import AuthLayout from './module/user/auth/AuthLayout';
import Login from './module/user/auth/Login';
import Register from './module/user/auth/Register';
import KycSetup from './module/user/auth/KycSetup';
import PendingApproval from './module/user/auth/PendingApproval';
import AdminLogin from './module/admin/auth/Login';
import AdminLayout from './module/admin/AdminLayout';
import AdminDashboard from './module/admin/pages/Dashboard';
import Users from './module/admin/pages/Users';
import Payments from './module/admin/pages/Payments';
import Affiliates from './module/admin/pages/Affiliates';
import CoinsAndTasks from './module/admin/pages/CoinsAndTasks';
import FutureFundAdmin from './module/admin/pages/FutureFundAdmin';
import EventsAdmin from './module/admin/pages/Events';
import BusinessContent from './module/admin/pages/BusinessContent';
import Wallets from './module/admin/pages/Wallets';
import NotificationsAdmin from './module/admin/pages/Notifications';
import Reports from './module/admin/pages/Reports';
import SettingsAdmin from './module/admin/pages/Settings';
import KYC from './module/admin/pages/KYC';
import Promotions from './module/admin/pages/Promotions';
import WatchAndEarnAdmin from './module/admin/pages/WatchAndEarnAdmin';
import LayoutManager from './module/admin/pages/LayoutManager';
import MarketingManager from './module/admin/pages/MarketingManager';
import { AdminProvider } from './module/admin/context/AdminContext';

import { UserProvider } from './module/user/context/UserContext';

function App() {
  return (
    <AdminProvider>
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
              <Route path="income-info" element={<IncomeInfo />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="marketing-history" element={<MarketingHistory />} />
              <Route path="history" element={<History />} />
              <Route path="events" element={<Events />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="profile" element={<Profile />} />
              <Route path="business-ideas" element={<BusinessIdeas />} />
              <Route path="watch" element={<WatchAndEarn />} />
              <Route path="info/:type" element={<InfoPage />} />
              <Route path="help" element={<HelpCenter />} />
              <Route path="future-fund" element={<FutureFund />} />
            </Route>

            {/* Immersive User Routes (No Bottom Nav) */}
            <Route path="/user/task/:id" element={<TaskRunner />} />
            <Route path="/user/promote-brand" element={<PromoteBrand />} />
            <Route path="/user/ad-player/:id" element={<AdPlayer />} />
            <Route path="/user/quiz/:id" element={<QuizView />} />
            <Route path="/user/lucky-draw/:id" element={<LuckyDrawView />} />
            <Route path="/user/gold-prediction/:id" element={<GoldPredictionView />} />
            <Route path="/user/task-race/:id" element={<TaskRaceView />} />
            <Route path="/user/contest/:id" element={<ContestView />} />

            {/* Admin Module Routes */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="kyc" element={<KYC />} />
              <Route path="users" element={<Users />} />
              <Route path="payments" element={<Payments />} />
              <Route path="affiliates" element={<Affiliates />} />
              <Route path="tasks" element={<CoinsAndTasks />} />
              <Route path="future-fund" element={<FutureFundAdmin />} />
              <Route path="events" element={<EventsAdmin />} />
              <Route path="business-content" element={<BusinessContent />} />
              <Route path="withdrawals" element={<Wallets />} />
              <Route path="notifications" element={<NotificationsAdmin />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="watch-and-earn" element={<WatchAndEarnAdmin />} />
              <Route path="reports" element={<Reports />} />
              <Route path="layout" element={<LayoutManager />} />
              <Route path="marketing-content" element={<MarketingManager />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>

            {/* Fallback for safety */}
            <Route path="*" element={<Navigate to="/user/auth/login" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </AdminProvider>
  );
}

export default App;


