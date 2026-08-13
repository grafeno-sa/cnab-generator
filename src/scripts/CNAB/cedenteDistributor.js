import generateOurNumber from './ourNumberGenerator'

export const MAX_CEDENTES = 10

const CedenteDistributor = () => {
  const validate = ({ generatedLines, cedentes }) => {
    if (!cedentes.length) {
      return { valid: false, message: 'Adicione ao menos um cedente' }
    }

    if (cedentes.some(cedente => !cedente.conta?.trim())) {
      return { valid: false, message: 'Preencha a conta de todos os cedentes' }
    }

    const registro1Count = generatedLines.filter(line => line.type === 'registro1').length

    if (registro1Count < cedentes.length) {
      return {
        valid: false,
        message: `É necessário ao menos 1 linha de registro1 por cedente `
          + `(${registro1Count} linha${registro1Count === 1 ? '' : 's'} para ${cedentes.length} cedentes)`
      }
    }

    return { valid: true }
  }

  // Blocos contíguos e do mesmo tamanho quanto possível; a sobra da divisão
  // inteira fica no último bloco.
  const blockSizes = (totalLines, cedentesCount) => {
    const baseSize = Math.floor(totalLines / cedentesCount)
    const sizes = new Array(cedentesCount).fill(baseSize)
    sizes[cedentesCount - 1] += totalLines % cedentesCount

    return sizes
  }

  const apply = ({ generatedLines, cedentes, settings }) => {
    const validation = validate({ generatedLines, cedentes })
    if (!validation.valid) return validation

    const registro1Count = generatedLines.filter(line => line.type === 'registro1').length
    const sizes = blockSizes(registro1Count, cedentes.length)

    let cedenteIndex = 0
    let remainingInBlock = sizes[0]
    const updatedLines = []

    generatedLines.forEach((line) => {
      if (line.type !== 'registro1') {
        updatedLines.push(line)
        return
      }

      while (remainingInBlock === 0 && cedenteIndex < cedentes.length - 1) {
        cedenteIndex += 1
        remainingInBlock = sizes[cedenteIndex]
      }

      const cedente = cedentes[cedenteIndex]
      const updatedLine = {
        ...line,
        numBancoCobrador: cedente.banco,
        contaBeneficiario: cedente.conta,
      }

      if (settings?.gerarNN) {
        updatedLine.ourNumber = generateOurNumber({ bankCode: cedente.banco, generatedLines: updatedLines })
      }

      updatedLines.push(updatedLine)
      remainingInBlock -= 1
    })

    return { valid: true, lines: updatedLines }
  }

  return { validate, apply, blockSizes }
}

export default CedenteDistributor
