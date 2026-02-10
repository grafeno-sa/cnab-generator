import PropTypes from 'prop-types';
import { Toast } from '../../vendors/swal/toast';

function FileUpload({ 
  onFileLoaded, 
  fileName, 
  setFileName, 
  acceptedExtensions = ['txt', 'rem'],
  buttonText = 'Selecionar Arquivo',
  buttonTextWithFile = 'Selecionar Outro Arquivo'
}) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!acceptedExtensions.includes(fileExtension)) {
      const extensionList = acceptedExtensions.map(ext => `.${ext}`).join(', ');
      Toast.fire({
        icon: 'error',
        title: 'Tipo de arquivo inválido',
        text: `Por favor, selecione um arquivo ${extensionList}`
      });
      event.target.value = null; // Reset input
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onFileLoaded(content);
    };

    reader.readAsText(file);
    
    // Reset the input so the same file can be uploaded again
    event.target.value = null;
  };

  const acceptAttribute = acceptedExtensions.map(ext => `.${ext}`).join(',');

  return (
    <div className="file-upload-section">
      <input
        type="file"
        accept={acceptAttribute}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="cnab-file-input"
      />
      <label 
        htmlFor="cnab-file-input" 
        className="file-upload-label"
      >
        {fileName ? buttonTextWithFile : buttonText}
      </label>
      {fileName && (
        <p className="file-name-display">
          Arquivo: {fileName}
        </p>
      )}
    </div>
  );
}

FileUpload.propTypes = {
  onFileLoaded: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
  setFileName: PropTypes.func.isRequired,
  acceptedExtensions: PropTypes.arrayOf(PropTypes.string),
  buttonText: PropTypes.string,
  buttonTextWithFile: PropTypes.string,
};

export default FileUpload;
