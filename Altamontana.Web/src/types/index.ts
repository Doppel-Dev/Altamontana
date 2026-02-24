export interface Experience {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    location: string;
    duration: string;
}

export interface Booking {
    id?: number;
    experienceId: number;
    customerName: string;
    customerEmail: string;
    bookingDate?: string;
    participants: number;
    totalPrice: number;
    status?: string;
}

export interface WebpayResponse {
    vci: string;
    amount: number;
    status: string;
    buy_order: string;
    session_id: string;
    card_detail: {
        card_number: string;
    };
    accounting_date: string;
    transaction_date: string;
    authorization_code: string;
    payment_type_code: string;
    response_code: number;
    installments_amount?: number;
    installments_number: number;
    balance?: number;
}
