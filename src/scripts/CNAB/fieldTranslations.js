// Opções de campos codificados do layout Grafeno (banco 274).
// Portadas de: grafeno-pagamentos/lib/cnab/remessa/templates/layout_400/grafeno-translations.yml
// Formato: { value, label } — label = "<código> - <descrição>".

const EMPTY_OPTION = { value: '', label: '— não informar —' };

// codigo_ocorrencia (campo identificacaoOcorrencia)
export const OCORRENCIA_OPTIONS = [
  EMPTY_OPTION,
  { value: '01', label: '01 - Remessa' },
  { value: '02', label: '02 - Pedido de baixa' },
  { value: '03', label: '03 - Pedido de Protesto Falimentar' },
  { value: '04', label: '04 - Concessão de abatimento' },
  { value: '05', label: '05 - Cancelamento de abatimento concedido' },
  { value: '06', label: '06 - Alteração de vencimento' },
  { value: '07', label: '07 - Alteração do controle do participante' },
  { value: '08', label: '08 - Alteração de seu número' },
  { value: '09', label: '09 - Pedido de protesto' },
  { value: '18', label: '18 - Sustar protesto e baixar Título' },
  { value: '19', label: '19 - Sustar protesto e manter em carteira' },
  { value: '20', label: '20 - Alteração de valor' },
  { value: '21', label: '21 - Alteração de valor com emissão de Boleto (quando a emissão é pelo Banco)' },
  { value: '22', label: '22 - Transferência Cessão crédito ID. Prod.10' },
  { value: '23', label: '23 - Transferência entre Carteiras' },
  { value: '24', label: '24 - Dev. Transferência entre Carteiras' },
  { value: '31', label: '31 - Alteração de outros dados' },
  { value: '33', label: '33 - Devolução Grafeno Titularidades' },
  { value: '45', label: '45 - Pedido de Negativação' },
  { value: '46', label: '46 - Excluir Negativação com baixa' },
  { value: '47', label: '47 - Excluir negativação e manter pendente' },
  { value: '68', label: '68 - Acerto nos dados do rateio de Crédito' },
  { value: '69', label: '69 - Cancelamento do rateio de crédito (uso futuro)' },
];

// informacao_multa (campo informacaoMulta)
export const INFORMACAO_MULTA_OPTIONS = [
  { value: '0', label: '0 - Sem multa' },
  { value: '2', label: '2 - Multa em percentual' },
];
