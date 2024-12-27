import PropTypes from 'prop-types';
import ContentFormatter from "../scripts/contentFormatter";

const CNABDownloader = ({ generatedLines }) => {
  const clickHandler = () => {
    const element = document.createElement("a")
    const fileName = `${new Date().getTime()} - cnab_${generatedLines.length}_linhas.txt`
    const content = ContentFormatter().format(generatedLines)
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
      className="btn btn-light">
      Baixar CNAB
    </button>
  )
}


CNABDownloader.propTypes = {
  generatedLines: PropTypes.array.isRequired,
};

export default CNABDownloader