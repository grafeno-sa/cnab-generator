import generateCleanCNPJ from '../generateCleanCNPJ';
import generateFormattedDate from '../dateGenerator';

const CSV_LINE_FIELDS = [
  {
    name: 'nome',
    description: 'Nome pagador',
    defaultValue: () => 'Pagador Aleatório',
    category: 'payer',
  },
  {
    name: 'numero_documento',
    description: 'Documento Pagador',
    defaultValue: () =>  generateCleanCNPJ(),
    category: 'payer',
  },
  {
    name: 'email',
    description: 'Email Pagador',
    defaultValue: () => { 'email@email.com' },
    category: 'payer',
  },
  {
    name: 'valor',
    description: 'Valor Título',
    defaultValue: () => {
      const min = 10
      const max = 100000
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    category: 'asset',
  },
  {
    name: 'vencimento',
    description: 'Vencimento do Título',
    defaultValue: () => generateFormattedDate({ future: true, separator: '/', fullYear: true }),
    category: 'asset',
  },
  {
    name: 'observacao',
    description: 'Observação',
    defaultValue: () => '',
    category: 'asset',
  },
  {
    name: 'seu_numero',
    description: 'Seu Número',
    defaultValue: () => '',
    category: 'asset',
  },
  {
    name: 'descricao',
    description: 'Descrição',
    defaultValue: () => '',
    category: 'asset',
  },
  {
    name: 'juros_por_mes',
    description: 'Juros por Mês',
    defaultValue: () => '',
    category: 'asset',
  },
  {
    name: 'multa',
    description: 'Multa',
    defaultValue: () => '',
    category: 'asset',
  },
  { name: 'dias_baixar_boleto_apos_vencimento',
    description: 'Dias para baixa após vencimento',
    defaultValue: () => '90',
    category: 'asset',
  },
  {
    name: 'desconto',
    description: 'Desconto 1',
    defaultValue: () => '',
    category: 'asset',
  },
  { 
    name: 'desconto_ate',
    description: 'Limite desconto 1',
    defaultValue: () => '',
    category: 'asset',
  },
  {
    name: 'valor_de_abatimento',
    description: 'Valor de Abatimento R$',
    defaultValue: () => '',
    category: 'asset',
  },
  { 
    name: 'abatimento',
    description: 'Abatimento %',
    defaultValue: () => '',
    category: 'asset',
  },
  { 
    name: 'natureza',
    description: 'Natureza do Título',
    defaultValue: () => '',
    category: 'asset',
  },
  {
    name: 'cedente',
    description: 'Nome Sacador Avalista',
    defaultValue: () => '',
    category: 'grantor',
  },
  {
    name: 'cedente_numero_inscricao',
    description: 'Documento Sacador Avalista',
    defaultValue: () => '',
    category: 'grantor',
  },
  {
    name: 'pagador_telefone',
    description: 'Tefeone Pagador',
    defaultValue: () => '19997999989',
    category: 'payer',
  },
  {
    name: 'endereco_cep',
    description: 'CEP Pagador',
    defaultValue: () => '59073-000',
    category: 'payer',
  },
  {
    name: 'endereco_logradouro',
    description: 'Logradouro Pagador',
    defaultValue: () => 'Rua das Alegrias',
    category: 'payer',
  },
  {
    name: 'endereco_numero',
    description: 'Número Endereço Pagador',
    defaultValue: () => '10',
    category: 'payer',
  },
  {
    name: 'endereco_complemento',
    description: 'Complemento Endereço Pagador',
    defaultValue: () => '',
    category: 'payer',
  },
  {
    name: 'endereco_bairro',
    description: 'Bairro Pagador',
    defaultValue: () => 'Centro',
    category: 'payer',
  },
  {
    name: 'endereco_municipio',
    description: 'Município Pagador',
    defaultValue: () => 'São Paulo',
    category: 'payer',
  },
  {
    name: 'endereco_uf',
    description: 'UF Pagador',
    defaultValue: () => 'SP',
    category: 'payer',
  },
  {
    name: 'desconto_ate_2',
    description: 'Limite desconto 2',
    defaultValue: () => '',
    category: 'asset',
  },
  {
    name: 'desconto_2',
    description: 'Desconto 2',
    defaultValue: () => '',
    category: 'asset',
  },
  {
    name: 'desconto_ate_3',
    description: 'Limite desconto 3',
    defaultValue: () => '',
    category: 'asset',
  },
  {
    name: 'desconto_3',
    description: 'Desconto 3',
    defaultValue: () => '',
    category: 'asset',
  },
]

export default CSV_LINE_FIELDS;