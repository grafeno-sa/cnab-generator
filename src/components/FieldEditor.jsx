import React, { useState } from "react"
import Field from "./Field"
import getLineFields from "../scripts/lineFields"
import ContentEditor from "../scripts/contentEditor"

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

  if (!generatedLines.length) return (<></>)

  return (
    <>
      <select
        onChange={selectHandler}
        className="mr-3">
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
      <div className="row">
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

export default FieldEditor