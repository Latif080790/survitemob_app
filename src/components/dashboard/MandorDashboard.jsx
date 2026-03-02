import React, { useState } from 'react';
import { db, storage } from '../../firebase'; // Import firestore and storage
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext';

const MandorDashboard = () => {
  const { currentUser } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files.length > 5) {
      setMessage('Anda hanya dapat mengupload maksimal 5 file.');
      e.target.value = null; // Reset file input
    } else {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setMessage('Deskripsi pekerjaan tidak boleh kosong.');
      return;
    }

    setLoading(true);
    setMessage('Mengirim laporan...');

    try {
      // 1. Create the report document in Firestore to get an ID
      const reportRef = await addDoc(collection(db, 'reports'), {
        submittedAt: serverTimestamp(),
        reportDate: date,
        description: description,
        status: 'Pending',
        submittedBy: {
          uid: currentUser.uid,
          email: currentUser.email,
          role: currentUser.role,
        },
        photoURLs: [], // Initialize with an empty array
      });

      // 2. Upload files to Storage if any exist
      const photoURLs = [];
      if (files.length > 0) {
        setMessage(`Mengupload ${files.length} gambar...`);
        for (const file of files) {
          const storageRef = ref(storage, `reports/${reportRef.id}/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          photoURLs.push(downloadURL);
        }
      }

      // 3. Update the report document with the photo URLs
      if (photoURLs.length > 0) {
        await updateDoc(doc(db, 'reports', reportRef.id), {
          photoURLs: photoURLs,
        });
      }

      // 4. Reset form and show success message
      setDescription('');
      setFiles([]);
      document.getElementById('file-input').value = null;
      setMessage('Laporan harian berhasil dikirim untuk review!');

    } catch (error) {
      console.error("Error submitting report: ", error);
      setMessage('Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-component">
      <h2>Dashboard Mandor</h2>
      <div className="card">
        <h3>Laporan Progres Harian</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Tanggal Pelaporan</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required disabled={loading} />
          </div>
          <div className="input-group">
            <label>Deskripsi Pekerjaan</label>
            <textarea 
              rows="4" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Pemasangan bata di lantai 2, area utara."
              required
              disabled={loading}
            ></textarea>
          </div>
          <div className="input-group">
            <label>Upload Foto (max 5)</label>
            <input id="file-input" type="file" multiple accept="image/*" onChange={handleFileChange} disabled={loading} />
          </div>
          
          {message && <p className={`form-message`}>{message}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim Laporan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MandorDashboard;
