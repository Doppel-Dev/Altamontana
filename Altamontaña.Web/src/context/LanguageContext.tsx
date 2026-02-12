import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en' | 'pt';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Navbar
  home: { es: 'Inicio', en: 'Home', pt: 'Início' },
  experiences: { es: 'Experiencias', en: 'Experiences', pt: 'Experiências' },
  faq: { es: 'Seguridad', en: 'Safety', pt: 'Segurança' },
  contact: { es: 'Contacto', en: 'Contact', pt: 'Contato' },
  companyName: { es: 'Alta Montaña', en: 'Alta Montaña', pt: 'Alta Montaña' },
  explore: { es: 'Explorar', en: 'Explore', pt: 'Explorar' },
  services: { es: 'Servicios', en: 'Services', pt: 'Serviços' },
  viewCatalog: { es: 'Ver Experiencias', en: 'View Experiences', pt: 'Ver Experiências' },
  curatedExpeditions: { es: 'Expediciones Seleccionadas', en: 'Curated Expeditions', pt: 'Expedições Selecionadas' },
  mission: { es: 'MISIÓN', en: 'MISSION', pt: 'MISSÃO' },
  price: { es: 'PRECIO', en: 'PRICE', pt: 'PREÇO' },
  from: { es: 'DESDE', en: 'FROM', pt: 'A PARTIR DE' },
  viewDetails: { es: 'Ver Detalles', en: 'View Details', pt: 'Ver Detalhes' },
  digitalChannel: { es: 'Canal Digital', en: 'Digital Channel', pt: 'Canal Digital' },
  attention: { es: 'Atención', en: 'Attention', pt: 'Atenção' },
  base: { es: 'Base', en: 'Base', pt: 'Base' },
  sendMsg: { es: 'Enviar Mensaje', en: 'Send Message', pt: 'Enviar Mensagem' },
  transmit: { es: 'Transmitir', en: 'Transmit', pt: 'Transmitir' },
  formName: { es: 'NOMBRE', en: 'NAME', pt: 'NOME' },
  formEmail: { es: 'EMAIL', en: 'EMAIL', pt: 'E-MAIL' },
  formMsg: { es: 'MENSAJE', en: 'MESSAGE', pt: 'MENSAGEM' },
  checkoutTitle: { es: 'Finalizar Reserva', en: 'Complete Booking', pt: 'Finalizar Reserva' },
  fullName: { es: 'Nombre Completo', en: 'Full Name', pt: 'Nome Completo' },
  passengers: { es: 'Pasajeros', en: 'Passengers', pt: 'Passageiros' },
  total: { es: 'Total', en: 'Total', pt: 'Total' },
  confirmAndPay: { es: 'Confirmar & Pagar', en: 'Confirm & Pay', pt: 'Confirmar & Pagar' },
  // FAQ
  faqTitle: { es: 'Seguridad & FAQ', en: 'Safety & FAQ', pt: 'Segurança & FAQ' },
  faqSub: { es: 'Respuestas para su tranquilidad.', en: 'Answers for your peace of mind.', pt: 'Respostas para sua tranquilidade.' },
  support247: { es: 'Soporte 24/7', en: '24/7 Support', pt: 'Suporte 24/7' },
  supportDesc: { es: 'Nuestros oficiales de enlace están disponibles para coordinar su misión en cualquier momento.', en: 'Our liaison officers are available to coordinate your mission at any time.', pt: 'Nossos oficiais de ligação estão disponíveis para coordenar sua missão a qualquer momento.' },
  airInsurance: { es: 'Seguro Aéreo', en: 'Air Insurance', pt: 'Seguro Aéreo' },
  airInsuranceDesc: { es: 'Todas nuestras operaciones cuentan con cobertura civil y médica bajo estándares internacionales.', en: 'All our operations have civil and medical coverage under international standards.', pt: 'Todas as nossas operações contam com cobertura civil e médica sob padrões internacionais.' },
  dgacChile: { es: 'DGAC Chile', en: 'DGAC Chile', pt: 'DGAC Chile' },
  dgacDesc: { es: 'Operamos bajo la estricta certificación de la Dirección General de Aeronáutica Civil.', en: 'We operate under the strict certification of the General Directorate of Civil Aeronautics.', pt: 'Operamos sob a estrita certificação da Direção Geral de Aeronáutica Civil.' },
  moreQuestions: { es: '¿Aún tiene dudas operativas?', en: 'Still have operational questions?', pt: 'Ainda tem dúvidas operacionais?' },
  talkConcierge: { es: 'Hable con un profesional', en: 'Talk to a professional', pt: 'Fale com um profissional' },
  // Confirmation
  confTitle: { es: 'Experiencia Confirmada', en: 'Experience Confirmed', pt: 'Experiência Confirmada' },
  confSub: { es: 'Hemos enviado los detalles a', en: 'We have sent the details to', pt: 'Enviamos os detalhes para' },
  flightExp: { es: 'Detalle de la Experiencia', en: 'Experience Detail', pt: 'Detalhe da Experiência' },
  purchaseDate: { es: 'Fecha de Compra', en: 'Purchase Date', pt: 'Data de Compra' },
  orderNum: { es: 'Orden #', en: 'Order #', pt: 'Ordem #' },
  totalPaid: { es: 'Total Pagado', en: 'Total Paid', pt: 'Total Pago' },
  secureTrans: { es: 'Transacción Segura', en: 'Secure Transaction', pt: 'Transação Segura' },
  responsiblePax: { es: 'Pasajero Responsable', en: 'Responsible Passenger', pt: 'Passageiro Responsável' },
  paxCount: { es: 'Cantidad de Plazas', en: 'Number of Seats', pt: 'Quantidade de Lugares' },
  paymentMethod: { es: 'Método de Pago', en: 'Payment Method', pt: 'Método de Pagamento' },
  boardingNotice: { es: 'Presente este comprobante digital al momento del embarque', en: 'Present this digital voucher at the time of boarding', pt: 'Apresente este comprovante digital no momento do embarque' },
  printVoucher: { es: 'Imprimir Voucher', en: 'Print Voucher', pt: 'Imprimir Voucher' },
  share: { es: 'Compartir', en: 'Share', pt: 'Compartilhar' },
  linkCopied: { es: 'Enlace copiado al portapapeles', en: 'Link copied to clipboard', pt: 'Link copiado para a área de transferência' },
  backToHome: { es: 'Volver al Inicio', en: 'Back to Home', pt: 'Voltar ao Início' },
  // Experience Detail & Sidebar
  backToCatalog: { es: 'Volver al Catálogo', en: 'Back to Catalog', pt: 'Voltar ao Catálogo' },
  duration: { es: 'Duración', en: 'Duration', pt: 'Duração' },
  groupSize: { es: 'Tamaño del Grupo', en: 'Group Size', pt: 'Tamanho do Grupo' },
  safety: { es: 'Seguridad', en: 'Safety', pt: 'Segurança' },
  difficulty: { es: 'Dificultad', en: 'Difficulty', pt: 'Dificuldade' },
  certified: { es: 'Certificado', en: 'Certified', pt: 'Certificado' },
  moderate: { es: 'Moderado', en: 'Moderate', pt: 'Moderado' },
  missionDesc: { es: 'Descripción de la Misión', en: 'Mission Description', pt: 'Descrição da Missão' },
  aboutExp: { es: 'Sobre la Experiencia', en: 'About the Experience', pt: 'Sobre a Experiência' },
  missionIncluded: { es: 'Incluido en la Misión', en: 'Included in the Mission', pt: 'Incluído na Missão' },
  included: { es: 'Qué incluye', en: 'What\'s included', pt: 'O que inclui' },
  finalPrice: { es: 'Precio Final', en: 'Final Price', pt: 'Preço Final' },
  dailyDepartures: { es: 'Salidas Diarias', en: 'Daily Departures', pt: 'Saídas Diárias' },
  immediateAction: { es: 'Acción Inmediata', en: 'Immediate Action', pt: 'Ação Imediata' },
  bookNow: { es: 'Reservar Ahora', en: 'Book Now', pt: 'Reservar Agora' },
  securePayment: { es: 'Pago Seguro y Encriptado', en: 'Secure and Encrypted Payment', pt: 'Pagamento Seguro e Criptografado' },
  loadingDark: { es: 'Iniciando su Experiencia...', en: 'Starting your Experience...', pt: 'Iniciando sua Experiência...' },
  loadingLight: { es: 'Preparando su Experiencia...', en: 'Preparing your Experience...', pt: 'Preparando sua Experiência...' },
  syncCatalog: { es: 'Sincronizando Catálogo...', en: 'Synchronizing Catalog...', pt: 'Sincronizando Catálogo...' },
  notFound: { es: '404 - No Encontrado', en: '404 - Not Found', pt: '404 - Não Encontrado' },
  bilingualPilot: { es: 'Piloto bilingüe', en: 'Bilingual pilot', pt: 'Piloto bilíngue' },
  aeroInsurance: { es: 'Seguro aeronáutico', en: 'Aeronautical insurance', pt: 'Seguro aeronáutico' },
  vipAccess: { es: 'Acceso a sala VIP', en: 'VIP lounge access', pt: 'Acesso à sala VIP' },
  onboardCatering: { es: 'Catering a bordo', en: 'Onboard catering', pt: 'Catering a bordo' },
  tacticalPrep: { es: 'PREPARACIÓN TÁCTICA: TODOS LOS PASAJEROS DEBEN PRESENTARSE 30 MINUTOS ANTES DEL DESPEGUE PARA BRIEFING DE SEGURIDAD.', en: 'TACTICAL PREPARATION: ALL PASSENGERS MUST ARRIVE 30 MINUTES BEFORE TAKEOFF FOR SAFETY BRIEFING.', pt: 'PREPARAÇÃO TÁTICA: TODOS OS PASSAGEIROS DEVEM SE APRESENTAR 30 MINUTOS ANTES DA DECOLAGEM PARA O BRIEFING DE SEGURANÇA.' },
  conciergeTeam: { es: 'Nuestro equipo de concierge se encargará de todos los detalles desde su llegada al helipuerto hasta el aterrizaje final.', en: 'Our concierge team will take care of all the details from your arrival at the heliport until the final landing.', pt: 'Nossa equipe de concierge cuidará de todos os detalhes desde sua chegada ao heliporto até o pouso final.' },
  admin: { es: 'Admin', en: 'Admin', pt: 'Administrador' },
  logout: { es: 'Cerrar Sesión', en: 'Logout', pt: 'Sair' },
  exit: { es: 'SALIR', en: 'EXIT', pt: 'SAIR' },
  lightMode: { es: 'Modo Luz', en: 'Light Mode', pt: 'Modo Claro' },
  darkMode: { es: 'Modo Oscuro', en: 'Dark Mode', pt: 'Modo Escuro' },
  paymentResult: { es: 'Resultado del Pago', en: 'Payment Result', pt: 'Resultado do Pagamento' },
  paymentRejected: { es: 'El pago fue rechazado por Transbank', en: 'The payment was rejected by Transbank', pt: 'O pagamento foi rejeitado pelo Transbank' },
  paymentCode: { es: 'Código', en: 'Code', pt: 'Código' },
  paymentCancelByUser: { es: 'El pago fue anulado por el usuario.', en: 'The payment was cancelled by the user.', pt: 'O pagamento foi cancelado pelo usuário.' },
  paymentInvalidToken: { es: 'No se recibió un token de pago válido.', en: 'A valid payment token was not received.', pt: 'Não foi recebido um token de pagamento válido.' },
  paymentSuccessLostSession: { es: 'Pago exitoso pero se perdieron los datos de la sesión.', en: 'Successful payment but session data was lost.', pt: 'Pagamento bem-sucedido, mas os dados da sessão foram perdidos.' },
  paymentConnectionError: { es: 'Hubo un problema de conexión al validar tu pago.', en: 'There was a connection problem while validating your payment.', pt: 'Houve um problema de conexão ao validar seu pagamento.' },
  paymentTransactionError: { es: 'La transacción no pudo ser confirmada. Esto sucede si el pago fue anulado o si ya fue procesado.', en: 'The transaction could not be confirmed. This happens if the payment was cancelled or if it was already processed.', pt: 'A transação não pôde ser confirmada. Isso acontece se o pagamento foi cancelado ou se já foi processado.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('septos-lang');
    return (saved as Language) || 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('septos-lang', lang);
  };

  const t = (val: string) => {
    // Si el valor es una clave técnica en el objeto hardcoded de arriba
    if (translations[val]) {
      return translations[val][language];
    }

    // Lógica dinámica: intentamos parsear como JSON (datos de la DB)
    try {
      const obj = JSON.parse(val);
      return obj[language] || obj['es'] || val;
    } catch {
      // Si no es JSON y no está en translations, devolvemos el valor original (fallback)
      return val;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};