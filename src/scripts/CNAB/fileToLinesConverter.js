import { parseFile } from './cnabParser';
import getLineFields from './lineFields';

/**
 * Extracts field value from raw line based on field definition
 */
function extractFieldValueFromRaw(rawLine, field) {
  const { startIndex, endIndex } = field;
  // Indexes are 1-based, convert to 0-based for substring
  const value = rawLine.substring(startIndex - 1, endIndex);
  
  // Remove padding based on type
  if (field.paddingType === '0') {
    // Remove leading zeros for numeric fields, but keep if value is all zeros
    const trimmed = value.replace(/^0+/, '');
    return trimmed === '' ? '0' : trimmed;
  } else {
    // Remove trailing spaces for text fields
    return value.trimEnd();
  }
}

/**
 * Converts a parsed CNAB line to the internal line format
 */
function convertParsedLineToInternal(parsedLine, lineIndex) {
  const { lineType, rawLine } = parsedLine;
  
  // Skip unknown or invalid lines
  if (!lineType || lineType === 'unknown') {
    return null;
  }
  
  const fields = getLineFields(lineType);
  
  if (!fields) {
    return null;
  }
  
  // Build the internal line object
  const internalLine = {
    type: lineType,
    index: lineIndex
  };
  
  // Extract each field value from the raw line
  fields.forEach(field => {
    const value = extractFieldValueFromRaw(rawLine, field);
    internalLine[field.name] = value;
  });
  
  return internalLine;
}

/**
 * Converts a CNAB file content to internal lines format
 * @param {string} fileContent - Raw CNAB file content
 * @returns {Array} Array of internal line objects
 */
function convertFileToLines(fileContent) {
  const parsedData = parseFile(fileContent);
  
  const internalLines = [];
  
  parsedData.lines.forEach((parsedLine, index) => {
    const internalLine = convertParsedLineToInternal(parsedLine, index);
    
    if (internalLine) {
      internalLines.push(internalLine);
    }
  });
  
  return internalLines;
}

export default convertFileToLines;
