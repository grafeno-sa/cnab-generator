import PropTypes from "prop-types";
import { useState } from "react"

const Field = ({ field, setEditedFields }) => {
  const hasOptions = Array.isArray(field.options) && field.options.length > 0

  const [currentLength, setCurrentLength] = useState(0)
  // Select inicia exibindo o defaultValue do campo (o valor que será gerado se
  // não for tocado), evitando divergência com as options. Input inicia vazio.
  const [value, setValue] = useState(() => {
    if (!hasOptions) return ''
    try {
      return String(field.defaultValue({ generatedLines: [] }) ?? '')
    } catch {
      return ''
    }
  })
  const [touched, setTouched] = useState(false)

  const changeHandler = (e) => {
    setValue(e.target.value)
    setCurrentLength(e.target.value.length)
    setTouched(true)
  }

  // Input de texto: só registra no blur se o campo tiver sido tocado.
  const updateEditedFields = (e) => {
    if (!touched) return

    registerValue(e.target.value)
  }

  // Select: registra o valor no próprio onChange (não depende de blur nem
  // do estado assíncrono `touched`).
  const selectChangeHandler = (e) => {
    setValue(e.target.value)
    setTouched(true)
    registerValue(e.target.value)
  }

  const registerValue = (newValue) => {
    setEditedFields(prev => {
      if (!includesField(prev)) {
        const newEditedField = {
          name: field.name,
          value: newValue,
          index: prev.length
        }

        return [...prev, newEditedField]
      }
      else {
        const index = prev.find(f => f.name == field.name).index
        prev[index]['value'] = newValue
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
      {hasOptions ? (
        <select
          name={field.name}
          className="mr-3 field-select"
          onChange={selectChangeHandler}
          value={value}
          title={field.options.find(o => o.value === value)?.label}>
          {field.options.map((option) => (
            <option value={option.value} key={option.value} title={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <>
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
        </>
      )}
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
      options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })),
    }),
  setEditedFields: PropTypes.func.isRequired,
};

export default Field