import { generate as generateCNPJ } from 'cnpj';

const generateCleanCNPJ = () => {
  return generateCNPJ().replace(/[^\w\s]/gi, '')
}

export default generateCleanCNPJ