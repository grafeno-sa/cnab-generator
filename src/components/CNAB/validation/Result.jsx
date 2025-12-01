import PropTypes from 'prop-types';
import Accordeon from '../../Accordeon';

function ValidationResult({ result }) {
  if (!result) return null;

  // Parse details to extract summary and line numbers
  const parseDetail = (detail) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(detail, 'text/html');
    const strongText = doc.querySelector('strong')?.textContent || '';
    
    // Remove the strong element to get the rest of the content
    const strongElement = doc.querySelector('strong');
    if (strongElement) {
      strongElement.remove();
    }
    
    // Get the remaining HTML with line breaks preserved
    const linesHtml = doc.body.innerHTML.trim();
    
    return {
      summary: strongText,
      lines: linesHtml
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
              <div className="details-accordions">
                {result.details.map((detail, index) => {
                  const { summary, lines } = parseDetail(detail);
                  return (
                    <Accordeon 
                      key={index}
                      title={summary}
                      content={<p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: lines }} />}
                      containerStyle={{
                        border: '1px solid #856404',
                        borderRadius: '5px',
                        marginBottom: '10px'
                      }}
                      headerStyle={{
                        background: '#fff3cd',
                        color: '#856404',
                        borderBottom: '1px solid #856404'
                      }}
                      contentStyle={{
                        background: '#fffbf0',
                        color: '#856404'
                      }}
                    />
                  );
                })}
              </div>
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
