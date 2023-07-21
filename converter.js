// Código basado en el comentario de @sapienman
// Código basado en https://gist.github.com/alfchee/e563340276f89b22042a
const getUnits = (num) => {
  const unitTypes = {
    1: "UN",
    2: "DOS",
    3: "TRES",
    4: "CUATRO",
    5: "CINCO",
    6: "SEIS",
    7: "SIETE",
    8: "OCHO",
    9: "NUEVE",
  };
  return unitTypes[num.toString()] || "";
};
const getTens = (num) => {
  const tens = Math.floor(num / 10);
  const units = num % 10;

  if (tens === 1) {
    const tenMultiples = {
      0: "DIEZ",
      1: "ONCE",
      2: "DOCE",
      3: "TRECE",
      4: "CATORCE",
      5: "QUINCE",
    };
    return tenMultiples[units.toString()] || `DIECI${getUnits(units)}`;
  }

  if (tens === 2) {
    const twentyMultiples = {
      0: "VEINTE",
      1: "VEINTIUN",
    };
    return twentyMultiples[units.toString()] || `VEINTI${getUnits(units)}`;
  } else {
    const tensFromThreeToNine = {
      3: "TREINTA",
      4: "CUARENTA",
      5: "CINCUENTA",
      6: "SESENTA",
      7: "SETENTA",
      8: "OCHENTA",
      9: "NOVENTA",
      0: getUnits(units),
    };

    return `${tensFromThreeToNine[tens.toString()]}${
      units && tens ? ` Y ${getUnits(units)}` : ""
    }`;
  }
};
const getHundreds = (num) => {
  const hundreds = Math.floor(num / 100);
  const tens = num % 100;

  const hundredMultiples = {
    0: "CIENTO",
    1: "CIEN",
    2: "DOSCIENTOS",
    3: "TRESCIENTOS",
    4: "CUATROCIENTOS",
    5: "QUINIENTOS",
    6: "SEISCIENTOS",
    7: "SETECIENTOS",
    8: "OCHOCIENTOS",
    9: "NOVECIENTOS",
  };
  if (hundreds === 1) {
    if (tens > 0) {
      return `${hundredMultiples["0"]} ${getTens(tens)}`;
    }
    return `${hundredMultiples["1"]}`;
  }
  if (!hundreds) {
    return getTens(tens);
  }
  return `${hundredMultiples[hundreds.toString()]} ${tens && getTens(tens)}`;
};

const getSection = (num, divisor, strSingular, strPlural) => {
  const quotient = Math.floor(num / divisor);
  const remainder = num % divisor;

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

const getThousands = (num) => {
  const divisor = 1000;
  const remainder = num % divisor;
  const singular = " UN MIL";
  const plural = " MIL";

  const strThousands = getSection(num, divisor, singular, plural);
  const strHundreds = getHundreds(remainder);

  if (!strThousands) {
    return strHundreds;
  }

  return `${strThousands}  ${strHundreds}`;
};

function getMillions(num) {
  const divisor = 1000000;
  const remainder = num % divisor;
  const singular = "UN MILLÓN";
  const plural = "MILLONES";

  const strMillions = getSection(num, divisor, singular, plural);
  const strThousands = getThousands(remainder);

  if (!strMillions) {
    return strThousands;
  }
  return `${strMillions} ${strThousands}`;
}

const moneyToSpanishWords = (ammount, currency) => {
    const bucks = Math.floor(ammount);
    const cents = Math.round(ammount * 100) - Math.floor(ammount) * 100;
    const { currencyPlural, currencySingular, centPlural, centSingular } =
      currency;

    const getCents = (cents) => {
      if (cents) {
        return `CON ${getTens(cents)} ${
          cents === 1 ? centSingular : centPlural
        }`;
      }
      return "";
    };
    const getBucks = (bucks) => {
      if (bucks) {
        return `${getMillions(bucks)} ${
          bucks > 1 ? currencyPlural : currencySingular
        } ${getCents(cents)}`;
      }
      return `CERO ${currencyPlural} ${getCents(cents)}`;
    };
    if (currency && ammount){
      return getBucks(bucks);
    }
};
module.exports = moneyToSpanishWords;


