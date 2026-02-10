import PropTypes from 'prop-types';

function EmptyState({ message }) {
  return (
    <div className="row">
      <div className="col-12 empty-state">
        <p>{message}</p>
      </div>
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyState;
