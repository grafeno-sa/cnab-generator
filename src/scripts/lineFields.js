import generateCleanCNPJ from './generateCleanCNPJ';
import generateFormattedDate from './dateGenerator';

const getLineFields = (type) => {
  const fields = {
    header: HEADER_FIELDS,
    registro1: REGISTRO1_FIELDS,
    registro2: REGISTRO2_FIELDS,
    registro3: REGISTRO3_FIELDS,
    registro7: REGISTRO7_FIELDS,
    trailer: TRAILER_FIELDS
  }

  return fields[type];
};

const TRAILER_FIELDS = [
  {
    name: 'serialNumber',
    description: 'Número sequencial',
    startIndex: 439,
    endIndex: 444,
    defaultValue: ({ type, generatedLines }) => generatedLines.length + 2,
    maxLength: 6,
    paddingType: '0'
  }
]

const HEADER_FIELDS = [
  {
    name: "fundDocument",
    description: "CNPJ do fundo",
    startIndex: 27,
    endIndex: 46,
    defaultValue: _ => "02968340000489",
    maxLength: 20,
    paddingType: '0',
  },
  {
    name: "bankNumber",
    description: "Número do banco",
    startIndex: 77,
    endIndex: 79,
    defaultValue: _ => "274",
    maxLength: 3,
    paddingType: '0',
  },
  {
    name: 'serialNumber',
    description: 'Número sequencial',
    startIndex: 439,
    endIndex: 444,
    defaultValue: () => 1,
    maxLength: 6,
    paddingType: '0'
  }
];

