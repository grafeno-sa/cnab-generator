import PropTypes from "prop-types";

import '../styles/components/Preview.css';

const Preview = ({ generatedLines, formatter }) => {
  if (generatedLines.length >= 50000) {
    return (
      <textarea
        value={'Preview desligado por questões de performance'}
        className="preview"
        readOnly/>
    )
  }
  return (
    <textarea
      value={formatter().format(generatedLines)}
      className="preview"
      readOnly/>
  )
}

Preview.propTypes = {
  generatedLines: PropTypes.array.isRequired,
  formatter: PropTypes.func.isRequired
};

export default Preview