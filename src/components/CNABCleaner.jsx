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

export default CNABCleaner