const REGISTRO1_FIELDS = [
  {
    name: 'codigoCarteira',
    description: 'Código Carteira',
    startIndex: 22,
    endIndex: 24,
    defaultValue: _ => '001',
    maxLength: 3,
    paddingType: '0'
  },
  {
    name: 'agenciaBeneficiario',
    description: 'Agência Beneficiário',
    startIndex: 25,
    endIndex: 29,
    defaultValue: _ => '00001',
    maxLength: 5,
    paddingType: '0'
  },
  {
    name: 'contaBeneficiario',
    description: 'Conta Corrente Beneficiário',
    startIndex: 30,
    endIndex: 37,
    defaultValue: _ => '12345671',
    maxLength: 8,
    paddingType: '0'
  },
  {
    name: "ourNumber",
    description: "Nosso Número do Título",
    startIndex: 71,
    endIndex: 82,    
    defaultValue: () => '',
    maxLength: 12,
    paddingType: '0'
  },
  {
    name: "identificacaoOcorrencia",
    description: "Ocorrência",
    startIndex: 109,
    endIndex: 110,
    defaultValue: _ => "01",
    maxLength: 2,
    paddingType: '0',
  },
  {
    name: "dataVencimento",
    description: "Data de vencimento - dd/mm/yyy",
    startIndex: 121,
    endIndex: 126,
    defaultValue: _ => generateFormattedDate(true),
    maxLength: 6,
    paddingType: ' ',
  },
  {
    name: "valorTitulo",
    description: "Valor Título",
    startIndex: 127,
    endIndex: 139,
    defaultValue: _ => {
      const min = 10
      const max = 100000
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    maxLength: 13,
    paddingType: ' ',
  },
  {
    name: "documentoSacado",                                                                                                   
    description: "CPF/CNPJ do sacado",
    startIndex: 221,
    endIndex: 234,
    defaultValue: _ => generateCleanCNPJ(),
    maxLength: 14,
    paddingType: '0'
  },
  {
    name: "documentoSacadorAvalista",
    description: "Documento Sacador Avalista",
    startIndex: 335,
    endIndex: 349,
    defaultValue: _ => `0${generateCleanCNPJ()}`,
    maxLength: 15,
    paddingType: '0'
  },
  {
    name: "nomeSacadorAvalista",
    description: "Nome Sacador Avalista",
    startIndex: 350,
    endIndex: 394,
    defaultValue: _ => 'Nome Sacador Avalista Genérico',
    maxLength: 45,
    paddingType: ' ',
  },
  {
    name: 'serialNumber',
    description: 'Número sequencial',
    startIndex: 439,
    endIndex: 444,
    defaultValue: ({ type, generatedLines }) => generatedLines.length + 2,
    maxLength: 6,
    paddingType: '0'
  }
];

const REGISTRO2_FIELDS =[
  {
    name: 'mensagem1',
    description: 'Mensagem 1',
    startIndex: 2,
    endIndex: 81,
    defaultValue: _ => 'pagador@email.com',
    maxLength: 80,
    paddingType: ' '
  },
  {
    name: 'mensagem2',
    description: 'Mensagem 2',
    startIndex: 82,
    endIndex: 161,
    defaultValue: _ => '',
    maxLength: 80,
    paddingType: ' '
  },
  {
    name: 'mensagem3',
    description: 'Mensagem 3',
    startIndex: 162,
    endIndex: 241,
    defaultValue: _ => '',
    maxLength: 80,
    paddingType: ' '
  },
  {
    name: 'mensagem4',
    description: 'Mensagem 4',
    startIndex: 242,
    endIndex: 321,
    defaultValue: _ => '',
    maxLength: 80,
    paddingType: ' '
  },
  {
    name: 'limiteDesconto2',
    description: 'Limite Desconto 2',
    startIndex: 322,
    endIndex: 327,
    defaultValue: _ => '',
    maxLength: 6,
    paddingType: ' '
  },
  {
    name: 'valorDesconto2',
    description: 'Valor Desconto 2',
    startIndex: 328,
    endIndex: 340,
    defaultValue: _ => '',
    maxLength: 13,
    paddingType: '0'
  },
  {
    name: 'limiteDesconto3',
    description: 'Limite Desconto 3',
    startIndex: 341,
    endIndex: 346,
    defaultValue: _ => '',
    maxLength: 6,
    paddingType: ' '
  },
  {
    name: 'valorDesconto3',
    description: 'Valor Desconto 3',
    startIndex: 347,
    endIndex: 359,
    defaultValue: _ => '',
    maxLength: 13,
    paddingType: '0'
  },
  {
    name: 'serialNumber',
    description: 'Número sequencial',
    startIndex: 439,
    endIndex: 444,
    defaultValue: ({ type, generatedLines }) => generatedLines.length + 2,
    maxLength: 6,
    paddingType: '0'
  }
]

const REGISTRO3_FIELDS = [
  {
    name: "beneficiaryIdentification",
    description: "Id. da empresa beneficiária no banco",
    startIndex: 2,
    endIndex: 17,
    defaultValue: _ => "00900001825346",
    maxLength: 16,
    paddingType: '0',
  },
  {
    name: "ourNumber",
    description: "Nosso Número do Título",
    startIndex: 18,
    endIndex: 29,
    defaultValue: ({ generatedLines }) => {
      const registro1Lines = generatedLines.filter(line => line.type === 'registro1');
      const lastIndex = registro1Lines.length - 1;
      return registro1Lines[lastIndex].ourNumber
    },
    maxLength: 12,
    paddingType: '0',
  },
  {
    name: "firstReceiverBankCode",
    description: "Codigo do Banco do Primeiro Recebedor",
    startIndex: 44,
    endIndex: 46,
    defaultValue: _ => "274",
    maxLength: 3,
    paddingType: '0'
  },
  {
    name: "Account1",
    description: "Conta corrente #1 com dígito",
    startIndex: 53,
    endIndex: 65,
    defaultValue: _ => "016391732",
    maxLength: 13,
    paddingType: '0'
  },
  {
    name: "percentageSplit1",
    description: "Percentual split 1",
    startIndex: 66,
    endIndex: 80,
    defaultValue: _ => '5',
    maxLength: 15,
    paddingType: '0'
  },
  {
    name: "clientName1",
    description: "Razao social do recebedor 1",
    startIndex: 81,
    endIndex: 120,
    defaultValue: _ => 'EMPRESA DE ARTIGOS MAGICOS',
    maxLength: 40,
    paddingType: ' ',
  },
  {
    name: "secondReceiverBankCode",
    description: "Codigo do Banco do Segundo Recebedor",
    startIndex: 161,
    endIndex: 163,
    defaultValue: _ => "274",
    maxLength: 3,
    paddingType: '0'
  },
  {
    name: "Account2",
    description: "Conta corrente #2 com dígito",
    startIndex: 170,
    endIndex: 182,
    defaultValue: _ => "081875825",
    maxLength: 13,
    paddingType: '0',
  },
  {
    name: "percentageSplit2",
    description: "Percentual split 2",
    startIndex: 183,
    endIndex: 197,
    defaultValue: _ => '5',
    maxLength: 15,
    paddingType: '0'
  },
  {
    name: "clientName2",
    description: "Razao social do recebedor 2",
    startIndex: 198,
    endIndex: 237,
    defaultValue: _ => 'EMPRESA DE ARTIGOS MALUCOS',
    maxLength: 40,
    paddingType: ' ',
  },
  {
    name: "thirdReceiverBankCode",
    description: "Codigo do Banco do Terceiro Recebedor",
    startIndex: 278,
    endIndex: 280,
    defaultValue: _ => "274",
    maxLength: 3,
    paddingType: ' ',
  },
  {
    name: "Account3",
    description: "Conta corrente #3 com dígito",
    startIndex: 287,
    endIndex: 299,
    defaultValue: _ => "081438079",
    maxLength: 13,
    paddingType: '0',
  },
  {
    name: "percentageSplit3",
    description: "Percentual split 3",
    startIndex: 300,
    endIndex: 314,
    defaultValue: _ => '5',
    maxLength: 15,
    paddingType: '0',
  },
  {
    name: "clientName3",
    description: "Razao social do recebedor 3",
    startIndex: 315,
    endIndex: 354,
    defaultValue: _ => 'EMPRESA DE ARTIGOS ENFERRUJADOS',
    maxLength: 40,
    paddingType: ' ',
  },
  {
    name: 'serialNumber',
    description: 'Número sequencial',
    startIndex: 439,
    endIndex: 444,
    defaultValue: ({ generatedLines }) => generatedLines.length + 2,
    maxLength: 6,
    paddingType: '0'
  }
];

const REGISTRO7_FIELDS = [
  {
    name: "endereco",
    description: "Endereço Sacador Avalista",
    startIndex: 2,
    endIndex: 46,
    defaultValue: _ => "Rua Alguma Coisa",
    maxLength: 45,
    paddingType: ' ',
  },
  {
    name: "cep",
    description: "CEP",
    startIndex: 47,
    endIndex: 51,
    defaultValue: _ => "13905",
    maxLength: 5,
    paddingType: ' ',
  },
  {
    name: "sufixoCep",
    description: "Sufixo CEP",
    startIndex: 52,
    endIndex: 54,
    defaultValue: _ => "000",
    maxLength: 3,
    paddingType: ' ',
  },
  {
    name: "cidade",
    description: "Cidade",
    startIndex: 55,
    endIndex: 74,
    defaultValue: _ => "Bauru",
    maxLength: 20,
    paddingType: ' ',
  },
  {
    name: "estado",
    description: "UF",
    startIndex: 75,
    endIndex: 76,
    defaultValue: _ => "SP",
    maxLength: 2,
    paddingType: ' ',
  },
  {
    name: "bairro",
    description: "Bairro",
    startIndex: 77,
    endIndex: 107,
    defaultValue: _ => "Algum bairro",
    maxLength: 31,
    paddingType: ' ',
  },
  {
    name: "complemento",
    description: "Complemento",
    startIndex: 108,
    endIndex: 138,
    defaultValue: _ => "Algum complemento",
    maxLength: 31,
    paddingType: ' ',
  },
  {
    name: 'serialNumber',
    description: 'Número sequencial',
    startIndex: 439,
    endIndex: 444,
    defaultValue: ({ generatedLines }) => generatedLines.length + 2,
    maxLength: 6,
    paddingType: '0'
  }
];

export default getLineFields;