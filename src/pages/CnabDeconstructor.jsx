import { useState } from 'react';
import { parseFile } from '../scripts/CNAB/cnabParser';
import Accordeon from '../components/Accordeon';
import FileUpload from '../components/CNAB/FileUpload';
import { Toast } from '../vendors/swal/toast';
import '../styles/components/CnabValidator.css';
import '../styles/components/CnabDeconstructor.css';

function CnabDeconstructor() {
  const [parsedData, setParsedData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileLoaded = (content) => {
    const parsed = parseFile(content);
    setParsedData(parsed);
    
    Toast.fire({
      icon: 'success',
      title: 'Arquivo carregado!',
      text: `${parsed.summary.totalLines} linha(s) processada(s)`
    });
  };

  const getLineTypeLabel = (type) => {
    const labels = {
      header: 'Header',
      registro1: 'Registro 1 (Transação)',
      registro2: 'Registro 2 (Mensagens)',
      registro3: 'Registro 3 (Split)',
      registro7: 'Registro 7 (Endereço)',
      trailer: 'Trailer',
      unknown: 'Desconhecido'
    };
    return labels[type] || type;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="cnab-deconstructor__title">Desconstrutor CNAB 400/444</h2>
          <p className="cnab-deconstructor__subtitle">
            Faça upload de um arquivo .txt, .rem ou .ret para visualizar todos os campos detalhados
          </p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <FileUpload
            onFileLoaded={handleFileLoaded}
            fileName={fileName}
            setFileName={setFileName}
            acceptedExtensions={['txt', 'rem', 'ret']}
            buttonText="Selecionar Arquivo CNAB"
            buttonTextWithFile="Carregar Outro Arquivo"
          />
        </div>
      </div>

      {parsedData && (
        <>
          <div className="row mb-3">
            <div className="col-12">
              <div className="validation-rules">
                <h4>Resumo do Arquivo</h4>
                <div className="cnab-summary">
                  <p><strong>Total de Linhas:</strong> {parsedData.summary.totalLines}</p>
                  <p><strong>Header:</strong> {parsedData.summary.header}</p>
                  <p><strong>Trailer:</strong> {parsedData.summary.trailer}</p>
                  <p><strong>Registro 1:</strong> {parsedData.summary.registro1}</p>
                  <p><strong>Registro 2:</strong> {parsedData.summary.registro2}</p>
                  <p><strong>Registro 3:</strong> {parsedData.summary.registro3}</p>
                  <p><strong>Registro 7:</strong> {parsedData.summary.registro7}</p>
                  {parsedData.summary.unknown > 0 && (
                    <p className="cnab-summary__warning">
                      <strong>⚠️ Linhas Não Reconhecidas:</strong> {parsedData.summary.unknown}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h4 className="mb-3">Linhas Detalhadas</h4>
              {parsedData.lines.map((line, index) => (
                <Accordeon 
                  key={index}
                  title={
                    <div className="line-title">
                      <span className={`line-title__indicator line-title__indicator--${line.lineType}`}></span>
                      <strong>Linha {line.lineNumber}:</strong>
                      <span>{getLineTypeLabel(line.lineType)}</span>
                      {line.error && <span className="line-title__error">⚠️</span>}
                    </div>
                  }
                  content={
                    <div className="line-details">
                    {line.error && (
                      <div className="line-details__error">
                        <strong>Erro:</strong> {line.error}
                      </div>
                    )}

                    <div className="line-details__section">
                      <strong className="line-details__label">Linha Completa ({line.rawLine.length} caracteres):</strong>
                      <div className="code-block">
                        {line.rawLine}
                      </div>
                    </div>

                    {line.fields.length > 0 && (
                      <div>
                        <strong className="line-details__label">Campos Extraídos:</strong>
                        <table className="fields-table">
                          <thead className="fields-table__header">
                            <tr>
                              <th>
                                Campo
                              </th>
                              <th>
                                Descrição
                              </th>
                              <th className="fields-table__cell--center">
                                Posição
                              </th>
                              <th>
                                Valor
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
                                  {field.display || <em className="fields-table__value--empty">(vazio)</em>}
                                  {field.raw !== field.display && (
                                    <span className="fields-table__raw-indicator">
                                      (raw: &quot;{field.raw}&quot;)
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
            <p>Nenhum arquivo carregado. Selecione um arquivo CNAB para começar.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CnabDeconstructor;
