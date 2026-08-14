import generateOurNumber from './ourNumberGenerator'

export const MAX_ASSIGNORS = 10

const AssignorDistributor = () => {
  const validate = ({ generatedLines, assignors }) => {
    if (!assignors.length) {
      return { valid: false, message: 'Adicione ao menos um cedente' }
    }

    if (assignors.some(assignor => !assignor.conta?.trim())) {
      return { valid: false, message: 'Preencha a conta de todos os cedentes' }
    }

    const registro1Count = generatedLines.filter(line => line.type === 'registro1').length

    if (registro1Count < assignors.length) {
      return {
        valid: false,
        message: `É necessário ao menos 1 linha de registro1 por cedente `
          + `(${registro1Count} linha${registro1Count === 1 ? '' : 's'} para ${assignors.length} cedentes)`
      }
    }

    return { valid: true }
  }

  // Blocos contíguos e do mesmo tamanho quanto possível; a sobra da divisão
  // inteira fica no último bloco.
  const blockSizes = (totalLines, assignorsCount) => {
    const baseSize = Math.floor(totalLines / assignorsCount)
    const sizes = new Array(assignorsCount).fill(baseSize)
    sizes[assignorsCount - 1] += totalLines % assignorsCount

    return sizes
  }

  const apply = ({ generatedLines, assignors, settings }) => {
    const validation = validate({ generatedLines, assignors })
    if (!validation.valid) return validation

    const registro1Count = generatedLines.filter(line => line.type === 'registro1').length
    const sizes = blockSizes(registro1Count, assignors.length)

    let assignorIndex = 0
    let remainingInBlock = sizes[0]
    const updatedLines = []

    generatedLines.forEach((line) => {
      if (line.type !== 'registro1') {
        updatedLines.push(line)
        return
      }

      while (remainingInBlock === 0 && assignorIndex < assignors.length - 1) {
        assignorIndex += 1
        remainingInBlock = sizes[assignorIndex]
      }

      const assignor = assignors[assignorIndex]
      const updatedLine = {
        ...line,
        numBancoCobrador: assignor.banco,
        contaBeneficiario: assignor.conta,
      }

      if (settings?.gerarNN) {
        updatedLine.ourNumber = generateOurNumber({ bankCode: assignor.banco, generatedLines: updatedLines })
      }

      updatedLines.push(updatedLine)
      remainingInBlock -= 1
    })

    return { valid: true, lines: updatedLines }
  }

  return { validate, apply, blockSizes }
}

export default AssignorDistributor
