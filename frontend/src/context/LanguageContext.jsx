import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        navbar: {
            home: 'Home',
            products: 'Products',
            cart: 'Cart',
            orders: 'Orders',
            login: 'Login',
            logout: 'Logout',
            dashboard: 'Dashboard',
            welcome: 'Welcome'
        },
        dashboard: {
            weather: 'Live Weather',
            crops: 'Crop Recommendation',
            loans: 'Loan Guide',
            addProduct: 'Add Product',
            viewOrders: 'View Orders'
        },
        home: {
            hero: 'Direct Farmer to Customer Marketplace',
            mission: 'Empowering farmers by cutting out the middlemen and providing fresh produce directly to your doorstep.',
            shopNow: 'Shop Now',
            farmerJoin: 'Join as Farmer'
        },
        common: {
            loading: 'Loading...',
            error: 'Something went wrong',
            submit: 'Submit',
            save: 'Save',
            cancel: 'Cancel',
            price: 'Price',
            quantity: 'Quantity',
            total: 'Total',
            status: 'Status'
        }
    },
    tm: {
        navbar: {
            home: 'முகப்பு',
            products: 'தயாரிப்புகள்',
            cart: 'கூடை',
            orders: 'ஆர்டர்கள்',
            login: 'உள்நுழை',
            logout: 'வெளியேறு',
            dashboard: 'டாஷ்போர்டு',
            welcome: 'நல்வரவு'
        },
        dashboard: {
            weather: 'வானிலை',
            crops: 'பயிர் பரிந்துரை',
            loans: 'கடன் உதவி',
            addProduct: 'பொருள் சேர்',
            viewOrders: 'ஆர்டர்கள்'
        },
        home: {
            hero: 'விவசாயி முதல் வாடிக்கையாளர் வரை நேரடி சந்தை',
            mission: 'இடைத்தரகர்களை நீக்கி, விவசாயிகளுக்கு அதிகாரம் அளித்து, புதிய விளைபொருட்களை நேரடியாக உங்கள் வீட்டு வாசலில் வழங்குகிறோம்.',
            shopNow: 'இப்போதே வாங்க',
            farmerJoin: 'விவசாயியாக இணையுங்கள்'
        },
        common: {
            loading: 'ஏற்றுகிறது...',
            error: 'ஏதோ தவறாகிவிட்டது',
            submit: 'சமர்ப்பிக்க',
            save: 'சேமி',
            cancel: 'ரத்து',
            price: 'விலை',
            quantity: 'துள்ளியம்', // Or 'அளவு'
            total: 'மொத்தம்',
            status: 'நிலை'
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const t = (path) => {
        const keys = path.split('.');
        let value = translations[language];
        for (const key of keys) {
            value = value?.[key];
        }
        return value || path;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
