import PropTypes from 'prop-types';
import Accordeon from '../Accordeon';
import FileSummary from './FileSummary';
import LineTitle from './LineTitle';
import LineDetails from './LineDetails';
import { UI_TEXT } from '../../constants/cnabDeconstructor';

function ParsedDataView({ parsedData }) {
  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <FileSummary summary={parsedData.summary} />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h4 className="mb-3">{UI_TEXT.detailsTitle}</h4>
          {parsedData.lines.map((line, index) => (
            <Accordeon 
              key={index}
              title={<LineTitle lineType={line.lineType} lineNumber={line.lineNumber} hasError={!!line.error} />}
              content={<LineDetails line={line} />}
            />
          ))}
        </div>
      </div>
    </>
  );
}

ParsedDataView.propTypes = {
  parsedData: PropTypes.shape({
    summary: PropTypes.object.isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        lineType: PropTypes.string.isRequired,
        lineNumber: PropTypes.number.isRequired,
        error: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default ParsedDataView;
