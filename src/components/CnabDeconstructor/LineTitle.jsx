import PropTypes from 'prop-types';
import { LINE_TYPE_LABELS, UI_TEXT } from '../../constants/cnabDeconstructor';

function LineTitle({ lineType, lineNumber, hasError }) {
  return (
    <div className="line-title">
      <span className={`line-title__indicator line-title__indicator--${lineType}`}></span>
      <strong>{UI_TEXT.lineLabel} {lineNumber}:</strong>
      <span>{LINE_TYPE_LABELS[lineType] || lineType}</span>
      {hasError && <span className="line-title__error">⚠️</span>}
    </div>
  );
}

LineTitle.propTypes = {
  lineType: PropTypes.string.isRequired,
  lineNumber: PropTypes.number.isRequired,
  hasError: PropTypes.bool,
};

export default LineTitle;
