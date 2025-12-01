import { useState } from 'react';
import { Toast } from '../vendors/swal/toast';
import CnabValidator from '../components/CNAB/Validator';
import '../styles/components/CnabValidator.css';

function Cnab400Validator() {
  const [validationResult, setValidationResult] = useState(null);
  const [fileName, setFileName] = useState('');

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
      const result = CnabValidator(content, '400', [400, 444]);
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

export default Cnab400Validator;