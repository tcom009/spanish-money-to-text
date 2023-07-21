const moneyToSpanishWords= require('./converter')

const currencyData = {
    currencyPlural: "DOLARES",
    currencySingular: "DOLAR",
    centPlural: "CENTAVOS",
    centSingular: "CENTAVO",
  };
  console.log([
    moneyToSpanishWords(1, currencyData),
    moneyToSpanishWords(245, currencyData),
    moneyToSpanishWords(102, currencyData),
    moneyToSpanishWords(13.6, currencyData),
    moneyToSpanishWords(45.61, currencyData),
    moneyToSpanishWords(20, currencyData),
    moneyToSpanishWords(21, currencyData),
    moneyToSpanishWords(24, currencyData),
    moneyToSpanishWords(11, currencyData),
    moneyToSpanishWords(12, currencyData),
    moneyToSpanishWords(13, currencyData),
    moneyToSpanishWords(14, currencyData),
    moneyToSpanishWords(15, currencyData),
    moneyToSpanishWords(16, currencyData),
    moneyToSpanishWords(1317100, currencyData),
    moneyToSpanishWords(4317100, currencyData),
  ]);