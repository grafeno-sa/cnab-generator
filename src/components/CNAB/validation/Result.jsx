function ValidationResult({ result }) {
  if (!result) return null;

  return (
    <div className="row">
      <div className="col-12">
        <div className={`validation-result ${result.isValid ? 'valid' : 'invalid'}`}>
          <h3>
            {result.isValid ? '✓ Validação Bem-Sucedida' : '✗ Validação Falhou'}
          </h3>

          <div className="validation-info">
            <p><strong>Total de linhas:</strong> {result.lineCount}</p>
            <p><strong>Tamanho das linhas:</strong> {result.lineSize} caracteres</p>
          </div>

          {result.errors.length > 0 && (
            <div className="validation-errors">
              <h4>Erros:</h4>
              <ul>
                {result.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {result.details.length > 0 && (
            <div className="validation-warnings">
              <h4>Detalhes:</h4>
              <ul>
                {result.details.map((detail, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: detail }}></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ValidationResult;
