import getLineFields from './lineFields';

// Identify line type based on the first character(s)
function identifyLineType(line) {
  if (!line || line.length === 0) {
    return null;
  }

  const firstChar = line.charAt(0);
  
  switch(firstChar) {
    case '0':
      return 'header';
    case '1':
      return 'registro1';
    case '2':
      return 'registro2';
    case '3':
      return 'registro3';
    case '7':
      return 'registro7';
    case '9':
      return 'trailer';
    default:
      return 'unknown';
  }
}

// Extract field value from line based on field definition
function extractFieldValue(line, field) {
  const { startIndex, endIndex } = field;
  
  // Extract the substring (indexes are 1-based, so convert to 0-based)
  const value = line.substring(startIndex - 1, endIndex);
  
  // Trim based on padding type for display
  if (field.paddingType === '0') {
    // For numeric fields with zero padding, show numeric value without leading zeros
    const numericValue = parseInt(value, 10);
    return {
      raw: value,
      display: isNaN(numericValue) ? value : numericValue.toString(),
      numeric: numericValue || 0
    };
  } else {
    // For text fields with space padding, trim spaces
    return {
      raw: value,
      display: value.trim(),
      numeric: null
    };
  }
}

// Parse a single CNAB line
function parseLine(line, lineNumber) {
  const lineType = identifyLineType(line);
  
  if (!lineType || lineType === 'unknown') {
    return {
      lineNumber,
      lineType: 'unknown',
      rawLine: line,
      fields: [],
      error: 'Tipo de linha não reconhecido'
    };
  }

  const fields = getLineFields(lineType);
  
  if (!fields) {
    return {
      lineNumber,
      lineType,
      rawLine: line,
      fields: [],
      error: 'Definição de campos não encontrada'
    };
  }

  const parsedFields = fields.map(field => {
    const value = extractFieldValue(line, field);
    
    return {
      name: field.name,
      description: field.description,
      startIndex: field.startIndex,
      endIndex: field.endIndex,
      length: field.maxLength,
      ...value
    };
  });

  return {
    lineNumber,
    lineType,
    rawLine: line,
    fields: parsedFields,
    error: null
  };
}

// Parse entire CNAB file content
function parseFile(fileContent) {
  const lines = fileContent.split('\n').filter(line => line.trim().length > 0);
  
  const parsedLines = lines.map((line, index) => parseLine(line, index + 1));
  
  // Group by line type for summary
  const summary = {
    totalLines: parsedLines.length,
    header: parsedLines.filter(l => l.lineType === 'header').length,
    registro1: parsedLines.filter(l => l.lineType === 'registro1').length,
    registro2: parsedLines.filter(l => l.lineType === 'registro2').length,
    registro3: parsedLines.filter(l => l.lineType === 'registro3').length,
    registro7: parsedLines.filter(l => l.lineType === 'registro7').length,
    trailer: parsedLines.filter(l => l.lineType === 'trailer').length,
    unknown: parsedLines.filter(l => l.lineType === 'unknown').length
  };
  
  return {
    lines: parsedLines,
    summary
  };
}

export { parseFile, parseLine, identifyLineType };
