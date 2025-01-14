import generateCleanCNPJ from '../generateCleanCNPJ';
import generateFormattedDate from '../dateGenerator';

const CSV_LINE_FIELDS = [
  {
    name: 'nome',
    description: 'Nome pagador',
    defaultValue: () => 'Pagador Aleatório',
  },
  {
    name: 'numero_documento',
    description: 'Documento Pagador',
    defaultValue: () => { generateCleanCNPJ();},
  },
  {
    name: 'email',
    description: 'Email Pagador',
    defaultValue: () => { 'email@email.com' },
  },
  {
    name: 'valor',
    description: 'Valor Título',
    defaultValue: () => {
      const min = 10
      const max = 100000
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
  },
  {
    name: 'vencimento',
    description: 'Vencimento do Título',
    defaultValue: () => { generateFormattedDate({ future: true, separator: '/' }) },
  },
  {
    name: 'observacao',
    description: 'Observação',
    defaultValue: () => '',
  },
  {
    name: 'seu_numero',
    description: 'Seu Número',
    defaultValue: () => '',
  },
  {
    name: 'descricao',
    description: 'Descrição',
    defaultValue: () => '',
  },
  {
    name: 'juros_por_mes',
    description: 'Juros por Mês',
    defaultValue: () => '',
  },
  {
    name: 'multa',
    description: 'Multa',
    defaultValue: () => '',
  },
  { name: 'dias_baixar_boleto_apos_vencimento',
    description: 'Dias para baixa após vencimento',
    defaultValue: () => '90',
  },
  {
    name: 'desconto',
    description: 'Desconto 1',
    defaultValue: () => '',
  },
  { 
    name: 'desconto_ate',
    description: 'Limite desconto 1',
    defaultValue: () => '',
  },
  {
    name: 'valor_de_abatimento',
    description: 'Valor de Abatimento R$',
    defaultValue: () => '',
  },
  { 
    name: 'abatimento',
    description: 'Abatimento %',
    defaultValue: () => '',
  },
  { 
    name: 'natureza',
    description: 'Natureza do Título',
    defaultValue: () => '',
  },
  {
    name: 'cedente',
    description: 'Nome Sacador Avalista',
    defaultValue: () => '',
  },
  {
    name: 'cedente_numero_inscricao',
    description: 'Documento Sacador Avalista',
    defaultValue: () => '',
  },
  {
    name: 'pagador_telefone',
    description: 'Tefeone Pagador',
    defaultValue: () => '19997999989',
  },
  {
    name: 'endereco_cep',
    description: 'CEP Pagador',
    defaultValue: () => '59073-000',
  },
  {
    name: 'endereco_logradouro',
    description: 'Logradouro Pagador',
    defaultValue: () => 'Rua das Alegrias',
  },
  {
    name: 'endereco_numero',
    description: 'Número Endereço Pagador',
    defaultValue: () => '10',
  },
  {
    name: 'endereco_complemento',
    description: 'Complemento Endereço Pagador',
    defaultValue: () => '',
  },
  {
    name: 'endereco_bairro',
    description: 'Bairro Pagador',
    defaultValue: () => 'Centro',
  },
  {
    name: 'endereco_municipio',
    description: 'Município Pagador',
    defaultValue: () => 'São Paulo',
  },
  {
    name: 'endereco_uf',
    description: 'UF Pagador',
    defaultValue: () => 'SP',
  },
  {
    name: 'desconto_ate_2',
    description: 'Limite desconto 2',
    defaultValue: () => '',
  },
  {
    name: 'desconto_2',
    description: 'Desconto 2',
    defaultValue: () => '',
  },
  {
    name: 'desconto_ate_3',
    description: 'Limite desconto 3',
    defaultValue: () => '',
  },
  {
    name: 'desconto_3',
    description: 'Desconto 3',
    defaultValue: () => '',
  },
]

export default CSV_LINE_FIELDS;