const CnabValidator = (content, expectedSizes = [400, 444]) => {
  const errors = [];
  const details = [];
  
  // Split content into lines
  const lines = content.split('\n').filter(line => line.length > 0);
  
  if (lines.length === 0) {
    errors.push('O arquivo está vazio');
    return { isValid: false, errors, details };
  }

  // Check line sizes
  const lineSizes = lines.map(line => line.length);
  const uniqueSizes = [...new Set(lineSizes)];
  
  // Check if all lines have valid size
  const invalidSizes = uniqueSizes.filter(size => !expectedSizes.includes(size));
  if (invalidSizes.length > 0) {
    errors.push(`Tamanhos de linha inválidos encontrados: ${invalidSizes.join(', ')}. Apenas ${expectedSizes.join(' ou ')} caracteres são permitidos.`);
    // Group lines by their size
    const linesBySize = {};
    lines.forEach((line, index) => {
      if (!expectedSizes.includes(line.length)) {
        if (!linesBySize[line.length]) {
          linesBySize[line.length] = [];
        }
        linesBySize[line.length].push(index + 1);
      }
    });
    // Create grouped details
    Object.keys(linesBySize).sort((a, b) => a - b).forEach(size => {
      const lineNumbers = linesBySize[size];
      details.push(`<strong>${lineNumbers.length} linha(s) com ${size} caracteres (esperado: ${expectedSizes.join(' ou ')}):</strong> Linhas ${lineNumbers.join(', ')}`);
    });
  }

  // Check if all lines have the same size
  if (uniqueSizes.length > 1 && invalidSizes.length === 0) {
    errors.push(`Todas as linhas devem ter o mesmo tamanho. Tamanhos encontrados: ${uniqueSizes.join(', ')}`);
    // Determine the most common size to use as expected
    const sizeCounts = {};
    lineSizes.forEach(size => {
      sizeCounts[size] = (sizeCounts[size] || 0) + 1;
    });
    const expectedSize = Object.keys(sizeCounts).reduce((a, b) => 
      sizeCounts[a] > sizeCounts[b] ? a : b
    );
    // Group lines by their size
    const linesBySize = {};
    lines.forEach((line, index) => {
      if (line.length !== parseInt(expectedSize)) {
        if (!linesBySize[line.length]) {
          linesBySize[line.length] = [];
        }
        linesBySize[line.length].push(index + 1);
      }
    });
    // Create grouped details
    Object.keys(linesBySize).sort((a, b) => a - b).forEach(size => {
      const lineNumbers = linesBySize[size];
      details.push(`<strong>${lineNumbers.length} linha(s) com ${size} caracteres (esperado: ${expectedSize}):</strong> Linhas ${lineNumbers.join(', ')}`);
    });
  }

  // Check header (first line must start with '0')
  if (lines[0][0] !== '0') {
    errors.push(`Header inválido: primeira linha deve começar com &apos;0&apos;, mas começa com &apos;${lines[0][0]}&apos;`);
  }

  if (lines[lines.length - 1][0] !== '9') {
    errors.push(`Trailer inválido: última linha deve começar com &apos;9&apos;, mas começa com &apos;${lines[lines.length - 1][0]}&apos;`);
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
