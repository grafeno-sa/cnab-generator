import { useState } from 'react';
import { parseFile } from '../scripts/CNAB/cnabParser';
import FileUpload from '../components/CNAB/FileUpload';
import PageHeader from '../components/CnabDeconstructor/PageHeader';
import ParsedDataView from '../components/CnabDeconstructor/ParsedDataView';
import EmptyState from '../components/CnabDeconstructor/EmptyState';
import { Toast } from '../vendors/swal/toast';
import { 
  ACCEPTED_FILE_EXTENSIONS, 
  UI_TEXT, 
  TOAST_MESSAGES 
} from '../constants/cnabDeconstructor';
import '../styles/components/CnabValidator.css';
import '../styles/components/CnabDeconstructor.css';

function CnabDeconstructor() {
  const [parsedData, setParsedData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileLoaded = (content) => {
    const parsed = parseFile(content);
    setParsedData(parsed);
    
    const { icon, title, getText } = TOAST_MESSAGES.fileLoaded;
    Toast.fire({
      icon,
      title,
      text: getText(parsed.summary.totalLines)
    });
  };

  return (
    <div className="container">
      <PageHeader title={UI_TEXT.pageTitle} subtitle={UI_TEXT.pageSubtitle} />

      <div className="row mb-3">
        <div className="col-12">
          <FileUpload
            onFileLoaded={handleFileLoaded}
            fileName={fileName}
            setFileName={setFileName}
            acceptedExtensions={ACCEPTED_FILE_EXTENSIONS}
            buttonText={UI_TEXT.buttonText}
            buttonTextWithFile={UI_TEXT.buttonTextWithFile}
          />
        </div>
      </div>

      {parsedData ? (
        <ParsedDataView parsedData={parsedData} />
      ) : (
        <EmptyState message={UI_TEXT.emptyStateMessage} />
      )}
    </div>
  );
}

export default CnabDeconstructor;
