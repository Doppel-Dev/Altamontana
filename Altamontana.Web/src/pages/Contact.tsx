/**
 * Contact - Página de contacto refactorizada
 * Usa hooks personalizados (useSiteContent, useThemeColors) y componentes UI
 */

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';
import { useThemeColors } from '../hooks/useThemeColors';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const Contact = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { isDark, getBgClass } = useThemeColors();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío de formulario
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: t('digitalChannel') || 'Canal Digital',
      value: t(content.contact_email || 'concierge@Altamontana.com'),
    },
    {
      icon: <Phone size={24} />,
      label: t('attention') || 'Atención',
      value: t(content.contact_phone || '+54 11 1234 5678'),
    },
    {
      icon: <MapPin size={24} />,
      label: t('base') || 'Base',
      value: t(content.contact_address || 'Sector Alpha, Vitacura'),
    },
  ];

  return (
    <div className={`min-h-screen pt-40 pb-24 transition-colors duration-500 ${getBgClass()}`}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column - Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <SectionHeader
              title={t(content.contact_title || 'contactTitle')}
              subtitle={t(content.contact_sub || 'contactSub')}
            />

            <div className="space-y-8 mt-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div
                    className={`p-4 ${
                      isDark ? 'bg-brand-orange text-black' : 'bg-brand-blue text-white'
                    }`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="label-tiny text-muted">
                      {info.label}
                    </p>
                    <p className="contact-value text-primary">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card variant="elevated" padding={false}>
              <Card.Header>
                <h3
                  className={isDark ? 'heading-h3-dark text-white' : 'heading-h3-light text-brand-blue'}
                >
                  {t('sendMsg')}
                </h3>
              </Card.Header>

              <Card.Body>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    label={t('formName')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    leftIcon={<Mail size={18} />}
                  />

                  <Input
                    type="email"
                    label={t('formEmail')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    leftIcon={<Mail size={18} />}
                  />

                  <div>
                    <label className="block label-base mb-2 text-primary">
                      {t('formMsg')}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className={`
                        w-full rounded-lg border transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-1
                        px-4 py-3
                        ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'}
                        ${isDark ? 'focus:border-brand-orange focus:ring-brand-orange' : 'focus:border-brand-blue focus:ring-brand-blue'}
                      `}
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth>
                    {t('transmit')}
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
