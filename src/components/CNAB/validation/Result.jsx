import PropTypes from 'prop-types';
import Accordeon from '../../Accordeon';

function ValidationResult({ result }) {
  if (!result) return null;

  // Parse details to extract summary and line numbers
  const parseDetail = (detail) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(detail, 'text/html');
    const strongText = doc.querySelector('strong')?.textContent || '';
    const fullText = doc.body.textContent || '';
    const linesText = fullText.replace(strongText, '').trim();
    
    return {
      summary: strongText,
      lines: linesText
    };
  };

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
              {result.details.map((detail, index) => {
                const { summary, lines } = parseDetail(detail);
                return (
                  <Accordeon 
                    key={index}
                    title={summary}
                    content={<p style={{ margin: 0 }}>{lines}</p>}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ValidationResult.propTypes = {
  result: PropTypes.shape({
    isValid: PropTypes.bool.isRequired,
    lineCount: PropTypes.number.isRequired,
    lineSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
    details: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default ValidationResult;
