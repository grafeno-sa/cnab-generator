import PropTypes from 'prop-types'
import { BANK_OPTIONS } from '../../scripts/CNAB/fieldTranslations'
import AssignorDistributor, { MAX_ASSIGNORS } from '../../scripts/CNAB/assignorDistributor'
import { Toast } from '../../vendors/swal/toast'

const DEFAULT_BANK_CODE = '310'

const AssignorEditor = ({ assignors, setAssignors, generatedLines, setGeneratedLines, settings }) => {
  const addAssignor = () => {
    if (assignors.length >= MAX_ASSIGNORS) return

    setAssignors(prev => [...prev, { banco: DEFAULT_BANK_CODE, conta: '' }])
  }

  const removeAssignor = (index) => {
    setAssignors(prev => prev.filter((_, i) => i !== index))
  }

  const updateAssignor = (index, field, value) => {
    setAssignors(prev => prev.map((assignor, i) => (i === index ? { ...assignor, [field]: value } : assignor)))
  }

  const applyDistribution = () => {
    const result = AssignorDistributor().apply({ generatedLines, assignors, settings })

    if (!result.valid) {
      Toast.fire({ icon: 'warning', title: result.message })
      return
    }

    setGeneratedLines(result.lines)
    Toast.fire({ icon: 'success', title: 'Distribuição aplicada com sucesso!' })
  }

  return (
    <div className='assignor-editor'>
      <p className='bold mb-3'>Assignors (Multicedente)</p>

      {assignors.map((assignor, index) => (
        <div className='assignor-row' key={index}>
          <span>{`Assignor ${index + 1}`}</span>

          <select
            value={assignor.banco}
            onChange={(e) => updateAssignor(index, 'banco', e.target.value)}>
            {BANK_OPTIONS.map(option => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>

          <input
            type='text'
            placeholder='Conta'
            maxLength={8}
            value={assignor.conta}
            onChange={(e) => updateAssignor(index, 'conta', e.target.value)}/>

          <button
            onClick={() => removeAssignor(index)}
            className='btn btn-danger btn-remove-assignor'
            aria-label={`Remover assignor ${index + 1}`}>
            x
          </button>
        </div>
      ))}

      <div className='assignor-row'>
        <button
          onClick={addAssignor}
          disabled={assignors.length >= MAX_ASSIGNORS}
          className='btn btn-light'>
          Adicionar Assignor
        </button>

        <button
          onClick={applyDistribution}
          className='btn btn-primary'>
          Aplicar distribuição multicedente
        </button>
      </div>
    </div>
  )
}

AssignorEditor.propTypes = {
  assignors: PropTypes.arrayOf(PropTypes.shape({
    banco: PropTypes.string.isRequired,
    conta: PropTypes.string.isRequired,
  })).isRequired,
  setAssignors: PropTypes.func.isRequired,
  generatedLines: PropTypes.array.isRequired,
  setGeneratedLines: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    gerarNN: PropTypes.bool,
    multicedente: PropTypes.bool,
  }),
}

export default AssignorEditor
