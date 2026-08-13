import PropTypes from 'prop-types'
import { BANK_OPTIONS } from '../../scripts/CNAB/fieldTranslations'
import CedenteDistributor, { MAX_CEDENTES } from '../../scripts/CNAB/cedenteDistributor'
import { Toast } from '../../vendors/swal/toast'

const DEFAULT_BANK_CODE = '310'

const CedenteEditor = ({ cedentes, setCedentes, generatedLines, setGeneratedLines, settings }) => {
  const addCedente = () => {
    if (cedentes.length >= MAX_CEDENTES) return

    setCedentes(prev => [...prev, { banco: DEFAULT_BANK_CODE, conta: '' }])
  }

  const removeCedente = (index) => {
    setCedentes(prev => prev.filter((_, i) => i !== index))
  }

  const updateCedente = (index, field, value) => {
    setCedentes(prev => prev.map((cedente, i) => (i === index ? { ...cedente, [field]: value } : cedente)))
  }

  const applyDistribution = () => {
    const result = CedenteDistributor().apply({ generatedLines, cedentes, settings })

    if (!result.valid) {
      Toast.fire({ icon: 'warning', title: result.message })
      return
    }

    setGeneratedLines(result.lines)
    Toast.fire({ icon: 'success', title: 'Distribuição aplicada com sucesso!' })
  }

  return (
    <div className='cedente-editor'>
      <p className='bold mb-3'>Cedentes (Multicedente)</p>

      {cedentes.map((cedente, index) => (
        <div className='cedente-row' key={index}>
          <span>{`Cedente ${index + 1}`}</span>

          <select
            value={cedente.banco}
            onChange={(e) => updateCedente(index, 'banco', e.target.value)}>
            {BANK_OPTIONS.map(option => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>

          <input
            type='text'
            placeholder='Conta'
            maxLength={8}
            value={cedente.conta}
            onChange={(e) => updateCedente(index, 'conta', e.target.value)}/>

          <button
            onClick={() => removeCedente(index)}
            className='btn btn-danger btn-remove-cedente'
            aria-label={`Remover cedente ${index + 1}`}>
            x
          </button>
        </div>
      ))}

      <div className='cedente-row'>
        <button
          onClick={addCedente}
          disabled={cedentes.length >= MAX_CEDENTES}
          className='btn btn-light'>
          Adicionar Cedente
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

CedenteEditor.propTypes = {
  cedentes: PropTypes.arrayOf(PropTypes.shape({
    banco: PropTypes.string.isRequired,
    conta: PropTypes.string.isRequired,
  })).isRequired,
  setCedentes: PropTypes.func.isRequired,
  generatedLines: PropTypes.array.isRequired,
  setGeneratedLines: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    gerarNN: PropTypes.bool,
    multicedente: PropTypes.bool,
  }),
}

export default CedenteEditor
