const module11 = ({ ourNumber, wallet }) => {
  const number = `${wallet}${ourNumber}`.split('').reverse();
  const weights = Array(6).fill(2).map((x, i) => x + i)
  let i = 0;
  let total = 0;

  for (const weight in weights) {
    total += weight * Number.parseInt(number[i]);
    i += 1;
    if (number.size == (i - 1)) break;
  };

  return total;
}

export default module11;