import React from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import MandorDashboard from '../components/dashboard/MandorDashboard';
import QaQcDashboard from '../components/dashboard/QaQcDashboard';
import PmDashboard from '../components/dashboard/PmDashboard';
import './DashboardPage.css'; // Kita akan buat file CSS ini

const DashboardPage = () => {
  const { currentUser, loading } = useAuth();

  const renderDashboard = () => {
    if (loading) {
      return <p>Loading dashboard...</p>;
    }

    switch (currentUser?.role) {
      case 'mandor':
        return <MandorDashboard />;
      case 'qaqc':
        return <QaQcDashboard />;
      case 'pm':
        return <PmDashboard />;
      default:
        // Tampilan jika role tidak dikenali atau belum di-set
        return (
          <div>
            <h2>Welcome</h2>
            <p>Your role is not set. Please contact an administrator.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Construction Workflow</h1>
        <div className="user-info">
          <span>{currentUser?.email} | <strong>{currentUser?.role?.toUpperCase()}</strong></span>
          <button onClick={() => auth.signOut()} className="btn-logout">Sign Out</button>
        </div>
      </header>
      <main className="dashboard-main">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default DashboardPage;
