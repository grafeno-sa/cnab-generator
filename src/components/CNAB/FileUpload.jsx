import { Toast } from '../../vendors/swal/toast';

function FileUpload({ onFileLoaded, fileName, setFileName }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Check file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'txt' && fileExtension !== 'rem') {
      Toast.fire({
        icon: 'error',
        title: 'Tipo de arquivo inválido',
        text: 'Por favor, selecione um arquivo .txt ou .rem'
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

  return (
    <div className="file-upload-section">
      <input
        type="file"
        accept=".txt,.rem"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="cnab-file-input"
      />
      <label 
        htmlFor="cnab-file-input" 
        className="file-upload-label"
      >
        {fileName ? 'Validar Outro Arquivo' : 'Selecionar Arquivo'}
      </label>
      {fileName && (
        <p className="file-name-display">
          Arquivo: {fileName}
        </p>
      )}
    </div>
  );
}

export default FileUpload;
