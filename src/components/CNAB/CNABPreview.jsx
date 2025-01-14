import PropTypes from "prop-types";
import ContentFormatter from "../scripts/CNAB/contentFormatter";

import '../styles/components/CNABPreview.css';

const CNABPreview = ({ generatedLines }) => {
  if (generatedLines.length >= 50000) {
    return (
      <textarea
        value={'Preview desligado por questões de performance'}
        className="cnab-preview"
        readOnly/>
    )
  }
  return (
    <textarea
      value={ContentFormatter().format(generatedLines)}
      className="cnab-preview"
      readOnly/>
  )
}

CNABPreview.propTypes = {
  generatedLines: PropTypes.array.isRequired,
};

export default CNABPreview