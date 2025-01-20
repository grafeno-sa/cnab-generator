// refatorar
import { last as arrayLast } from 'lodash'

const ContentEditor = () => {
  const editAll = ({ generatedLines, editedFields }) => {
    generatedLines.map((line) => {
      editedFields.forEach((field) => {
        line[field.name] = field.value
      })

      return line
    })

    return generatedLines
  }

  const editLast = ({ generatedLines, editedFields }) => {
    const lineToEdit = arrayLast(editedFields)
    editedFields.forEach((field) => {
      lineToEdit[field.name] = field.value
    })

    generatedLines[lineToEdit.index] = lineToEdit
    return generatedLines
  }

  const deleteLast = ({generatedLines}) => {
    generatedLines.pop()
    return generatedLines
  }

  return { editAll, editLast, deleteLast }
}

export default ContentEditor;