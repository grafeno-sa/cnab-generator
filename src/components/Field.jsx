import PropTypes from "prop-types";
import { useState } from "react"

const Field = ({ field, setEditedFields }) => {
  const [currentLength, setCurrentLength] = useState(0)
  const [value, setValue] = useState('')

  const changeHandler = (e) => {
    setValue(e.target.value)
    setCurrentLength(e.target.value.length)
  }

  const updateEditedFields = (e) => {
    setEditedFields(prev => {
      if (!includesField(prev)) {
        const newEditedField = {
          name: field.name,
          value: e.target.value,
          index: prev.length
        }

        return [...prev, newEditedField]
      }
      else {
        const index = prev.find(f => f.name == field.name).index
        prev[index]['value'] = e.target.value
        return prev
      }
    })
  }

  const includesField = (fields) => {
    if (!fields.length) return false

    return !!fields.filter(f => f.name == field.name).length
  }

  return (
    <div className="col-3 pb-3">
      <label className="mr-2 bold mb-3">
        {field.description}
      </label>
      <br/>
      <input
        type="text"
        maxLength={field.maxLength}
        name={field.name}
        className="mr-3"
        onChange={changeHandler}
        onBlur={updateEditedFields}
        value={value}/>
      <br/>
      <small>qtd caracteres: {currentLength}{`${field.maxLength ? ('/' + field.maxLength) : ''}`}</small>
    </div>
  )
}

Field.propTypes = {
  field: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      defaultValue: PropTypes.func.isRequired,
      startIndex: PropTypes.number,
      endIndex: PropTypes.number,
      maxLength: PropTypes.number,
    }),
  setEditedFields: PropTypes.func.isRequired,
};

export default Field