import { last as arrayLast } from 'lodash'

const ContentEditor = () => {
  const editAll = ({ generatedLines, editedFields, recordType }) => {
    generatedLines.map((line) => {
      if (line.type !== recordType) return line

      editedFields.forEach((field) => {
        line[field.name] = field.value
      })

      return line
    })

    return generatedLines
  }

  const editLast = ({ generatedLines, editedFields, recordType }) => {
    const sameTypeLines = generatedLines.filter((line) => line.type === recordType)
    const lineToEdit = arrayLast(sameTypeLines)
    editedFields.forEach((field) => {
      lineToEdit[field.name] = field.value
    })

    generatedLines[lineToEdit.index] = lineToEdit
    return generatedLines
  }

  return { editAll, editLast }
}

export default ContentEditor;