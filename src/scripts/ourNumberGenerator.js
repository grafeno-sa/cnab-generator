import module11 from "./module11Helper";

const ourNumberWithDigit = ({ wallet, ourNumber }) => {
  const isInvalid = (number) => {
    return [undefined, null, 0, '', ' ', '0'].includes(number)
  }

  if (isInvalid(ourNumber)) return '';
  if (isInvalid(wallet)) return '';

  const total = module11({ ourNumber, wallet });
  const remaining = total % 11;
  let digit;
  
  switch(remaining) {
    case 0:
      digit = 0;
      break;
    case 1:
      digit = 'P';
      break;
    default:
      digit = 11 - remaining;
  }

  return `${ourNumber}${digit}`;
};

export default ourNumberWithDigit;