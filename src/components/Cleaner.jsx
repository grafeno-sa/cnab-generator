import PropTypes from 'prop-types';

const Cleaner = ({ setGeneratedLines }) => {
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

Cleaner.propTypes = {
  setGeneratedLines: PropTypes.func.isRequired,
};

export default Cleaner