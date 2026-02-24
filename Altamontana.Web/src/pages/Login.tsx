import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await apiLogin({ username, password });
      login(response.data.token);
      navigate('/control-panel');
    } catch (err: any) {
      setError(err.response?.data || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center pt-20 pb-20 px-4 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md p-8 card-theme ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white shadow-2xl border-none'}`}
      >
        <div className="text-center mb-10">
          <div className={`inline-flex p-4 rounded-full mb-6 ${isDark ? 'bg-[#ff6b00]/10 text-[#ff6b00]' : 'bg-[#003366]/10 text-[#003366]'}`}>
            <Lock size={32} />
          </div>
          <h1 className={isDark ? 'heading-h2-dark' : 'heading-h2-light'}>Acceso Restringido</h1>
          <p className="label-base text-muted mt-2">Personal Autorizado Solamente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="label-tiny text-muted flex items-center gap-2">
              <User size={12} /> Usuario
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full bg-transparent border-b-2 py-3 px-1 font-bold outline-none transition-colors ${isDark ? 'border-white/10 focus:border-[#ff6b00]' : 'border-slate-100 focus:border-[#003366]'}`}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="label-tiny text-muted flex items-center gap-2">
              <Lock size={12} /> Contraseña
            </label>
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent border-b-2 py-3 pl-1 pr-10 font-bold outline-none transition-colors ${isDark ? 'border-white/10 focus:border-[#ff6b00]' : 'border-slate-100 focus:border-[#003366]'}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-0 bottom-3 p-1 transition-opacity ${isDark ? 'text-white/40 hover:text-[#ff6b00]' : 'text-[#003366]/40 hover:text-[#003366]'}`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 text-red-500 label-base bg-red-500/10 p-4 border-l-4 border-red-500"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 flex items-center justify-center gap-3 btn-text-base transition-all active:scale-95 mt-4 ${
              isDark ? 'bg-[#ff6b00] text-black hover:bg-white italic' : 'bg-[#003366] text-white hover:bg-slate-800'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : 'IDENTIFICARSE'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
