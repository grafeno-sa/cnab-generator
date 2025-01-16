import { useState } from 'react'
import CNABPreview from '../components/CSV/CSVPreview';
import LineGenerator from '../components/CSV/LineGenerator';

function Csv() {
  const [generatedLines, setGeneratedLines] = useState([])

  return (
    <div className="container">
      <div className='row pb-2'>
        { [1, 10, 100, 1000, 15000, 50000].map(quantity => (
            <div className='col-2' key={quantity}>
              <LineGenerator
                quantity={quantity}
                stateHook={{generatedLines, setGeneratedLines}}/>
            </div>
        )) }
      </div>
      <p>
        <span className='mr-3'>
          Total de linhas: {generatedLines.length}
        </span>
      </p>

      <CNABPreview generatedLines={generatedLines}/>
    </div>
  )
}

export default Csv;