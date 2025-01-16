import PropTypes from 'prop-types';

const Downloader = ({ generatedLines, formatter, type }) => {
  const clickHandler = () => {
    const element = document.createElement("a")
    const fileName = `${new Date().getTime()} - ${type.toLowerCase()}_${generatedLines.length}_linhas.txt`
    const content = formatter().format(generatedLines)
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    )
    element.setAttribute("download", fileName)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <button
      onClick={clickHandler}
      className="btn btn-primary">
      Baixar {type.toUpperCase()}
    </button>
  )
}


Downloader.propTypes = {
  generatedLines: PropTypes.array.isRequired,
  formatter: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Downloader