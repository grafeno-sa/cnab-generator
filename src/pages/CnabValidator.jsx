import { useState } from 'react';
import { Toast } from '../vendors/swal/toast';
import '../styles/components/CnabValidator.css';

function CnabValidator() {
  const [validationResult, setValidationResult] = useState(null);
  const [fileName, setFileName] = useState('');

  const validateCnabFile = (content) => {
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
    
    // Check if all lines have valid size (400 or 444)
    const invalidSizes = uniqueSizes.filter(size => size !== 400 && size !== 444);
    if (invalidSizes.length > 0) {
      errors.push(`Tamanhos de linha inválidos encontrados: ${invalidSizes.join(', ')}. Apenas 400 ou 444 caracteres são permitidos.`);
      // Group lines by their size
      const linesBySize = {};
      lines.forEach((line, index) => {
        if (line.length !== 400 && line.length !== 444) {
          if (!linesBySize[line.length]) {
            linesBySize[line.length] = [];
          }
          linesBySize[line.length].push(index + 1);
        }
      });
      // Create grouped details
      Object.keys(linesBySize).sort((a, b) => a - b).forEach(size => {
        const lineNumbers = linesBySize[size];
        details.push(`<strong>${lineNumbers.length} linha(s) com ${size} caracteres (esperado: 400 ou 444):</strong> Linhas ${lineNumbers.join(', ')}`);
      });
    }

    // Check if all lines have the same size
    if (uniqueSizes.length > 1 && invalidSizes.length === 0) {
      // Only show this error if all sizes are valid (400 or 444) but inconsistent
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

    // Check trailer (last line must start with '9')
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Check file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'txt' && fileExtension !== 'rem') {
      Toast.fire({
        icon: 'error',
        title: 'Tipo de arquivo inválido',
        text: 'Por favor, selecione um arquivo .txt ou .rem'
      });
      event.target.value = null; // Reset input
      return;
    }

    setFileName(file.name);
    setValidationResult(null); // Reset previous validation result

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const result = validateCnabFile(content, file.name);
      setValidationResult(result);

      if (result.isValid) {
        Toast.fire({
          icon: 'success',
          title: 'Arquivo válido!',
          text: 'O arquivo CNAB passou em todas as validações'
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Validação falhou',
          text: `${result.errors.length} erro(s) encontrado(s)`
        });
      }
    };

    reader.readAsText(file);
    
    // Reset the input so the same file can be uploaded again
    event.target.value = null;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-3">Validador CNAB</h2>
          <p className="text-center mb-3">
            Faça upload de um arquivo .txt ou .rem para validar sua estrutura
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="file-upload-section">
            <input
              type="file"
              accept=".txt,.rem"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="cnab-file-input"
            />
            <label 
              htmlFor="cnab-file-input" 
              className="file-upload-label"
            >
              {fileName ? 'Validar Outro Arquivo' : 'Selecionar Arquivo'}
            </label>
            {fileName && (
              <p className="file-name-display">
                Arquivo: {fileName}
              </p>
            )}
          </div>
        </div>
      </div>

      {validationResult && (
        <div className="row">
          <div className="col-12">
            <div className={`validation-result ${validationResult.isValid ? 'valid' : 'invalid'}`}>
              <h3>
                {validationResult.isValid ? '✓ Validação Bem-Sucedida' : '✗ Validação Falhou'}
              </h3>

              <div className="validation-info">
                <p><strong>Total de linhas:</strong> {validationResult.lineCount}</p>
                <p><strong>Tamanho das linhas:</strong> {validationResult.lineSize} caracteres</p>
              </div>

              {validationResult.errors.length > 0 && (
                <div className="validation-errors">
                  <h4>Erros:</h4>
                  <ul>
                    {validationResult.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validationResult.details.length > 0 && (
                <div className="validation-warnings">
                  <h4>Detalhes:</h4>
                  <ul>
                    {validationResult.details.map((detail, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: detail }}></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="row mt-3">
        <div className="col-12">
          <div className="validation-rules">
            <h4>Regras de Validação:</h4>
            <ul>
              <li>O arquivo deve ter extensão .txt ou .rem</li>
              <li>Todas as linhas devem ter exatamente 400 ou 444 caracteres</li>
              <li>Todas as linhas devem ter o mesmo tamanho</li>
              <li>A primeira linha (header) deve começar com &apos;0&apos;</li>
              <li>A última linha (trailer) deve começar com &apos;9&apos;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CnabValidator;