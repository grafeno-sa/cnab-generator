import { useState } from 'react';
import { Toast } from '../vendors/swal/toast';

function CnabValidator() {
  const [validationResult, setValidationResult] = useState(null);
  const [fileName, setFileName] = useState('');

  const validateCnabFile = (content, filename) => {
    const errors = [];
    const warnings = [];
    
    // Split content into lines
    const lines = content.split('\n').filter(line => line.length > 0);
    
    if (lines.length === 0) {
      errors.push('O arquivo está vazio');
      return { isValid: false, errors, warnings };
    }

    // Check line sizes
    const lineSizes = lines.map(line => line.length);
    const uniqueSizes = [...new Set(lineSizes)];
    
    // Check if all lines have valid size (400 or 444)
    const invalidSizes = uniqueSizes.filter(size => size !== 400 && size !== 444);
    if (invalidSizes.length > 0) {
      errors.push(`Tamanhos de linha inválidos encontrados: ${invalidSizes.join(', ')}. Apenas 400 ou 444 caracteres são permitidos.`);
    }

    // Check if all lines have the same size
    if (uniqueSizes.length > 1) {
      errors.push(`Todas as linhas devem ter o mesmo tamanho. Tamanhos encontrados: ${uniqueSizes.join(', ')}`);
      lines.forEach((line, index) => {
        if (line.length !== lineSizes[0]) {
          warnings.push(`Linha ${index + 1}: ${line.length} caracteres (esperado: ${lineSizes[0]})`);
        }
      });
    }

    // Check header (first line must start with '0')
    if (lines[0][0] !== '0') {
      errors.push(`Header inválido: primeira linha deve começar com '0', mas começa com '${lines[0][0]}'`);
    }

    // Check trailer (last line must start with '9')
    if (lines[lines.length - 1][0] !== '9') {
      errors.push(`Trailer inválido: última linha deve começar com '9', mas começa com '${lines[lines.length - 1][0]}'`);
    }

    const isValid = errors.length === 0;
    
    return {
      isValid,
      errors,
      warnings,
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
      return;
    }

    setFileName(file.name);

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
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4">Validador CNAB</h2>
          <p className="text-center mb-4">
            Faça upload de um arquivo .txt ou .rem para validar sua estrutura
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="file-upload-section" style={{ 
            border: '2px dashed #ccc', 
            borderRadius: '8px', 
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <input
              type="file"
              accept=".txt,.rem"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="cnab-file-input"
            />
            <label 
              htmlFor="cnab-file-input" 
              style={{ 
                cursor: 'pointer',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px',
                display: 'inline-block'
              }}
            >
              Selecionar Arquivo
            </label>
            {fileName && (
              <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                Arquivo: {fileName}
              </p>
            )}
          </div>
        </div>
      </div>

      {validationResult && (
        <div className="row">
          <div className="col-12">
            <div style={{
              border: `2px solid ${validationResult.isValid ? '#28a745' : '#dc3545'}`,
              borderRadius: '8px',
              padding: '1.5rem',
              backgroundColor: validationResult.isValid ? '#d4edda' : '#f8d7da'
            }}>
              <h3 style={{ 
                color: validationResult.isValid ? '#155724' : '#721c24',
                marginBottom: '1rem'
              }}>
                {validationResult.isValid ? '✓ Validação Bem-Sucedida' : '✗ Validação Falhou'}
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <p><strong>Total de linhas:</strong> {validationResult.lineCount}</p>
                <p><strong>Tamanho das linhas:</strong> {validationResult.lineSize} caracteres</p>
              </div>

              {validationResult.errors.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ color: '#721c24' }}>Erros:</h4>
                  <ul style={{ color: '#721c24' }}>
                    {validationResult.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validationResult.warnings.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ color: '#856404' }}>Avisos:</h4>
                  <ul style={{ color: '#856404' }}>
                    {validationResult.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-12">
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '8px' 
          }}>
            <h4>Regras de Validação:</h4>
            <ul>
              <li>O arquivo deve ter extensão .txt ou .rem</li>
              <li>Todas as linhas devem ter exatamente 400 ou 444 caracteres</li>
              <li>Todas as linhas devem ter o mesmo tamanho</li>
              <li>A primeira linha (header) deve começar com '0'</li>
              <li>A última linha (trailer) deve começar com '9'</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CnabValidator;