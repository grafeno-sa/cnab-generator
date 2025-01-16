import { useState } from 'react'
import LineGenerator from '../components/CSV/LineGenerator';
import Cleaner from '../components/Cleaner';
import ContentFormatter from '../scripts/CSV/contentFormatter';
import Downloader from '../components/Downloader';
import Preview from '../components/Preview';

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

       <div className='row flex-end'>
          <div className='col-12 container'>
            <Cleaner setGeneratedLines={setGeneratedLines}/>
            <Downloader
              generatedLines={generatedLines}
              type={"csv"}
              formatter={ContentFormatter} />
          </div>
        </div>

      <p>
        <span className='mr-3'>
          Total de linhas: {generatedLines.length}
        </span>
      </p>

      <Preview
        generatedLines={generatedLines}
        formatter={ContentFormatter} />
    </div>
  )
}

export default Csv;