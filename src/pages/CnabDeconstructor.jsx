import { useState } from 'react';
import { parseFile } from '../scripts/CNAB/cnabParser';
import Accordeon from '../components/Accordeon';
import FileUpload from '../components/CNAB/FileUpload';
import { Toast } from '../vendors/swal/toast';
import { 
  LINE_TYPE_LABELS, 
  ACCEPTED_FILE_EXTENSIONS, 
  UI_TEXT, 
  TOAST_MESSAGES 
} from '../constants/cnabDeconstructor';
import '../styles/components/CnabValidator.css';
import '../styles/components/CnabDeconstructor.css';

function CnabDeconstructor() {
  const [parsedData, setParsedData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileLoaded = (content) => {
    const parsed = parseFile(content);
    setParsedData(parsed);
    
    const { icon, title, getText } = TOAST_MESSAGES.fileLoaded;
    Toast.fire({
      icon,
      title,
      text: getText(parsed.summary.totalLines)
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="cnab-deconstructor__title">{UI_TEXT.pageTitle}</h2>
          <p className="cnab-deconstructor__subtitle">
            {UI_TEXT.pageSubtitle}
          </p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <FileUpload
            onFileLoaded={handleFileLoaded}
            fileName={fileName}
            setFileName={setFileName}
            acceptedExtensions={ACCEPTED_FILE_EXTENSIONS}
            buttonText={UI_TEXT.buttonText}
            buttonTextWithFile={UI_TEXT.buttonTextWithFile}
          />
        </div>
      </div>

      {parsedData && (
        <>
          <div className="row mb-3">
            <div className="col-12">
              <div className="validation-rules">
                <h4>{UI_TEXT.summaryTitle}</h4>
                <div className="cnab-summary">
                  <p><strong>{UI_TEXT.totalLinesLabel}</strong> {parsedData.summary.totalLines}</p>
                  <p><strong>{UI_TEXT.headerLabel}</strong> {parsedData.summary.header}</p>
                  <p><strong>{UI_TEXT.trailerLabel}</strong> {parsedData.summary.trailer}</p>
                  <p><strong>{UI_TEXT.registro1Label}</strong> {parsedData.summary.registro1}</p>
                  <p><strong>{UI_TEXT.registro2Label}</strong> {parsedData.summary.registro2}</p>
                  <p><strong>{UI_TEXT.registro3Label}</strong> {parsedData.summary.registro3}</p>
                  <p><strong>{UI_TEXT.registro7Label}</strong> {parsedData.summary.registro7}</p>
                  {parsedData.summary.unknown > 0 && (
                    <p className="cnab-summary__warning">
                      <strong>{UI_TEXT.unknownLinesLabel}</strong> {parsedData.summary.unknown}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <h4 className="mb-3">{UI_TEXT.detailsTitle}</h4>
              {parsedData.lines.map((line, index) => (
                <Accordeon 
                  key={index}
                  title={
                    <div className="line-title">
                      <span className={`line-title__indicator line-title__indicator--${line.lineType}`}></span>
                      <strong>{UI_TEXT.lineLabel} {line.lineNumber}:</strong>
                      <span>{LINE_TYPE_LABELS[line.lineType] || line.lineType}</span>
                      {line.error && <span className="line-title__error">⚠️</span>}
                    </div>
                  }
                  content={
                    <div className="line-details">
                    {line.error && (
                      <div className="line-details__error">
                        <strong>{UI_TEXT.errorLabel}</strong> {line.error}
                      </div>
                    )}

                    <div className="line-details__section">
                      <strong className="line-details__label">{UI_TEXT.completeLineLabel} ({line.rawLine.length} {UI_TEXT.charactersLabel}):</strong>
                      <div className="code-block">
                        {line.rawLine}
                      </div>
                    </div>

                    {line.fields.length > 0 && (
                      <div>
                        <strong className="line-details__label">{UI_TEXT.extractedFieldsLabel}</strong>
                        <table className="fields-table">
                          <thead className="fields-table__header">
                            <tr>
                              <th>
                                {UI_TEXT.fieldColumnLabel}
                              </th>
                              <th>
                                {UI_TEXT.descriptionColumnLabel}
                              </th>
                              <th className="fields-table__cell--center">
                                {UI_TEXT.positionColumnLabel}
                              </th>
                              <th>
                                {UI_TEXT.valueColumnLabel}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {line.fields.map((field, fieldIndex) => (
                              <tr key={fieldIndex} className={fieldIndex % 2 === 0 ? 'fields-table__row--even' : 'fields-table__row--odd'}>
                                <td className="fields-table__cell--monospace">
                                  {field.name}
                                </td>
                                <td className="fields-table__cell--description">
                                  {field.description}
                                </td>
                                <td className="fields-table__cell--center fields-table__cell--monospace">
                                  {field.startIndex}-{field.endIndex} ({field.length})
                                </td>
                                <td className={`fields-table__value ${field.display ? 'fields-table__value--filled' : ''}`}>
                                  {field.display || <em className="fields-table__value--empty">{UI_TEXT.emptyValueLabel}</em>}
                                  {field.raw !== field.display && (
                                    <span className="fields-table__raw-indicator">
                                      {UI_TEXT.rawValuePrefix}{field.raw}&quot;)
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  }
                />
              ))}
            </div>
          </div>
        </>
      )}

      {!parsedData && (
        <div className="row">
          <div className="col-12 empty-state">
            <p>{UI_TEXT.emptyStateMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CnabDeconstructor;
