import { useState } from 'react';
import { Toast } from '../vendors/swal/toast';
import CnabValidator from '../components/CNAB/Validator';
import FileUpload from '../components/CNAB/FileUpload';
import Result from '../components/CNAB/validation/Result';
import Rules from '../components/CNAB/validation/Rules';
import '../styles/components/CnabValidator.css';

function Cnab400Validator() {
  const [validationResult, setValidationResult] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileLoaded = (content) => {
    setValidationResult(null); // Reset previous validation result

    const result = CnabValidator(content, '400', [400, 444]);
    setValidationResult(result);

    if (result.isValid) {
      Toast.fire({
        icon: 'success',
        title: 'Arquivo válido!',
        text: 'O arquivo CNAB passou em todas as validações'
      });
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Validação falhou',
        text: `${result.errors.length} erro(s) encontrado(s)`
      });
    }
  };

  const validationRules = [
    'O arquivo deve ter extensão .txt ou .rem',
    'Todas as linhas devem ter exatamente 400 ou 444 caracteres',
    'Todas as linhas devem ter o mesmo tamanho',
    'A primeira linha (header) deve começar com &apos;0&apos;',
    'A última linha (trailer) deve começar com &apos;9&apos;',
    'As linhas intermediárias (registros) devem começar com &apos;1&apos;, &apos;2&apos;, &apos;3&apos; ou &apos;7&apos;',
    'Registros &apos;2&apos;, &apos;3&apos; e &apos;7&apos; devem ser precedidos por um registro &apos;1&apos;',
    'Registros não podem se repetir (exceto registro &apos;1&apos; que pode repetir)'
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-3">Validador CNAB 400/444</h2>
          <p className="text-center mb-3">
            Faça upload de um arquivo .txt ou .rem para validar sua estrutura
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <FileUpload 
            onFileLoaded={handleFileLoaded}
            fileName={fileName}
            setFileName={setFileName}
            buttonText="Selecionar Arquivo"
            buttonTextWithFile="Validar Outro Arquivo"
          />
        </div>
      </div>

      <Result result={validationResult} />

      <Rules rules={validationRules} />
    </div>
  );
}

export default Cnab400Validator;