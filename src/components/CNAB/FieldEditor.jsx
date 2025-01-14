import { useState } from "react"
import PropTypes from "prop-types";
import Field from "./Field"
import getLineFields from "../../scripts/CNAB/lineFields"
import ContentEditor from "../../scripts/CNAB/contentEditor"

const FieldEditor = ({ generatedLines, setGeneratedLines }) => {
  const editableTypes = ['registro1', 'registro2', 'registro3', 'registro7']
  const [recordType, setRecordType] = useState('registro1')
  const [fieldOptions, setFieldOptions] = useState(getLineFields('registro1'))
  const [editedFields, setEditedFields] = useState([])

  const selectHandler = (e) => {
    setFieldOptions(getLineFields(e.target.value))
    setRecordType(e.target.value)
    setEditedFields([])
  }

  const handleEditAll = () => {
    const editedLines = ContentEditor().editAll({ generatedLines, editedFields, recordType })
    setGeneratedLines(() => [...editedLines])
  }
  
  const handleEditLast = () => {
    const editedLines = ContentEditor().editLast({ generatedLines, editedFields, recordType })
    setGeneratedLines(() => [...editedLines])
  }

  const handleEditLastLine = () => {
    const editedLines = ContentEditor().deleteLast({ generatedLines, editedFields, recordType })
    setGeneratedLines(() => [...editedLines])
  }

  if (!generatedLines.length) return (<></>)

  return (
    <>
      <div className="row mb-3">
        <select
          onChange={selectHandler}
          className="mr-3 flex-align-center">
          {editableTypes.map((t, index) => <option value={t} key={index}>{t}</option>)}
        </select>
        <button
          onClick={handleEditAll}
          className="btn btn-danger">
          Editar todos os {recordType}
        </button>
        <button
          onClick={handleEditLast}
          className="btn btn-danger">
          Editar o último {recordType}
        </button>
        <button
          onClick={handleEditLastLine}
          className="btn btn-danger">
          Remover a última linha
        </button>
      </div>
      <div className="row mt-3">
        {fieldOptions.map((field) => (
          <Field
            field={field}
            key={field.startIndex}
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