import React from "react"
import { Toast } from "../vendors/swal/toast"

import LineGenerationValidator from "../scripts/lineGenerationValidator"
import generateLine from "../scripts/lineFactory"

const LineGenerator = ({ type, quantity, stateHook, wallet }) => {
  const { generatedLines, setGeneratedLines } = stateHook

  const clickHandler = () => {
    const isValidGeneration = LineGenerationValidator().validate({ generatedLines, type })
    console.log(isValidGeneration)
    if (!isValidGeneration.valid) {
      Toast.fire({
        icon: "warning",
        title: isValidGeneration.message
      });

      return
    }

    let newLines = []

    for (let i = 1; i <= quantity; i++) {
      try{
        const lines = type === 'registro1' ? [...generatedLines, ...newLines] : generatedLines
        const newLine = generateLine({ type, generatedLines: lines, wallet })
        newLines.push(newLine)
      }
      catch (error) {
        Toast.fire({
          icon: "error",
          title: 'Houve um erro. Favor tentar novamente.'
        });
      }
    }

    setGeneratedLines((prev) => [...prev, ...newLines])
  }

  return (
    <button
      onClick={clickHandler}
      className="btn btn-primary">
        <span>{`Adicionar ${quantity} linha${quantity == 1 ? '' : 's'} de `}</span>
        <span className="bold">{type}</span>
    </button>
  )
}

export default LineGenerator;