import PropTypes from "prop-types";
import { Toast } from "../../vendors/swal/toast"

import LineGenerationValidator from "../../scripts/CNAB/lineGenerationValidator"
import generateLine from "../../scripts/CNAB/lineFactory"

const LineGenerator = ({ type, quantity, stateHook }) => {
  const { generatedLines, setGeneratedLines } = stateHook

  const clickHandler = () => {
    const isValidGeneration = LineGenerationValidator().validate({ generatedLines, type })
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
        const newLine = generateLine({ type, generatedLines: lines })
        newLines.push(newLine)
      }
      catch (e) {
        console.error(e)
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
      className="btn btn-light">
        <span>{`Adicionar ${quantity} linha${quantity == 1 ? '' : 's'} de `}</span>
        <span className="bold">{type}</span>
    </button>
  )
}

LineGenerator.propTypes = {
  type: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  stateHook: PropTypes.shape({
    generatedLines: PropTypes.array.isRequired,
    setGeneratedLines: PropTypes.func.isRequired,
  })
};

export default LineGenerator;