import { useState, useEffect } from 'react';
import { 
  getExperiences, updateExperience, uploadImage, 
  getSiteContent, updateSiteContent, getProfile, 
  updateProfile, createExperience, deleteExperience,
  createSiteContent
} from '../services/api';
import { Experience } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, RefreshCw, Image as ImageIcon, Type, DollarSign, 
  MapPin, Clock, Upload, Shield, Eye, EyeOff, Mail, 
  User, Lock, Plus, Trash2, Home, HelpCircle, MessageSquare, List, Layout, Languages, Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

type TabType = 'inicio' | 'vuelos' | 'faq' | 'contacto' | 'footer' | 'seguridad';
type EditLang = 'es' | 'en' | 'pt';

const Admin = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [editLang, setEditLang] = useState<EditLang>('es');
  
  const [profile, setProfile] = useState({ username: '', recoveryEmail: '' });
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [savingContent, setSavingContent] = useState<number | null>(null);
  const [uploading, setUploading] = useState<number | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  
  const { theme } = useTheme();
  const { login } = useAuth();
  const isDark = theme === 'dark';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expRes, contentRes, profileRes] = await Promise.all([
        getExperiences(),
        getSiteContent(),
        getProfile()
      ]);
      setExperiences(expRes.data);
      setSiteContent(contentRes.data);
      setProfile({ 
        username: profileRes.data.username, 
        recoveryEmail: profileRes.data.recoveryEmail 
      });
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
    setLoading(false);
  };

  const getVal = (rawVal: string) => {
    try {
      const obj = JSON.parse(rawVal);
      return obj[editLang] || obj['es'] || rawVal;
    } catch {
      return rawVal;
    }
  };

  const setVal = (rawVal: string, newVal: string) => {
    try {
      const obj = JSON.parse(rawVal);
      return JSON.stringify({ ...obj, [editLang]: newVal });
    } catch {
      return JSON.stringify({ es: rawVal, [editLang]: newVal });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await updateProfile({
        newUsername: profile.username,
        newEmail: profile.recoveryEmail,
        newPassword: newPassword || null
      });
      if (res.data.token) login(res.data.token);
      alert('Perfil actualizado');
      setNewPassword('');
    } catch (err: any) {
      alert(err.response?.data || 'Error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCreateExperience = async () => {
    const newExp = {
      title: JSON.stringify({ es: "Nueva Experiencia", en: "New Experience", pt: "Nova Experiência" }),
      description: JSON.stringify({ es: "Descripción...", en: "Description...", pt: "Descrição..." }),
      price: 0,
      imageUrl: "/img/placeholder.jpg",
      location: JSON.stringify({ es: "Ubicación", en: "Location", pt: "Localização" }),
      duration: "00 Minutos"
    };
    try {
      await createExperience(newExp);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!window.confirm('¿Eliminar?')) return;
    try {
      await deleteExperience(id);
      setExperiences(prev => prev.filter(e => e.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleUpdateContent = async (item: any) => {
    setSavingContent(item.id);
    try {
      await updateSiteContent(item.id, item);
      alert('Guardado para ' + editLang.toUpperCase());
    } catch (err) { console.error(err); }
    finally { setSavingContent(null); }
  };

  const handleUpdateExperience = async (exp: Experience) => {
    setSaving(exp.id);
    try {
      await updateExperience(exp.id, exp);
      alert('Guardado para ' + editLang.toUpperCase());
    } catch (err) { console.error(err); }
    finally { setSaving(null); }
  };

  const handleFileUpload = async (id: number, file: File, isContent = false) => {
    setUploading(id);
    try {
      const res = await uploadImage(file);
      if (isContent) {
        setSiteContent(prev => prev.map(c => c.id === id ? { ...c, value: res.data.url } : c));
      } else {
        setExperiences(prev => prev.map(exp => exp.id === id ? { ...exp, imageUrl: res.data.url } : exp));
      }
    } catch (err) { alert('Error al subir'); }
    finally { setUploading(null); }
  };

  const handleSyncFAQ = async () => {
    const faqKeys = [
      { key: 'faq_q1', val: JSON.stringify({ es: '¿Es seguro?', en: 'Is it safe?', pt: 'É seguro?' }) },
      { key: 'faq_a1', val: JSON.stringify({ es: 'Sí...', en: 'Yes...', pt: 'Sim...' }) },
      { key: 'faq_q2', val: JSON.stringify({ es: '¿Voucher?', en: 'Voucher?', pt: 'Voucher?' }) },
      { key: 'faq_a2', val: JSON.stringify({ es: 'Email...', en: 'Email...', pt: 'E-mail...' }) },
      { key: 'faq_q3', val: JSON.stringify({ es: '¿Seguro?', en: 'Insurance?', pt: 'Seguro?' }) },
      { key: 'faq_a3', val: JSON.stringify({ es: 'Incluido...', en: 'Included...', pt: 'Incluído...' }) },
      { key: 'faq_q4', val: JSON.stringify({ es: '¿Cancelación?', en: 'Cancellation?', pt: 'Cancelamento?' }) },
      { key: 'faq_a4', val: JSON.stringify({ es: '72h...', en: '72h...', pt: '72h...' }) }
    ];
    for (const item of faqKeys) {
      if (!siteContent.find(c => c.key === item.key)) {
        await createSiteContent({ key: item.key, value: item.val });
      }
    }
    fetchData();
    alert('FAQ Sincronizada');
  };

  const handleSyncContact = async () => {
    const contactKeys = [
      { key: 'contact_email', val: 'concierge@septos.com' },
      { key: 'contact_phone', val: '+54 11 1234 5678' },
      { key: 'contact_address', val: JSON.stringify({ es: 'Sector Alpha', en: 'Alpha Sector', pt: 'Setor Alfa' }) }
    ];
    for (const item of contactKeys) {
      if (!siteContent.find(c => c.key === item.key)) {
        await createSiteContent({ key: item.key, value: item.val });
      }
    }
    fetchData();
    alert('Contacto Sincronizado');
  };

  const handleSyncFooter = async () => {
    const footerKeys = [
      { key: 'footer_desc', val: JSON.stringify({ es: 'Líderes...', en: 'Leaders...', pt: 'Líderes...' }) },
      { key: 'footer_rights', val: JSON.stringify({ es: '© 2026...', en: '© 2026...', pt: '© 2026...' }) },
      { key: 'footer_srv1', val: JSON.stringify({ es: 'Vuelo Panorámico', en: 'Panoramic Flight', pt: 'Voo Panorâmico' }) },
      { key: 'footer_srv2', val: JSON.stringify({ es: 'Transporte Helicóptero', en: 'Helicopter Transport', pt: 'Transporte de Helicóptero' }) },
      { key: 'footer_srv3', val: JSON.stringify({ es: 'Heliski Experience', en: 'Heliski Experience', pt: 'Experiência Heliski' }) },
      { key: 'footer_srv4', val: JSON.stringify({ es: 'Private Charter', en: 'Private Charter', pt: 'Charter Privado' }) }
    ];
    for (const item of footerKeys) {
      if (!siteContent.find(c => c.key === item.key)) {
        await createSiteContent({ key: item.key, value: item.val });
      }
    }
    fetchData();
    alert('Footer Sincronizado');
  };

  const handleSyncHomeFeatures = async () => {
    const featKeys = [
      { key: 'home_hero_btn', val: JSON.stringify({ es: 'Ver Experiencias', en: 'View Experiences', pt: 'Ver Experiências' }) },
      { key: 'home_feat1_title', val: JSON.stringify({ es: 'Flota Moderna', en: 'Modern Fleet', pt: 'Frota Moderna' }) },
      { key: 'home_feat1_desc', val: JSON.stringify({ es: 'Aeronaves Airbus y Bell...', en: 'Airbus and Bell...', pt: 'Aeronaves Airbus...' }) },
      { key: 'home_feat2_title', val: JSON.stringify({ es: 'Pilotos Expertos', en: 'Expert Pilots', pt: 'Pilotos Especialistas' }) },
      { key: 'home_feat2_desc', val: JSON.stringify({ es: 'Comandantes con miles...', en: 'Commanders with...', pt: 'Comandantes com...' }) },
      { key: 'home_feat3_title', val: JSON.stringify({ es: 'Lujo Exclusivo', en: 'Exclusive Luxury', pt: 'Luxo Exclusivo' }) },
      { key: 'home_feat3_desc', val: JSON.stringify({ es: 'Experiencias personalizadas...', en: 'Personalized...', pt: 'Experiências...' }) }
    ];
    for (const item of featKeys) {
      if (!siteContent.find(c => c.key === item.key)) {
        await createSiteContent({ key: item.key, value: item.val });
      }
    }
    fetchData();
    alert('Características Sincronizadas');
  };

  const handleSyncCatalog = async () => {
    const catalogKeys = [
      { key: 'catalog_title', val: JSON.stringify({ es: 'Nuestras Experiencias', en: 'Our Experiences', pt: 'Nossas Experiências' }) },
      { key: 'catalog_sub', val: JSON.stringify({ es: 'Catálogo de Expediciones', en: 'Expedition Catalog', pt: 'Catálogo de Expedições' }) }
    ];
    for (const item of catalogKeys) {
      if (!siteContent.find(c => c.key === item.key)) {
        await createSiteContent({ key: item.key, value: item.val });
      }
    }
    fetchData();
    alert('Títulos de Catálogo Sincronizados');
  };

  const filteredContent = siteContent.filter(c => {
    if (activeTab === 'inicio') return c.key.startsWith('home_');
    if (activeTab === 'vuelos') return c.key.startsWith('catalog_');
    if (activeTab === 'faq') return c.key.startsWith('faq_');
    if (activeTab === 'contacto') return c.key.startsWith('contact_');
    if (activeTab === 'footer') return c.key.startsWith('footer_');
    return false;
  });

  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'vuelos', label: 'Experiencias', icon: List },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contacto', label: 'Contacto', icon: MessageSquare },
    { id: 'footer', label: 'Footer', icon: Layout },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
  ];

  // Componente de botón común para consistencia
  const ActionButton = ({ onClick, icon: Icon, children, variant = 'primary', loading = false }: any) => {
    const baseClass = "px-6 py-3 font-black uppercase italic text-[10px] flex items-center gap-2 transition-all active:scale-95 shadow-lg";
    const variants: any = {
      primary: isDark ? 'bg-[#ff6b00] text-black hover:bg-white' : 'bg-[#003366] text-white hover:bg-slate-800',
      secondary: isDark ? 'bg-white/10 text-white hover:bg-[#ff6b00] hover:text-black' : 'bg-slate-100 text-[#003366] hover:bg-[#003366] hover:text-white',
      danger: 'bg-red-500 text-white hover:bg-red-700'
    };
    return (
      <button onClick={onClick} disabled={loading} className={`${baseClass} ${variants[variant]} ${loading ? 'opacity-50' : ''}`}>
        {loading ? <RefreshCw size={14} className="animate-spin" /> : (Icon && <Icon size={14} />)}
        {children}
      </button>
    );
  };

  if (loading) return <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}><div className="font-black italic animate-pulse uppercase tracking-widest">Accediendo al Sistema...</div></div>;

  return (
    <div className={`min-h-screen pt-32 md:pt-40 pb-24 transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="section-container">
        
        <header className="mb-12 border-b border-current border-opacity-20 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className={`text-4xl md:text-6xl font-black italic uppercase tracking-tighter ${isDark ? 'text-white' : 'text-[#003366]'}`}>Panel Admin</h1>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Control Maestro Multilingüe</p>
          </div>
          
          <div className="flex flex-col items-end gap-6 w-full md:w-auto">
            <div className={`flex items-center gap-2 p-1 rounded-xl shadow-xl border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'}`}>
              <div className={`px-4 py-2 text-[10px] font-black uppercase flex items-center gap-2 border-r border-current border-opacity-10 ${isDark ? 'text-white/40' : 'text-slate-400'}`}><Languages size={14} /> Editar en:</div>
              {(['es', 'en', 'pt'] as EditLang[]).map(lang => (
                <button key={lang} onClick={() => setEditLang(lang)} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${editLang === lang ? (isDark ? 'bg-[#ff6b00] text-black shadow-lg' : 'bg-[#003366] text-white shadow-lg') : 'hover:bg-current hover:bg-opacity-10 opacity-40 hover:opacity-100'}`}>{lang}</button>
              ))}
            </div>
            <button onClick={fetchData} className={`p-4 rounded-full transition-all hover:rotate-180 shadow-lg border ${isDark ? 'bg-neutral-900 border-neutral-800 text-[#ff6b00] hover:bg-[#ff6b00] hover:text-black' : 'bg-white border-slate-200 text-[#003366] hover:bg-[#003366] hover:text-white'}`}><RefreshCw size={24} /></button>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2 md:gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)} className={`flex items-center gap-3 px-6 py-4 font-black uppercase italic text-xs tracking-tighter transition-all ${isActive ? (isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white scale-105') : (isDark ? 'bg-white/5 text-white/40 hover:bg-white/10' : 'bg-white text-slate-400 hover:bg-slate-100 shadow-sm')}`}><Icon size={18} /><span className="hidden sm:inline">{tab.label}</span></button>
            );
          })}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab + editLang} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
            
            {activeTab === 'vuelos' && (
              <div className="space-y-12">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black uppercase italic opacity-60">Catálogo ({editLang})</h2>
                  <div className="flex gap-4">
                    <ActionButton onClick={handleSyncCatalog} variant="secondary">Sincronizar</ActionButton>
                    <ActionButton onClick={handleCreateExperience} icon={Plus}>Nueva Misión</ActionButton>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  {filteredContent.map((item) => (
                    <div key={item.id} className={`p-8 card-theme space-y-6 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white shadow-xl'}`}>
                      <div className="flex justify-between items-center border-b border-current border-opacity-10 pb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{item.key === 'catalog_title' ? 'Título Catálogo' : 'Subtítulo Catálogo'}</span>
                        <button onClick={() => handleUpdateContent(item)} disabled={savingContent === item.id} className={`p-3 rounded-lg ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}>{savingContent === item.id ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}</button>
                      </div>
                      <textarea value={getVal(item.value)} onChange={(e) => setSiteContent(prev => prev.map(c => c.id === item.id ? { ...c, value: setVal(item.value, e.target.value) } : c))} className="w-full bg-transparent border-b-2 py-3 font-bold outline-none text-base" rows={2} />
                    </div>
                  ))}
                </div>

                {experiences.map((exp) => (
                  <div key={exp.id} className={`p-8 card-theme grid lg:grid-cols-3 gap-10 relative ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white shadow-xl border-none'}`}>
                    <button onClick={() => handleDeleteExperience(exp.id)} className="absolute top-4 right-4 p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all"><Trash2 size={20} /></button>
                    <div className="space-y-4">
                      <div className="aspect-video overflow-hidden border-2 border-current opacity-80"><img src={exp.imageUrl} className="w-full h-full object-cover" /></div>
                      <div className="flex gap-2">
                        <input type="text" value={exp.imageUrl} onChange={(e) => setExperiences(prev => prev.map(ex => ex.id === exp.id ? { ...ex, imageUrl: e.target.value } : ex))} className={`flex-1 bg-transparent border-b text-xs py-2 outline-none ${isDark ? 'border-white/10' : 'border-slate-100'}`} />
                        <label className={`p-2 cursor-pointer ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}>
                          {uploading === exp.id ? <RefreshCw className="animate-spin" size={16} /> : <Upload size={16} />}
                          <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(exp.id, e.target.files[0])} />
                        </label>
                      </div>
                    </div>
                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="text-[9px] font-bold opacity-40 uppercase block mb-2">Título ({editLang})</label>
                        <input type="text" value={getVal(exp.title)} onChange={(e) => setExperiences(prev => prev.map(ex => ex.id === exp.id ? { ...ex, title: setVal(ex.title, e.target.value) } : ex))} className="w-full bg-transparent border-b-2 py-2 text-xl font-black italic uppercase outline-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[9px] font-bold opacity-40 uppercase block mb-2">Descripción ({editLang})</label>
                        <textarea value={getVal(exp.description)} rows={2} onChange={(e) => setExperiences(prev => prev.map(ex => ex.id === exp.id ? { ...ex, description: setVal(ex.description, e.target.value) } : ex))} className="w-full bg-transparent border-2 p-3 text-sm outline-none" />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold opacity-40 uppercase block mb-2">Precio (USD)</label>
                        <input type="number" value={exp.price} onChange={(e) => setExperiences(prev => prev.map(ex => ex.id === exp.id ? { ...ex, price: parseFloat(e.target.value) } : ex))} className="w-full bg-transparent border-b-2 py-2 font-bold outline-none" />
                      </div>
                      <div className="md:col-span-2 flex justify-end pt-4">
                        <ActionButton onClick={() => handleUpdateExperience(exp)} icon={Save} loading={saving === exp.id}>Guardar {editLang.toUpperCase()}</ActionButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(activeTab === 'inicio' || activeTab === 'faq' || activeTab === 'contacto' || activeTab === 'footer') && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black uppercase italic opacity-60">Contenido ({editLang})</h2>
                  <div className="flex flex-wrap gap-4">
                    {activeTab === 'inicio' && <ActionButton onClick={handleSyncHomeFeatures} icon={Sparkles} variant="secondary">Sincronizar Inicio</ActionButton>}
                    {activeTab === 'faq' && <ActionButton onClick={handleSyncFAQ} variant="secondary">Sincronizar FAQ</ActionButton>}
                    {activeTab === 'contacto' && <ActionButton onClick={handleSyncContact} variant="secondary">Sincronizar Contacto</ActionButton>}
                    {activeTab === 'footer' && <ActionButton onClick={handleSyncFooter} variant="secondary">Sincronizar Footer</ActionButton>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredContent.map((item) => (
                    <div key={item.id} className={`p-8 card-theme space-y-6 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white shadow-xl border-none'}`}>
                      <div className="flex justify-between items-center border-b border-current border-opacity-10 pb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                          {item.key === 'home_hero_btn' ? 'Texto Botón Principal' :
                           item.key === 'home_feat1_title' ? 'Característica 1: Título' : 
                           item.key === 'home_feat1_desc' ? 'Característica 1: Descripción' :
                           item.key === 'home_feat2_title' ? 'Característica 2: Título' :
                           item.key === 'home_feat2_desc' ? 'Característica 2: Descripción' :
                           item.key === 'home_feat3_title' ? 'Característica 3: Título' :
                           item.key === 'home_feat3_desc' ? 'Característica 3: Descripción' :
                           item.key.replace(/_/g, ' ')}
                        </span>
                        <button onClick={() => handleUpdateContent(item)} disabled={savingContent === item.id} className={`p-3 rounded-lg ${isDark ? 'bg-[#ff6b00] text-black' : 'bg-[#003366] text-white'}`}>{savingContent === item.id ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}</button>
                      </div>
                      <textarea value={getVal(item.value)} onChange={(e) => setSiteContent(prev => prev.map(c => c.id === item.id ? { ...c, value: setVal(item.value, e.target.value) } : c))} className="w-full bg-transparent border-b-2 py-3 font-bold outline-none text-base" rows={4} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'seguridad' && (
              <form onSubmit={handleUpdateProfile} className={`p-12 card-theme max-w-4xl mx-auto space-y-12 relative overflow-hidden ${isDark ? 'bg-neutral-900/50 border-neutral-800 backdrop-blur-xl' : 'bg-white shadow-2xl border-none'}`}>
                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase opacity-40">Operador</label>
                    <input type="text" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} className="w-full bg-transparent border-b-2 py-4 font-black text-xl outline-none" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase opacity-40">Canal de Recuperación</label>
                    <input type="email" value={profile.recoveryEmail} onChange={(e) => setProfile({ ...profile, recoveryEmail: e.target.value })} className="w-full bg-transparent border-b-2 py-4 font-bold text-lg outline-none" />
                  </div>
                  <div className="space-y-4 md:col-span-2">
                    <label className="text-[10px] font-black uppercase opacity-40">Protocolo de Acceso</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="..." className="w-full bg-transparent border-b-2 py-4 pr-12 font-bold outline-none" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 bottom-4 p-2 opacity-40 hover:opacity-100"><Eye size={24} /></button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-8 relative z-10">
                  <ActionButton onClick={handleUpdateProfile} loading={savingProfile}>Actualizar Credenciales</ActionButton>
                </div>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;