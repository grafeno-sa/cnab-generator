import { useState } from "react"
import PropTypes from "prop-types";
import Field from "../Field"
import getLineFields from "../../scripts/CNAB/lineFields"
import ContentEditor from "../../scripts/CNAB/contentEditor"
import AccordionItem from "../Accordeon";
import LineSelector from "./LineSelector";

const FieldEditor = ({ generatedLines, setGeneratedLines }) => {
  const editableTypes = ['header', 'registro1', 'registro2', 'registro3', 'registro7', 'trailer']
  const [recordType, setRecordType] = useState('registro1')
  const [fieldOptions, setFieldOptions] = useState(getLineFields('registro1'))
  const [editedFields, setEditedFields] = useState([])
  const [selectedLineIndex, setSelectedLineIndex] = useState(null)

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

  const handleEditByIndex = () => {
    if (selectedLineIndex === null) {
      alert('Por favor, selecione uma linha primeiro');
      return;
    }
    
    if (!editedFields.length) {
      alert('Por favor, preencha os campos que deseja editar');
      return;
    }
    
    const editedLines = ContentEditor().editByIndex({ 
      generatedLines, 
      editedFields, 
      lineIndex: selectedLineIndex 
    });
    setGeneratedLines(() => [...editedLines]);
    setEditedFields([]);
  }

  const handleEditLastLine = () => {
    const editedLines = ContentEditor().deleteLast({ generatedLines, editedFields, recordType })
    setGeneratedLines(() => [...editedLines])
  }

  const buttons = () => {
    if (!generatedLines.length) return (<></>)

    return (
      <>
        <LineSelector
          generatedLines={generatedLines}
          selectedLineIndex={selectedLineIndex}
          setSelectedLineIndex={setSelectedLineIndex}
          onLineSelected={(lineType) => {
            setRecordType(lineType);
            setFieldOptions(getLineFields(lineType));
            setEditedFields([]);
          }}
        />
        
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
            onClick={handleEditByIndex}
            className="btn btn-primary"
            disabled={selectedLineIndex === null}>
            Editar linha selecionada
          </button>
          <button
            onClick={handleEditLastLine}
            className="btn btn-danger">
            Remover a última linha
          </button>
        </div>
      </>
    )
  }

  const defaultContent = () => {
    return (
      <>
        <p>
          Adicione dados para editar
        </p>
      </>
    )
  }

  const content = () => {
    if (!generatedLines.length) return defaultContent()

    return (
      <div className="row mt-3">
        {fieldOptions.map((field) => (
          <Field
            field={field}
            key={field.name}
            setEditedFields={setEditedFields}/>
        ))}
      </div>
    )
  }

  return (
    <>
      {buttons()}
      <AccordionItem
                title={'Editar dados'}
                content={content()} />
    </>
  )
}

FieldEditor.propTypes = {
  generatedLines: PropTypes.array.isRequired,
  setGeneratedLines: PropTypes.func.isRequired,
};

export default FieldEditor