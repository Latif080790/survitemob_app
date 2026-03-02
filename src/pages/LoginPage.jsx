import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CraneScene from '../../components/auth/CraneScene'; // Impor adegan 3D
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/'); // Redirect ke dashboard setelah berhasil login
    } catch (err) {
      setError('Gagal melakukan login. Periksa kembali email dan password Anda.');
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* Adegan 3D sebagai latar belakang */}
      <Suspense fallback={<div className="loading-backdrop"><h2>Memuat Adegan...</h2></div>}>
        <CraneScene />
      </Suspense>

      {/* Kartu Formulir Login */}
      <div className="login-form-card animated-fade-in">
        <h1 className="app-title">Survi</h1>
        <p className="app-subtitle">Sistem Survey dan Verifikasi</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="contoh@email.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Memproses...' : 'Sign In'}
          </button>
        </form>

        <footer className="login-footer">
          <p>Butuh bantuan? <a href="#">Hubungi Administrator</a></p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
