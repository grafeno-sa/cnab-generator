import { useState } from 'react';
import { parseFile } from '../scripts/CNAB/cnabParser';
import Accordeon from '../components/Accordeon';
import FileUpload from '../components/CNAB/FileUpload';
import { Toast } from '../vendors/swal/toast';
import '../styles/components/CnabValidator.css';

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

  const getLineTypeColor = (type) => {
    const colors = {
      header: '#4CAF50',
      registro1: '#2196F3',
      registro2: '#FF9800',
      registro3: '#9C27B0',
      registro7: '#00BCD4',
      trailer: '#F44336',
      unknown: '#9E9E9E'
    };
    return colors[type] || '#757575';
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-2">Desconstrutor CNAB 400/444</h2>
          <p className="text-center mb-3">
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
                <div style={{ marginTop: '1rem' }}>
                  <p><strong>Total de Linhas:</strong> {parsedData.summary.totalLines}</p>
                  <p><strong>Header:</strong> {parsedData.summary.header}</p>
                  <p><strong>Trailer:</strong> {parsedData.summary.trailer}</p>
                  <p><strong>Registro 1:</strong> {parsedData.summary.registro1}</p>
                  <p><strong>Registro 2:</strong> {parsedData.summary.registro2}</p>
                  <p><strong>Registro 3:</strong> {parsedData.summary.registro3}</p>
                  <p><strong>Registro 7:</strong> {parsedData.summary.registro7}</p>
                  {parsedData.summary.unknown > 0 && (
                    <p style={{ color: '#dc3545' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: getLineTypeColor(line.lineType)
                      }}></span>
                      <strong>Linha {line.lineNumber}:</strong>
                      <span>{getLineTypeLabel(line.lineType)}</span>
                      {line.error && <span style={{ color: 'red' }}>⚠️</span>}
                    </div>
                  }
                  content={
                    <div className="line-details" style={{ padding: '15px' }}>
                    {line.error && (
                      <div style={{ 
                        color: 'red', 
                        marginBottom: '15px',
                        padding: '10px',
                        backgroundColor: '#ffebee',
                        borderRadius: '4px'
                      }}>
                        <strong>Erro:</strong> {line.error}
                      </div>
                    )}

                    <div style={{ marginBottom: '15px' }}>
                      <strong>Linha Completa ({line.rawLine.length} caracteres):</strong>
                      <div style={{ 
                        marginTop: '5px',
                        padding: '10px', 
                        backgroundColor: '#f9f9f9',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        overflowX: 'auto',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px'
                      }}>
                        {line.rawLine}
                      </div>
                    </div>

                    {line.fields.length > 0 && (
                      <div>
                        <strong>Campos Extraídos:</strong>
                        <table style={{ 
                          width: '100%', 
                          marginTop: '10px',
                          borderCollapse: 'collapse'
                        }}>
                          <thead>
                            <tr style={{ backgroundColor: '#e0e0e0' }}>
                              <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left' }}>
                                Campo
                              </th>
                              <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left' }}>
                                Descrição
                              </th>
                              <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'center' }}>
                                Posição
                              </th>
                              <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left' }}>
                                Valor
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {line.fields.map((field, fieldIndex) => (
                              <tr key={fieldIndex} style={{ backgroundColor: fieldIndex % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                <td style={{ 
                                  padding: '8px', 
                                  border: '1px solid #ccc',
                                  fontFamily: 'monospace',
                                  fontSize: '12px'
                                }}>
                                  {field.name}
                                </td>
                                <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '13px' }}>
                                  {field.description}
                                </td>
                                <td style={{ 
                                  padding: '8px', 
                                  border: '1px solid #ccc', 
                                  textAlign: 'center',
                                  fontFamily: 'monospace',
                                  fontSize: '12px'
                                }}>
                                  {field.startIndex}-{field.endIndex} ({field.length})
                                </td>
                                <td style={{ 
                                  padding: '8px', 
                                  border: '1px solid #ccc',
                                  fontFamily: 'monospace',
                                  fontSize: '12px',
                                  fontWeight: field.display ? 'bold' : 'normal'
                                }}>
                                  {field.display || <em style={{ color: '#999' }}>(vazio)</em>}
                                  {field.raw !== field.display && (
                                    <span style={{ color: '#666', fontSize: '11px', marginLeft: '8px' }}>
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
          <div className="col-12 text-center" style={{ padding: '40px', color: '#999' }}>
            <p>Nenhum arquivo carregado. Selecione um arquivo CNAB para começar.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CnabDeconstructor;
