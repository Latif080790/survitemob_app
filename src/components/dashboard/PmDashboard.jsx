import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import AllReportsList from './AllReportsList'; // Impor komponen baru

const PmDashboard = () => {
  const [summary, setSummary] = useState({
    totalReports: 0,
    approvedReports: 0,
    pendingReports: 0,
    rejectedReports: 0,
    progressPercentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reports'), (querySnapshot) => {
      let total = 0;
      let approved = 0;
      let pending = 0;
      let rejected = 0;

      querySnapshot.forEach((doc) => {
        const report = doc.data();
        total++;
        if (report.status === 'Approved') approved++;
        else if (report.status === 'Pending') pending++;
        else if (report.status === 'Rejected') rejected++;
      });

      const progress = total > 0 ? Math.round((approved / total) * 100) : 0;

      setSummary({
        totalReports: total,
        approvedReports: approved,
        pendingReports: pending,
        rejectedReports: rejected,
        progressPercentage: progress,
      });
      setLoading(false);
    }, (error) => {
      console.error("Error fetching summary: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-component">
      <h2>Dashboard Project Manager</h2>
      <p>Selamat datang! Berikut adalah ringkasan progres proyek secara keseluruhan.</p>

      {loading ? (
        <p>Memuat ringkasan...</p>
      ) : (
        <>
          <div className="summary-grid">
            <div className="card">
              <h4>Total Laporan</h4>
              <p className="summary-value">{summary.totalReports}</p>
            </div>
            <div className="card">
              <h4>Disetujui</h4>
              <p className="summary-value green">{summary.approvedReports}</p>
            </div>
            <div className="card">
              <h4>Menunggu</h4>
              <p className="summary-value yellow">{summary.pendingReports}</p>
            </div>
            <div className="card">
              <h4>Ditolak</h4>
              <p className="summary-value red">{summary.rejectedReports}</p>
            </div>
          </div>

          <div className="card progress-card">
            <h3>Progres Persetujuan Laporan</h3>
            <div className="progress-bar-container">
              <div 
                className="progress-bar"
                style={{ width: `${summary.progressPercentage}%` }}
              >
                {summary.progressPercentage}%
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tambahkan daftar semua laporan di sini */}
      <div className="mt-4">
        <AllReportsList />
      </div>
    </div>
  );
};

export default PmDashboard;
