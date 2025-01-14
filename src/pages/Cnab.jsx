import { useState } from 'react'
import LineGenerator from '../components/CNAB/LineGenerator';
import CNABCleaner from '../components/CNAB/CNABCleaner';
import CNABPreview from '../components/CNAB/CNABPreview';
import CNABDownloader from '../components/CNAB/CNABDownloader';
import FieldEditor from '../components/CNAB/FieldEditor';

function Cnab() {
  const [generatedLines, setGeneratedLines] = useState([])

  return (
    <div className="container">
      <div className="row">
        <p className='bold text-center ml-2'>Registro 1</p>
      </div>
      <div className='row pb-2'>
        { [1, 10, 100, 1000, 15000, 50000].map(quantity => (
            <div className='col-3' key={quantity}>
              <LineGenerator
                type='registro1'
                quantity={quantity}
                stateHook={{generatedLines, setGeneratedLines}}/>
            </div>
        )) }
      </div>

      <div className="row">
        <p className='bold text-center ml-2'>Registros Complementares</p>
      </div>
      <div className="row">
        <div className='col-3'>
          <LineGenerator
            type='registro2'
            quantity={1}
            stateHook={{generatedLines, setGeneratedLines}}/>
        </div>
        
        <div className='col-3'>
          <LineGenerator
            type='registro3'
            quantity={1}
            stateHook={{generatedLines, setGeneratedLines}}/>
        </div>

        <div className='col-3'>
          <LineGenerator
            type='registro7'
            quantity={1}
            stateHook={{generatedLines, setGeneratedLines}}/>
        </div>
      </div>

      <div className='row flex-end'>
        <div className='col-12 container'>
          <CNABCleaner setGeneratedLines={setGeneratedLines}/>
          <CNABDownloader
            generatedLines={generatedLines} />
        </div>
      </div>

      <p>
        <span className='mr-3'>
          Total de linhas: {generatedLines.length}
        </span>
      </p>

      <div className='pb-5'>
        <FieldEditor
          generatedLines={generatedLines}
          setGeneratedLines={setGeneratedLines}/>
      </div>

      <CNABPreview generatedLines={generatedLines}/>
    </div>
  )
}

export default Cnab;