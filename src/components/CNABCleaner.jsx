import PropTypes from 'prop-types';

const CNABCleaner = ({ setGeneratedLines }) => {
  const clickHandler = () => {
    setGeneratedLines([])
  }

  return (
    <button
      onClick={clickHandler}
      className='btn btn-danger'>
      Limpar
    </button>
  )
}

CNABCleaner.propTypes = {
  setGeneratedLines: PropTypes.func.isRequired,
};

export default CNABCleaner