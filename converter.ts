interface Currency {
    currencyPlural: string;
    currencySingular: string;
    centPlural: string;
    centSingular: string;
  }
  const currencyData : Currency= {
      currencyPlural:"DOLARES",
      currencySingular:"DOLAR",
      centPlural:"CENTAVOS",
      centSingular:"CENTAVO",
  }
  const numbersToWords = () => {
    // Código basado en el comentario de @sapienman
    // Código basado en https://gist.github.com/alfchee/e563340276f89b22042a
    const getUnits = (num: number) => {
      const unitTypes = {
        "1": "UN",
        "2": "DOS",
        "3": "TRES",
        "4": "CUATRO",
        "5": "CINCO",
        "6": "SEIS",
        "7": "SIETE",
        "8": "OCHO",
        "9": "NUEVE",
      };
      return unitTypes[num.toString() as keyof typeof unitTypes] || "";
    };
    const getTens = (num: number) => {
      const tens = Math.floor(num / 10);
      const units = num % 10;
  
      if (tens === 1) {
        const tenMultiples = {
          "0": "DIEZ",
          "1": "ONCE",
          "2": "DOCE",
          "3": "TRECE",
          "4": "CATORCE",
          "5": "QUINCE",
        };
        return tenMultiples[units.toString() as keyof typeof tenMultiples] || `DIECI${getUnits(units)}`;
      }
  
      if (tens === 2) {
        const twentyMultiples = {
          "0": "VEINTE",
          "1": "VEINTIUN",
        };
        return twentyMultiples[units.toString() as keyof typeof twentyMultiples] || `VEINTI${getUnits(units)}`;
      } else {
        const tensFromThreeToNine = {
          "3": "TREINTA",
          "4": "CUARENTA",
          "5": "CINCUENTA",
          "6": "SESENTA",
          "7": "SETENTA",
          "8": "OCHENTA",
          "9": "NOVENTA",
          "0": getUnits(units),
        };
  
        return `${tensFromThreeToNine[tens.toString() as keyof typeof tensFromThreeToNine]}${
          units && tens ? ` Y ${getUnits(units)}` : ""
        }`;
      }
    };
    const getHundreds = (num: number) => {
      const hundreds = Math.floor(num / 100);
      const tens = num % 100;
  
      const hundredMultiples = {
        "0": "CIENTO",
        "1": "CIEN",
        "2": "DOSCIENTOS",
        "3": "TRESCIENTOS",
        "4": "CUATROCIENTOS",
        "5": "QUINIENTOS",
        "6": "SEISCIENTOS",
        "7": "SETECIENTOS",
        "8": "OCHOCIENTOS",
        "9": "NOVECIENTOS",
      };
      if (hundreds === 1) {
          if (tens>0){  
              return `${hundredMultiples["0"]} ${getTens(tens)}`;
          } 
        return `${hundredMultiples["1"]}`;
      }if (!hundreds){
          return getTens(tens); 
      }
      return `${hundredMultiples[hundreds.toString() as keyof typeof hundredMultiples]} ${tens && getTens(tens)}`;
    };
  
    const getSection = (
      num: number,
      divisor: number,
      strSingular: string,
      strPlural: string
    ): string => {
      const quotient = Math.floor(num / divisor);
      const remainder = num  % divisor;
  
      let letters = "";
  
      if (quotient > 0) {
        if (quotient > 1) {
          letters = getHundreds(quotient) + " " + strPlural;
        } else {
          letters = strSingular;
        }
      }
  
      if (remainder > 0) {
        letters += "";
      }
  
      return letters;
    };
  
    const getThousands = (num: number): string => {
      const divisor = 1000;
      const remainder = num % divisor;
      const singular =  " UN MIL"
      const plural = " MIL"
    
      const strThousands = getSection(num, divisor, singular, plural);
      const strHundreds = getHundreds(remainder);
    
      if (!strThousands) {
        return strHundreds;
      }
    
      return `${strThousands}  ${strHundreds}`;
    }
  
    function getMillions(num: number): string {
      const divisor = 1000000;
      const remainder = num % divisor;
      const singular =  "UN MILLÓN"
      const plural = "MILLONES"
    
      const strMillions = getSection(num, divisor, singular, plural);
      const strThousands = getThousands(remainder);
    
      if (!strMillions) {
        return strThousands;
      }
      return `${strMillions} ${strThousands}`;
    }
    const numberToWordCurrency = (ammount:number, currency:Currency) => {
      const bucks= Math.floor(ammount)
      const cents = Math.round(ammount * 100) - Math.floor(ammount) * 100;
      const { currencyPlural, currencySingular, centPlural, centSingular } = currency
      
      const getCents = (cents:number) => {
          if (cents){
              return `CON ${getTens(cents)} ${cents=== 1 ? centSingular : centPlural}`;
          }
          return''
      }
      const getBucks = (bucks:number) => {
        if (bucks){
          return `${getMillions(bucks)} ${bucks > 1 ? currencyPlural : currencySingular} ${getCents(cents)}`;
        } 
        return `CERO ${currencyPlural} ${getCents(cents)}`  
      }
  
      return getBucks(bucks)
      
  }
    console.log([numberToWordCurrency(1, currencyData),
    numberToWordCurrency(245, currencyData),
    numberToWordCurrency(102, currencyData),
    numberToWordCurrency(13.6, currencyData),
    numberToWordCurrency(45.61, currencyData),
    numberToWordCurrency(20, currencyData),
    numberToWordCurrency(21, currencyData),
    numberToWordCurrency(24, currencyData),
    numberToWordCurrency(11, currencyData),
    numberToWordCurrency(12, currencyData),
    numberToWordCurrency(13, currencyData),
    numberToWordCurrency(14, currencyData),
    numberToWordCurrency(15, currencyData),
    numberToWordCurrency(16, currencyData),
    numberToWordCurrency(1317100, currencyData),
    numberToWordCurrency(4317100, currencyData),
    numberToWordCurrency(0, currencyData),
  
    ])
  };
  
  numbersToWords();
  