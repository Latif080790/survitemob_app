import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import './ReportDetailPage.css'; // Kita akan buat file CSS ini

const ReportDetailPage = () => {
  const { reportId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const reportRef = doc(db, 'reports', reportId);
        const reportSnap = await getDoc(reportRef);

        if (reportSnap.exists()) {
          setReport({ id: reportSnap.id, ...reportSnap.data() });
        } else {
          setError('Laporan tidak ditemukan.');
        }
      } catch (err) {
        setError('Gagal memuat laporan.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleUpdateStatus = async (newStatus) => {
    setMessage(`Memperbarui status menjadi "${newStatus}"...`);
    try {
        const reportRef = doc(db, 'reports', reportId);
        await updateDoc(reportRef, {
            status: newStatus,
            reviewedBy: {
                uid: currentUser.uid,
                email: currentUser.email,
                role: currentUser.role,
            },
            reviewedAt: new Date(),
        });
        setReport(prev => ({...prev, status: newStatus}));
        setMessage('Status laporan berhasil diperbarui!');
        setTimeout(() => navigate('/'), 2000); // Redirect back after 2 seconds
    } catch (err) {
        setMessage('Gagal memperbarui status. Silakan coba lagi.');
        console.error(err);
    }
  };

  if (loading) {
    return <div className="report-detail-page"><h2>Memuat Laporan...</h2></div>;
  }

  if (error) {
    return <div className="report-detail-page"><h2>Error</h2><p>{error}</p></div>;
  }

  if (!report) {
    return null; // or some other placeholder
  }

  // Hanya user dengan role 'pm' atau 'qaqc' yang bisa approve/reject
  const canReview = currentUser.role === 'pm' || currentUser.role === 'qaqc';

  return (
    <div className="report-detail-page">
      <div className="card">
        <div className="report-header">
          <h2>Detail Laporan Proyek</h2>
          <button onClick={() => navigate(-1)} className="btn-secondary">&larr; Kembali</button>
        </div>

        <div className="report-info">
          <p><strong>Tanggal Laporan:</strong> {new Date(report.reportDate).toLocaleDateString()}</p>
          <p><strong>Dikirim oleh:</strong> {report.submittedBy.email}</p>
          <p><strong>Status:</strong> <StatusBadge status={report.status} /></p>
        </div>

        <div className="report-body">
          <h3>Deskripsi Pekerjaan</h3>
          <p>{report.description}</p>
        </div>

        {report.photoURLs && report.photoURLs.length > 0 && (
            <div className="report-gallery">
                <h3>Foto Dokumentasi</h3>
                <div className="image-grid">
                    {report.photoURLs.map((url, index) => (
                        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                            <img src={url} alt={`Dokumentasi ${index + 1}`} />
                        </a>
                    ))}
                </div>
            </div>
        )}

        {message && <p className="form-message">{message}</p>}

        {canReview && report.status === 'Pending' && (
          <div className="report-actions">
            <h3>Tindakan Review</h3>
            <p>Sebagai {currentUser.role.toUpperCase()}, Anda dapat menyetujui atau menolak laporan ini.</p>
            <button onClick={() => handleUpdateStatus('Approved')} className="btn-approve">Setujui</button>
            <button onClick={() => handleUpdateStatus('Rejected')} className="btn-reject">Tolak</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetailPage;
