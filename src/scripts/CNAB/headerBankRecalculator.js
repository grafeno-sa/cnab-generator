import generateOurNumber from './ourNumberGenerator'

// Quando o banco do header muda depois que registro1 já tiveram o Nosso
// Número calculado, os NNs existentes ficam presos no banco anterior (base e
// faixa numérica são específicas de cada banco). Regenera cada um com o novo
// bankCode, no mesmo espírito do que já é feito em assignorDistributor.apply().
const recalculateOurNumbers = ({ generatedLines, bankCode }) => {
  const updatedLines = []

  generatedLines.forEach((line) => {
    if (line.type !== 'registro1' || !line.ourNumber) {
      updatedLines.push(line)
      return
    }

    updatedLines.push({
      ...line,
      ourNumber: generateOurNumber({ bankCode, generatedLines: updatedLines }),
    })
  })

  return updatedLines
}

export default recalculateOurNumbers
