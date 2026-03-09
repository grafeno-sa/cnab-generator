import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LineSelector = ({ generatedLines, selectedLineIndex, setSelectedLineIndex, onLineSelected }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (selectedLineIndex !== null) {
      setInputValue((selectedLineIndex + 1).toString());
    }
  }, [selectedLineIndex]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSelect = () => {
    const lineNumber = parseInt(inputValue, 10);
    
    if (isNaN(lineNumber) || lineNumber < 1 || lineNumber > generatedLines.length) {
      alert(`Por favor, insira um número entre 1 e ${generatedLines.length}`);
      return;
    }
    
    // Convert to 0-based index
    const index = lineNumber - 1;
    setSelectedLineIndex(index);
    
    // Notify parent about the selected line type
    if (onLineSelected && generatedLines[index]) {
      onLineSelected(generatedLines[index].type);
    }
  };

  const handleClear = () => {
    setSelectedLineIndex(null);
    setInputValue('');
  };

  if (!generatedLines.length) {
    return null;
  }

  const selectedLine = selectedLineIndex !== null ? generatedLines[selectedLineIndex] : null;

  return (
    <div className="line-selector mb-3">
      <div className="row" style={{ alignItems: 'center', display: 'flex' }}>
        <span className="mr-2">Selecionar linha por posição:</span>
        <input
          id="line-number-input"
          type="number"
          min="1"
          max={generatedLines.length}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Nº"
          className="mr-2"
          style={{ width: '80px', padding: '4px 8px' }}
        />
        <button onClick={handleSelect} className="btn btn-primary mr-2">
          Selecionar
        </button>
        {selectedLineIndex !== null && (
          <button onClick={handleClear} className="btn btn-secondary">
            Limpar Seleção
          </button>
        )}
      </div>
      
      {selectedLine && (
        <div className="row mt-2">
          <p className="text-muted" style={{ margin: 0 }}>
            <strong>Linha {selectedLineIndex + 1} selecionada:</strong> {selectedLine.type}
          </p>
        </div>
      )}
    </div>
  );
};

LineSelector.propTypes = {
  generatedLines: PropTypes.array.isRequired,
  selectedLineIndex: PropTypes.number,
  setSelectedLineIndex: PropTypes.func.isRequired,
  onLineSelected: PropTypes.func,
};

export default LineSelector;
