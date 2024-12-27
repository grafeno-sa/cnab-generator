import React, { useState } from "react"
import doesValueExist from "../scripts/doesValueExist"

const Field = ({ field, setEditedFields }) => {
  const [currentLength, setCurrentLength] = useState(0)
  const [value, setValue] = useState('')

  const changeHandler = (e) => {
    if (doesValueExist(e.target.value)) {
      setValue(e.target.value)
      setCurrentLength(e.target.value.length)
    } else {
      setValue('')
      setCurrentLength(0)
    }
  }

  const updateEditedFields = (e) => {
    setEditedFields(prev => {
      if(!doesValueExist(e.target.value)) return prev

      const newEditedField = {
        name: field.name,
        value: e.target.value,
        index: prev.length
      }

      if (!includesField(prev)) {
        return [...prev, newEditedField]
      }
      else {
        const index = prev.find(f => f.name == field.name).index
        prev[index] = newEditedField
        return prev
      }
    })
  }

  const includesField = (fields) => {
    if (!fields.length) return false;

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
      <small>qtd caracteres: {currentLength}/{field.maxLength}</small>
    </div>
  )
}

export default Field