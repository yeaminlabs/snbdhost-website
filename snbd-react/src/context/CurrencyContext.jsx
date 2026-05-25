import { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('snbd_currency') || 'BDT';
  });

  const USD_RATE = 0.00813;

  useEffect(() => {
    localStorage.setItem('snbd_currency', currency);
  }, [currency]);

  // Formats a base BDT price (number or string) to the current currency
  const formatPrice = (bdtPrice, showCents = false) => {
    // Strip commas and parse float
    let numPrice;
    if (typeof bdtPrice === 'string') {
      numPrice = parseFloat(bdtPrice.replace(/,/g, ''));
    } else {
      numPrice = bdtPrice;
    }

    if (isNaN(numPrice)) return bdtPrice; // fallback for non-numbers

    if (currency === 'USD') {
      const usdValue = numPrice * USD_RATE;
      return '$' + usdValue.toLocaleString('en-US', {
        minimumFractionDigits: showCents ? 2 : 2,
        maximumFractionDigits: 2
      });
    }

    return '৳' + numPrice.toLocaleString('en-US');
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
