import { useState } from 'react'
import LineGenerator from '../components/CNAB/LineGenerator';
import Cleaner from '../components/Cleaner';
import Preview from '../components/Preview';
import FieldEditor from '../components/CNAB/FieldEditor';
import ContentFormatter from "../scripts/CNAB/contentFormatter";
import Downloader from '../components/Downloader';
import AccordionItem from '../components/Accordeon';

function Cnab() {
  const [generatedLines, setGeneratedLines] = useState([])

  return (
    <>
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
          <Cleaner setGeneratedLines={setGeneratedLines}/>
          <Downloader
            generatedLines={generatedLines}
            type={"cnab"}
            formatter={ContentFormatter} />
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

      <Preview
        generatedLines={generatedLines}
        formatter={ContentFormatter} />
    </>
  )
}

export default Cnab;