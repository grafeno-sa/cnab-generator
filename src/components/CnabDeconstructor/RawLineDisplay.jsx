import PropTypes from 'prop-types';
import { UI_TEXT } from '../../constants/cnabDeconstructor';

function RawLineDisplay({ rawLine }) {
  return (
    <div className="line-details__section">
      <strong className="line-details__label">
        {UI_TEXT.completeLineLabel} ({rawLine.length} {UI_TEXT.charactersLabel}):
      </strong>
      <div className="code-block">
        {rawLine}
      </div>
    </div>
  );
}

RawLineDisplay.propTypes = {
  rawLine: PropTypes.string.isRequired,
};

export default RawLineDisplay;
