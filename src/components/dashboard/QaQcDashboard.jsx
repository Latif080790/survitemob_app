import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import AllReportsList from './AllReportsList'; // Impor komponen daftar laporan

const QaQcDashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query untuk menghitung laporan yang statusnya masih 'Pending'
    const q = query(collection(db, 'reports'), where('status', '==', 'Pending'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPendingCount(querySnapshot.size);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching pending reports count: ", error);
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-component">
      <h2>Dashboard QA/QC</h2>
      <p>Selamat datang! Anda dapat mereview laporan progres harian dari mandor.</p>

      {/* Kartu Ringkasan */}
      <div className="summary-grid">
        <div className="card">
          <h4>Laporan Menunggu Review</h4>
          {loading ? (
            <p>Memuat...</p>
          ) : (
            <p className="summary-value yellow">{pendingCount}</p>
          )}
        </div>
      </div>

      {/* Daftar Semua Laporan */}
      <div className="mt-4">
        <AllReportsList />
      </div>
    </div>
  );
};

export default QaQcDashboard;
