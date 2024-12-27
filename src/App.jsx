import { useState } from 'react'
import './App.css'

import LineGenerator from './components/LineGenerator';
import CNABCleaner from './components/CNABCleaner';
import CNABPreview from './components/CNABPreview';
import CNABDownloader from './components/CNABDownloader';
import FieldEditor from './components/FieldEditor';

function App() {
  const [generatedLines, setGeneratedLines] = useState([])
  const [wallet, setWallet] = useState('01')
  

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
                wallet={wallet}
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
            wallet={wallet}
            stateHook={{generatedLines, setGeneratedLines}}/>
        </div>
        
        <div className='col-3'>
          <LineGenerator
            type='registro3'
            quantity={1}
            wallet={wallet}
            stateHook={{generatedLines, setGeneratedLines}}/>
        </div>

        <div className='col-3'>
          <LineGenerator
            type='registro7'
            quantity={1}
            wallet={wallet}
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
        <span>
          <label className='mr-1'>Carteira</label>
          <input
            type="text"
            defaultValue={wallet}
            onChange={(e) => setWallet(e.target.value)} />
        </span>
      </p>

      <div className='pb-5'>
        <FieldEditor
          generatedLines={generatedLines}
          setGeneratedLines={setGeneratedLines}/>
      </div>

      <CNABPreview generatedLines={generatedLines}/>
    </div>
  );
}

export default App
