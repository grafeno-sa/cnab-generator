import { LINE_IDS } from '../../scripts/CNAB/lineId.js';

const CnabValidator = (content, cnabType = '400', expectedSizes = [400, 444]) => {
  const errors = [];
  const details = [];
  
  // Get line ID constants for the specified CNAB type
  const lineIds = LINE_IDS[cnabType];
  if (!lineIds) {
    errors.push(`Tipo de CNAB não suportado: ${cnabType}`);
    return { isValid: false, errors, details };
  }

  const { HEADER, TRAILER, VALID_REGISTERS, REQUIRES_REGISTER_1 } = lineIds;
  
  // Split content into lines and remove carriage returns
  const lines = content.split('\n')
    .map(line => line.replace(/\r/g, '')) // Remove carriage returns
    .filter(line => line.length > 0);
  
  if (lines.length === 0) {
    errors.push('O arquivo está vazio');
    return { isValid: false, errors, details };
  }

  // Single pass validation
  const lineSizes = [];
  const linesBySize = {};
  const invalidRegisterLines = [];
  const sequenceErrors = [];
  let lastRegister1Index = -1;
  const seenRegistersAfterLast1 = new Set();
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const lineSize = line.length;
    const lineId = line[0];
    
    // Track line sizes
    lineSizes.push(lineSize);
    
    // Check line size validity and group by size
    if (!expectedSizes.includes(lineSize)) {
      if (!linesBySize[lineSize]) {
        linesBySize[lineSize] = [];
      }
      linesBySize[lineSize].push(lineNumber);
    }
    
    // Check header (first line)
    if (index === 0 && lineId !== HEADER) {
      errors.push(`Header inválido: primeira linha deve começar com '${HEADER}', mas começa com '${lineId}'`);
    }
    
    // Check trailer (last line)
    if (index === lines.length - 1 && lineId !== TRAILER) {
      errors.push(`Trailer inválido: última linha deve começar com '${TRAILER}', mas começa com '${lineId}'`);
    }
    
    // Check middle lines (registers)
    if (index > 0 && index < lines.length - 1) {
      if (VALID_REGISTERS && !VALID_REGISTERS.includes(lineId)) {
        invalidRegisterLines.push(lineNumber);
      } else if (VALID_REGISTERS && VALID_REGISTERS.includes(lineId)) {
        // Validate register sequences
        if (lineId === '1') {
          lastRegister1Index = index;
          seenRegistersAfterLast1.clear();
        } else if (REQUIRES_REGISTER_1 && REQUIRES_REGISTER_1.includes(lineId)) {
          // Check if register 2, 3, or 7 has a preceding register 1
          if (lastRegister1Index === -1 || lastRegister1Index < index - 1 - seenRegistersAfterLast1.size) {
            sequenceErrors.push({
              type: 'missing_register_1',
              message: `Linha ${lineNumber}: Registro '${lineId}' deve ser precedido por um registro '1'`
            });
          }
          // Check for repetition (register already seen after last 1)
          if (seenRegistersAfterLast1.has(lineId)) {
            sequenceErrors.push({
              type: 'duplicate',
              message: `Linha ${lineNumber}: Registro '${lineId}' está duplicado`
            });
          }
          seenRegistersAfterLast1.add(lineId);
        }
      }
    }
  });
  
  const uniqueSizes = [...new Set(lineSizes)];
  const invalidSizes = Object.keys(linesBySize);
  
  // Report invalid sizes
  if (invalidSizes.length > 0) {
    errors.push(`Tamanhos de linha inválidos encontrados: ${invalidSizes.join(', ')}. Apenas ${expectedSizes.join(' ou ')} caracteres são permitidos.`);
    Object.keys(linesBySize).sort((a, b) => a - b).forEach(size => {
      const lineNumbers = linesBySize[size];
      details.push(`<strong>${lineNumbers.length} linha(s) com ${size} caracteres (esperado: ${expectedSizes.join(' ou ')}):</strong> Linhas ${lineNumbers.join(', ')}`);
    });
  }
  
  // Check if all lines have the same size (only if no invalid sizes)
  if (uniqueSizes.length > 1 && invalidSizes.length === 0) {
    errors.push(`Todas as linhas devem ter o mesmo tamanho. Tamanhos encontrados: ${uniqueSizes.join(', ')}`);
    // Determine the most common size
    const sizeCounts = {};
    lineSizes.forEach(size => {
      sizeCounts[size] = (sizeCounts[size] || 0) + 1;
    });
    const expectedSize = Object.keys(sizeCounts).reduce((a, b) => 
      sizeCounts[a] > sizeCounts[b] ? a : b
    );
    // Group lines with different sizes
    const inconsistentLines = {};
    lines.forEach((line, index) => {
      if (line.length !== parseInt(expectedSize)) {
        if (!inconsistentLines[line.length]) {
          inconsistentLines[line.length] = [];
        }
        inconsistentLines[line.length].push(index + 1);
      }
    });
    Object.keys(inconsistentLines).sort((a, b) => a - b).forEach(size => {
      const lineNumbers = inconsistentLines[size];
      details.push(`<strong>${lineNumbers.length} linha(s) com ${size} caracteres (esperado: ${expectedSize}):</strong> Linhas ${lineNumbers.join(', ')}`);
    });
  }
  
  // Report invalid registers
  if (invalidRegisterLines.length > 0) {
    errors.push(`Registros inválidos: ${invalidRegisterLines.length} linha(s) com identificador inválido. Valores permitidos: ${VALID_REGISTERS.join(', ')}`);
    details.push(`<strong>${invalidRegisterLines.length} linha(s) com identificador de registro inválido (esperado: ${VALID_REGISTERS.join(', ')}):</strong> Linhas ${invalidRegisterLines.join(', ')}`);
  }
  
  // Report sequence errors
  if (sequenceErrors.length > 0) {
    errors.push(`Erros de sequência: ${sequenceErrors.length} problema(s) de ordenação ou duplicação de registros`);
    
    // Group errors by type
    const missingRegister1Errors = sequenceErrors.filter(e => e.type === 'missing_register_1').map(e => e.message);
    const duplicateErrors = sequenceErrors.filter(e => e.type === 'duplicate').map(e => e.message);
    
    if (missingRegister1Errors.length > 0) {
      details.push(`<strong>Registros sem registro '1' precedente (${missingRegister1Errors.length}):</strong> ${missingRegister1Errors.join('<br>')}`);
    }
    
    if (duplicateErrors.length > 0) {
      details.push(`<strong>Registros duplicados (${duplicateErrors.length}):</strong> ${duplicateErrors.join('<br>')}`);
    }
  }

  const isValid = errors.length === 0;
  
  return {
    isValid,
    errors,
    details,
    lineCount: lines.length,
    lineSize: uniqueSizes[0] || 'inconsistente'
  };
};

export default CnabValidator;
