import { last as arrayLast } from 'lodash'
import generateLine from './lineFactory'

// Recalcula index/serialNumber a partir da posição real no array. Exportada
// à parte pra ser reaproveitada por quem precisa reordenar generatedLines
// (ex.: manter header sempre na primeira posição e trailer na última).
export const updateSequentialNumbers = (generatedLines) => {
  // Create new line objects with updated index and serialNumber
  return generatedLines.map((line, index) => {
    const updatedLine = { ...line };
    updatedLine.index = index;
    // serialNumber is the line position (1-based)
    if (updatedLine.serialNumber !== undefined) {
      updatedLine.serialNumber = (index + 1).toString();
    }
    return updatedLine;
  });
}

const ContentEditor = () => {
  const editAll = ({ generatedLines, editedFields, recordType }) => {
    const updatedLines = generatedLines.map((line) => {
      if (line.type !== recordType) return line

      const editedLine = { ...line };
      editedFields.forEach((field) => {
        editedLine[field.name] = field.value
      })

      return editedLine
    })

    return updateSequentialNumbers(updatedLines)
  }

  // Header e trailer só existem uma vez no arquivo (LineGenerationValidator)
  // e o editor deles não passa por um botão "adicionar" antes de editar —
  // então editar um dos dois cria a linha (com defaults + campos editados)
  // quando ainda não existe, em vez de não fazer nada.
  const editSingleOccurrence = ({ generatedLines, editedFields, type, settings }) => {
    const exists = generatedLines.some((line) => line.type === type)

    if (exists) {
      return editAll({ generatedLines, editedFields, recordType: type })
    }

    const newLine = generateLine({ type, generatedLines, settings })
    editedFields.forEach((field) => {
      newLine[field.name] = field.value
    })

    return updateSequentialNumbers([...generatedLines, newLine])
  }

  const editLast = ({ generatedLines, editedFields, recordType }) => {
    const sameTypeLines = generatedLines.filter((line) => line.type === recordType)
    const lineToEdit = arrayLast(sameTypeLines)
    const editedLine = { ...lineToEdit };
    
    editedFields.forEach((field) => {
      editedLine[field.name] = field.value
    })

    const updatedLines = [...generatedLines];
    updatedLines[lineToEdit.index] = editedLine;
    return updateSequentialNumbers(updatedLines)
  }

  const deleteLast = ({generatedLines}) => {
    // Find the last line that is not a trailer
    let lastNonTrailerIndex = -1;
    for (let i = generatedLines.length - 1; i >= 0; i--) {
      if (generatedLines[i].type !== 'trailer') {
        lastNonTrailerIndex = i;
        break;
      }
    }
    
    // Create a new array without the last non-trailer line
    if (lastNonTrailerIndex !== -1) {
      const newLines = [
        ...generatedLines.slice(0, lastNonTrailerIndex),
        ...generatedLines.slice(lastNonTrailerIndex + 1)
      ];
      return updateSequentialNumbers(newLines);
    }
    
    return generatedLines;
  }

  const editByIndex = ({ generatedLines, editedFields, lineIndex }) => {
    if (lineIndex < 0 || lineIndex >= generatedLines.length) {
      console.error('Invalid line index');
      return generatedLines;
    }

    const lineToEdit = { ...generatedLines[lineIndex] };
    editedFields.forEach((field) => {
      lineToEdit[field.name] = field.value;
    });

    const updatedLines = [...generatedLines];
    updatedLines[lineIndex] = lineToEdit;
    return updateSequentialNumbers(updatedLines);
  }

  return { editAll, editLast, editSingleOccurrence, deleteLast, editByIndex }
}

export default ContentEditor;