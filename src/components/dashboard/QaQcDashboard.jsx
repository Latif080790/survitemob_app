import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const QaQcDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query untuk mengambil laporan yang statusnya masih 'Pending'
    const q = query(
      collection(db, 'reports'), 
      where('status', '==', 'Pending'),
      orderBy('submittedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reportsData = [];
      querySnapshot.forEach((doc) => {
        reportsData.push({ id: doc.id, ...doc.data() });
      });
      setReports(reportsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching reports: ", error);
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-component">
      <h2>Dashboard QA/QC</h2>
      <p>Berikut adalah daftar laporan progres harian yang memerlukan review Anda.</p>

      <div className="card">
        <h3>Daftar Laporan Progres (Status: Pending)</h3>
        {loading ? (
          <p>Memuat laporan...</p>
        ) : (
          <table className="report-table">
            <thead>
              <tr>
                <th>Tanggal Laporan</th>
                <th>Diajukan Oleh</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map(report => (
                  <tr key={report.id}>
                    <td>{new Date(report.reportDate).toLocaleDateString()}</td>
                    <td>{report.submittedBy.email}</td>
                    <td>
                      <span className={`status ${report.status.toLowerCase()}`}>{report.status}</span>
                    </td>
                    <td>
                      {/* Tombol ini nanti akan membuka detail laporan */}
                      <button className="btn-secondary">Review Laporan</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Tidak ada laporan yang menunggu untuk direview.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default QaQcDashboard;
