// CNAB Deconstructor Constants

// Line Type Labels
export const LINE_TYPE_LABELS = {
  header: 'Header',
  registro1: 'Registro 1 (Transação)',
  registro2: 'Registro 2 (Mensagens)',
  registro3: 'Registro 3 (Split)',
  registro7: 'Registro 7 (Endereço)',
  trailer: 'Trailer',
  unknown: 'Desconhecido'
};

// Accepted File Extensions
export const ACCEPTED_FILE_EXTENSIONS = ['txt', 'rem', 'ret'];

// UI Text
export const UI_TEXT = {
  pageTitle: 'Desconstrutor CNAB 400/444',
  pageSubtitle: 'Faça upload de um arquivo .txt, .rem ou .ret para visualizar todos os campos detalhados',
  buttonText: 'Selecionar Arquivo CNAB',
  buttonTextWithFile: 'Carregar Outro Arquivo',
  emptyStateMessage: 'Nenhum arquivo carregado. Selecione um arquivo CNAB para começar.',
  summaryTitle: 'Resumo do Arquivo',
  detailsTitle: 'Linhas Detalhadas',
  totalLinesLabel: 'Total de Linhas:',
  headerLabel: 'Header:',
  trailerLabel: 'Trailer:',
  registro1Label: 'Registro 1:',
  registro2Label: 'Registro 2:',
  registro3Label: 'Registro 3:',
  registro7Label: 'Registro 7:',
  unknownLinesLabel: '⚠️ Linhas Não Reconhecidas:',
  lineLabel: 'Linha',
  errorLabel: 'Erro:',
  completeLineLabel: 'Linha Completa',
  charactersLabel: 'caracteres',
  extractedFieldsLabel: 'Campos Extraídos:',
  fieldColumnLabel: 'Campo',
  descriptionColumnLabel: 'Descrição',
  positionColumnLabel: 'Posição',
  valueColumnLabel: 'Valor',
  emptyValueLabel: '(vazio)',
  rawValuePrefix: '(raw: "'
};

// Toast Messages
export const TOAST_MESSAGES = {
  fileLoaded: {
    icon: 'success',
    title: 'Arquivo carregado!',
    getText: (lineCount) => `${lineCount} linha(s) processada(s)`
  }
};
