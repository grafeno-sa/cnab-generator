import PropTypes from 'prop-types';
import RawLineDisplay from './RawLineDisplay';
import LineDetailsTable from './LineDetailsTable';
import { UI_TEXT } from '../../constants/cnabDeconstructor';

function LineDetails({ line }) {
  return (
    <div className="line-details">
      {line.error && (
        <div className="line-details__error">
          <strong>{UI_TEXT.errorLabel}</strong> {line.error}
        </div>
      )}

      <RawLineDisplay rawLine={line.rawLine} />

      <LineDetailsTable fields={line.fields} />
    </div>
  );
}

LineDetails.propTypes = {
  line: PropTypes.shape({
    error: PropTypes.string,
    rawLine: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
  }).isRequired,
};

export default LineDetails;
