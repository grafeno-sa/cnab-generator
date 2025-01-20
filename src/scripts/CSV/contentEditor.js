import { last as arrayLast } from 'lodash'

const ContentEditor = () => {
  const editAll = ({ generatedLines, editedFields }) => {
    generatedLines.map((line) => {
      editedFields.forEach((field) => {
        line.data[field.name] = field.value
      })

      return line
    })

    return generatedLines
  }

  const editLast = ({ generatedLines, editedFields }) => {
    const lineToEdit = arrayLast(generatedLines)
    editedFields.forEach((field) => {
      lineToEdit.data[field.name] = field.value
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