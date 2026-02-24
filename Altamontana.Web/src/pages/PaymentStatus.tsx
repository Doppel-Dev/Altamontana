import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { commitWebpayTransaction } from '../services/api';
import LoadingScreen from '../components/LoadingScreen';
import { WebpayResponse } from '../types';
import { useLanguage } from '../context/LanguageContext';

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [error, setError] = useState<string | null>(null);
    const token = searchParams.get('token_ws');
    const tbkToken = searchParams.get('TBK_TOKEN'); 
    
    // Candado para evitar doble ejecución en React StrictMode
    const processingRef = useRef(false);

    useEffect(() => {
        const processPayment = async () => {
            // Si ya se procesó o se está procesando, no hacer nada
            if (processingRef.current) return;

            // Si viene TBK_TOKEN sin token_ws, es que el usuario anuló el pago
            if (tbkToken && !token) {
                setError(t('paymentCancelByUser'));
                return;
            }

            if (!token) {
                setError(t('paymentInvalidToken'));
                return;
            }

            try {
                processingRef.current = true;
                
                const res = await commitWebpayTransaction(token);
                const data = res.data as WebpayResponse;
                
                // Solo response_code === 0 es una transacción exitosa
                if (data.response_code === 0) {
                    const temp = localStorage.getItem('temp_booking');
                    if (temp) {
                        const { experience, booking } = JSON.parse(temp);
                        localStorage.removeItem('temp_booking');
                        
                        navigate('/confirmation', { 
                            state: { 
                                experience, 
                                booking, 
                                paymentData: data,
                                totalPrice: data.amount
                            },
                            replace: true 
                        });
                    } else {
                        // Si no hay datos temporales pero el pago fue exitoso
                        setError(t('paymentSuccessLostSession'));
                    }
                } else {
                    setError(`${t('paymentRejected')} (${t('paymentCode')}: ${data.response_code})`);
                }
            } catch (err: any) {
                console.error("Error en commitWebpayTransaction:", err);
                
                // Si el error es 400 y el código es -1, puede que ya se haya confirmado 
                // o que la transacción haya expirado/sido anulada
                const detail = err.response?.data?.detail;
                if (detail && detail.includes("-1")) {
                     setError(t('paymentTransactionError'));
                } else {
                     setError(t('paymentConnectionError'));
                }
            }
        };

        processPayment();
    }, [token, tbkToken, navigate, t]);

    if (error) {
        return (
            <div className="min-h-screen pt-40 flex flex-col items-center justify-center text-center bg-slate-50">
                <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-slate-100">
                    <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-black uppercase text-slate-900 mb-4 tracking-tighter italic">{t('paymentResult')}</h1>
                    <p className="text-slate-500 mb-8 font-medium leading-relaxed">{error}</p>
                    <button 
                        onClick={() => navigate('/experiences')} 
                        className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#004080] transition-shadow shadow-lg hover:shadow-xl active:scale-95 duration-200"
                    >
                        {t('backToCatalog')}
                    </button>
                </div>
            </div>
        );
    }

    return <LoadingScreen />;
};

export default PaymentStatus;