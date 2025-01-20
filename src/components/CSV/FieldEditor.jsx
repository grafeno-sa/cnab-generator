import { useState } from "react"
import PropTypes from "prop-types";
import Field from "../Field"
import ContentEditor from "../../scripts/CSV/contentEditor"
import CSV_LINE_FIELDS from "../../scripts/CSV/lineFields"

const FieldEditor = ({ generatedLines, setGeneratedLines }) => {
  const [editedFields, setEditedFields] = useState([])

  const handleEditAll = () => {
    const editedLines = ContentEditor().editAll({ generatedLines, editedFields })
    setGeneratedLines(() => [...editedLines])
  }
  
  const handleEditLast = () => {
    const editedLines = ContentEditor().editLast({ generatedLines, editedFields })
    setGeneratedLines(() => [...editedLines])
  }

  const handleEditLastLine = () => {
    const editedLines = ContentEditor().deleteLast({ generatedLines, editedFields })
    setGeneratedLines(() => [...editedLines])
  }

  if (!generatedLines.length) {
    return (
      <>
        <p>
          Adicione dados para editar
        </p>
      </>
    )
  }

  return (
    <>
      <div className="row mb-3">
        <button
          onClick={handleEditAll}
          className="btn btn-danger">
          Editar todas as linhas
        </button>
        <button
          onClick={handleEditLast}
          className="btn btn-danger">
          Editar a última linha
        </button>
        <button
          onClick={handleEditLastLine}
          className="btn btn-danger">
          Remover a última linha
        </button>
      </div>
      <div className="row mt-3">
        {CSV_LINE_FIELDS.map((field, index) => (
          <Field
            field={field}
            key={index}
            setEditedFields={setEditedFields}/>
        ))}
      </div>
    </>
  )
}

FieldEditor.propTypes = {
  generatedLines: PropTypes.array.isRequired,
  setGeneratedLines: PropTypes.func.isRequired,
};

export default FieldEditor