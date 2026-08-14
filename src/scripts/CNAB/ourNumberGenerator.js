// Réplica do cálculo de Nosso Número + DV feito em produção (grafeno-pagamentos):
// app/models/vortx/boleto.rb (banco 310) e app/models/bmp/boleto.rb (banco 274).
const BANK_RANGES = {
  '310': 90_000_000_000, // Vortx
  '274': 50_000_000_000, // BMP
};

const DEFAULT_BANK_CODE = '274';

const VORTX_WALLET = '21';
const VORTX_WEIGHTS = [2, 7, 6, 5, 4, 3];

const BMP_WALLET = '01';
const BMP_WEIGHTS = [2, 3, 4, 5, 6, 7];

const padBase = (baseNumber) => baseNumber.toString().padStart(11, '0');

const sumWeighted = (digits, weights) =>
  digits.reduce((total, digit, index) => total + Number(digit) * weights[index % weights.length], 0);

export const vortxCheckDigit = (baseNumber) => {
  const digits = `${VORTX_WALLET}${padBase(baseNumber)}`.split('');
  const remaining = sumWeighted(digits, VORTX_WEIGHTS) % 11;
  const dv = 11 - remaining;

  return dv > 9 ? '0' : String(dv);
};

export const bmpCheckDigit = (baseNumber) => {
  const digits = `${BMP_WALLET}${padBase(baseNumber)}`.split('').reverse();
  const remaining = sumWeighted(digits, BMP_WEIGHTS) % 11;

  if (remaining === 0) return '0';
  if (remaining === 1) return 'P';

  return String(11 - remaining);
};

const usedBasesFrom = (generatedLines) => new Set(
  generatedLines
    .filter((line) => line.type === 'registro1' && line.ourNumber)
    .map((line) => parseInt(line.ourNumber.toString().slice(0, 11), 10))
    .filter((base) => !Number.isNaN(base))
);

// Base aleatória (tempo + sorteio) mantém números diferentes entre execuções,
// e o dedup contra generatedLines evita colisão dentro do mesmo arquivo.
const generateUniqueBase = (range, usedBases) => {
  let base;

  do {
    base = (Date.now() * 1000 + Math.floor(Math.random() * 1000)) % range;
  } while (usedBases.has(base));

  return base;
};

// Sempre monta base (11 dígitos, zero à esquerda) + DV (1 caractere), no
// tamanho fixo de 12 do campo ourNumber — inclusive pro BMP, cujo código Ruby
// concatena o DV ao our_number "cru"; a validação em produção
// (valid_our_number_dv?) recalcula o DV a partir da forma paddeada de 11
// dígitos de qualquer forma, então o formato fixo aqui é compatível.
const generateOurNumber = ({ bankCode, generatedLines = [] }) => {
  const range = BANK_RANGES[bankCode] || BANK_RANGES[DEFAULT_BANK_CODE];
  const usedBases = usedBasesFrom(generatedLines);
  const base = generateUniqueBase(range, usedBases);
  const dv = bankCode === '310' ? vortxCheckDigit(base) : bmpCheckDigit(base);

  return `${padBase(base)}${dv}`;
};

export default generateOurNumber;
