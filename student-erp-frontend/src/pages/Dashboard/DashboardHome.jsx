// src/pages/Dashboard/DashboardHome.jsx
import React, { useEffect, useState } from 'react';
import { get } from '../../services/api';

function DashboardHome() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await get('/dashboard');
        setUserData(data);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    }
    fetchDashboard();
  }, []);

  if (!userData) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1>Welcome, {userData.name}</h1>
      {/* render other dashboard stats here */}
    </div>
  );
}

export default DashboardHome;
