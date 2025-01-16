import PropTypes from "prop-types";
import ContentFormatter from "../../scripts/CSV/contentFormatter";

import '../../styles/components/CSVPreview.css';

const CSVPreview = ({ generatedLines }) => {
  if (generatedLines.length >= 50000) {
    return (
      <textarea
        value={'Preview desligado por questões de performance'}
        className="csv-preview"
        readOnly/>
    )
  }
  return (
    <textarea
      value={ContentFormatter().format(generatedLines)}
      className="csv-preview"
      readOnly/>
  )
}

CSVPreview.propTypes = {
  generatedLines: PropTypes.array.isRequired,
};

export default CSVPreview