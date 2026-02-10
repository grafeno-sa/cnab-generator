import PropTypes from 'prop-types';
import { UI_TEXT } from '../../constants/cnabDeconstructor';

function FileSummary({ summary }) {
  return (
    <div className="validation-rules">
      <h4>{UI_TEXT.summaryTitle}</h4>
      <div className="cnab-summary">
        <p><strong>{UI_TEXT.totalLinesLabel}</strong> {summary.totalLines}</p>
        <p><strong>{UI_TEXT.headerLabel}</strong> {summary.header}</p>
        <p><strong>{UI_TEXT.trailerLabel}</strong> {summary.trailer}</p>
        <p><strong>{UI_TEXT.registro1Label}</strong> {summary.registro1}</p>
        <p><strong>{UI_TEXT.registro2Label}</strong> {summary.registro2}</p>
        <p><strong>{UI_TEXT.registro3Label}</strong> {summary.registro3}</p>
        <p><strong>{UI_TEXT.registro7Label}</strong> {summary.registro7}</p>
        {summary.unknown > 0 && (
          <p className="cnab-summary__warning">
            <strong>{UI_TEXT.unknownLinesLabel}</strong> {summary.unknown}
          </p>
        )}
      </div>
    </div>
  );
}

FileSummary.propTypes = {
  summary: PropTypes.shape({
    totalLines: PropTypes.number.isRequired,
    header: PropTypes.number.isRequired,
    trailer: PropTypes.number.isRequired,
    registro1: PropTypes.number.isRequired,
    registro2: PropTypes.number.isRequired,
    registro3: PropTypes.number.isRequired,
    registro7: PropTypes.number.isRequired,
    unknown: PropTypes.number.isRequired,
  }).isRequired,
};

export default FileSummary;
