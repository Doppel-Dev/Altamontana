import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Experiences from './pages/Experiences';
import ExperienceDetail from './pages/ExperienceDetail';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentStatus from './pages/PaymentStatus';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-500" style={{ backgroundColor: 'var(--bg-sec)' }}>
        <Navbar />
        <main className="flex-grow">
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
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
