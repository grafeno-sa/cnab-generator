import { useState } from "react"
import PropTypes from "prop-types";
import Field from "../Field"
import ContentEditor from "../../scripts/CSV/contentEditor"
import CSV_LINE_FIELDS from "../../scripts/CSV/lineFields"
import CSV_CATEGORY_DATA_CATEGORIES from "../../scripts/CSV/categoryTranslation"
import AccordionItem from "../Accordeon"

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

  const defaultContent = () => {
    return (
      <>
        <p>
          Adicione dados para editar
        </p>
      </>
    )
  }

  const content = ({ category }) => {
    if (!generatedLines.length) return defaultContent()

    return (
      <>
        <div className="row w-100">
          {
            CSV_LINE_FIELDS.filter((field) => (field.category === category))
              .map((field, index) => (
                <Field
                  field={field}
                  key={index}
                  setEditedFields={setEditedFields}/>
          ))}
        </div>
      </>
    )
  }

  const buttons = () => {
    if (!generatedLines.length) return (<></>)
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
      </>
    )
  }

  return (
    <>
      {buttons()}
      {Object.keys(CSV_CATEGORY_DATA_CATEGORIES).map((category, index) => (
        <div className="row w-100" key={index}>
            <div className="col-12">
              <AccordionItem
                title={'Editar dados ' + CSV_CATEGORY_DATA_CATEGORIES[category]}
                content={content({category})}
                key={index} />
            </div>
        </div>
      ))}
    </>
  )
}

FieldEditor.propTypes = {
  generatedLines: PropTypes.array.isRequired,
  setGeneratedLines: PropTypes.func.isRequired,
};

export default FieldEditor