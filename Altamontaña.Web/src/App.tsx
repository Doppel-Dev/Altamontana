/**
 * App - Componente principal con lazy loading y accesibilidad mejorada
 * Optimizado para performance con code splitting de rutas
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SpinnerFullPage } from './components/ui/Spinner';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loading de páginas para mejorar performance
const Home = lazy(() => import('./pages/Home'));
const Experiences = lazy(() => import('./pages/Experiences'));
const ExperienceDetail = lazy(() => import('./pages/ExperienceDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Confirmation = lazy(() => import('./pages/Confirmation'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const PaymentStatus = lazy(() => import('./pages/PaymentStatus'));

function App() {
  return (
    <Router>
      <div
        className="min-h-screen flex flex-col transition-colors duration-500"
        style={{ backgroundColor: 'var(--bg-sec)' }}
      >
        {/* Skip to content link (accesibilidad) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 bg-brand-blue text-white rounded-lg font-bold shadow-lg focus-visible-ring"
        >
          Saltar al contenido principal
        </a>

        <Navbar />

        <main id="main-content" className="flex-grow" role="main">
          <Suspense fallback={<SpinnerFullPage label="Cargando página..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/experience/:id" element={<ExperienceDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/control-panel" element={<Admin />} />
              </Route>

              <Route path="/payment-status" element={<PaymentStatus />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
