import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import StatusBadge from '../StatusBadge';

const AllReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const reportsQuery = query(collection(db, 'reports'));

    const unsubscribe = onSnapshot(reportsQuery, (querySnapshot) => {
      const reportsData = [];
      querySnapshot.forEach((doc) => {
        reportsData.push({ id: doc.id, ...doc.data() });
      });
      // Urutkan laporan, yang terbaru di atas
      reportsData.sort((a, b) => b.reportDate.seconds - a.reportDate.seconds);
      setReports(reportsData);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setError('Gagal memuat daftar laporan. Silakan coba lagi nanti.');
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Memuat daftar laporan...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="task-list-container card">
      <h3>Semua Laporan Proyek</h3>
      {reports.length === 0 ? (
        <p>Belum ada laporan yang dibuat.</p>
      ) : (
        <ul className="task-list">
          {reports.map(report => (
            <li key={report.id} className="task-item">
              <Link to={`/report/${report.id}`} className="task-link">
                <div className="task-info">
                  <span className="task-description">{report.description}</span>
                  <span className="task-date">{new Date(report.reportDate.seconds * 1000).toLocaleDateString()}</span>
                </div>
                <StatusBadge status={report.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllReportsList;
