import PropTypes from 'prop-types';
import { UI_TEXT } from '../../constants/cnabDeconstructor';

function LineDetailsTable({ fields }) {
  if (fields.length === 0) {
    return null;
  }

  return (
    <div>
      <strong className="line-details__label">{UI_TEXT.extractedFieldsLabel}</strong>
      <table className="fields-table">
        <thead className="fields-table__header">
          <tr>
            <th>
              {UI_TEXT.fieldColumnLabel}
            </th>
            <th>
              {UI_TEXT.descriptionColumnLabel}
            </th>
            <th className="fields-table__cell--center">
              {UI_TEXT.positionColumnLabel}
            </th>
            <th>
              {UI_TEXT.valueColumnLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, fieldIndex) => (
            <tr key={fieldIndex} className={fieldIndex % 2 === 0 ? 'fields-table__row--even' : 'fields-table__row--odd'}>
              <td className="fields-table__cell--monospace">
                {field.name}
              </td>
              <td className="fields-table__cell--description">
                {field.description}
              </td>
              <td className="fields-table__cell--center fields-table__cell--monospace">
                {field.startIndex}-{field.endIndex} ({field.length})
              </td>
              <td className={`fields-table__value ${field.display ? 'fields-table__value--filled' : ''}`}>
                {field.display || <em className="fields-table__value--empty">{UI_TEXT.emptyValueLabel}</em>}
                {field.raw !== field.display && (
                  <span className="fields-table__raw-indicator">
                    {UI_TEXT.rawValuePrefix}{field.raw}&quot;)
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

LineDetailsTable.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      startIndex: PropTypes.number.isRequired,
      endIndex: PropTypes.number.isRequired,
      length: PropTypes.number.isRequired,
      display: PropTypes.string,
      raw: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LineDetailsTable;
