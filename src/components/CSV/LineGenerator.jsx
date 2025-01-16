import PropTypes from "prop-types";
import { Toast } from "../../vendors/swal/toast"

import generateLine from "../../scripts/CSV/lineFactory"

const LineGenerator = ({ quantity, stateHook }) => {
  const { generatedLines, setGeneratedLines } = stateHook

  const clickHandler = () => {
    let newLines = []

    for (let i = 1; i <= quantity; i++) {
      try{
        const newLine = generateLine({ generatedLines })
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
        <span>{`Adicionar ${quantity} linha${quantity == 1 ? '' : 's'}`}</span>
    </button>
  )
}

LineGenerator.propTypes = {
  quantity: PropTypes.number.isRequired,
  stateHook: PropTypes.shape({
    generatedLines: PropTypes.array.isRequired,
    setGeneratedLines: PropTypes.func.isRequired,
  })
};

export default LineGenerator;