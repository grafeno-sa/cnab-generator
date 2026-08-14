import { updateSequentialNumbers } from './contentEditor'

// Header e trailer têm posição fixa no arquivo CNAB (header primeiro,
// trailer por último), mas nada garantia isso na hora de montar
// generatedLines: adicionar/editar um header depois de já existirem
// registro1 deixava ele no meio do array, na posição em que foi inserido.
// Reordena sempre que generatedLines muda, preservando a ordem relativa do
// restante das linhas.
const reorderHeaderAndTrailer = (generatedLines) => {
  const header = generatedLines.find((line) => line.type === 'header')
  const trailer = generatedLines.find((line) => line.type === 'trailer')
  const middle = generatedLines.filter((line) => line.type !== 'header' && line.type !== 'trailer')

  const ordered = [header, ...middle, trailer].filter(Boolean)

  return updateSequentialNumbers(ordered)
}

export default reorderHeaderAndTrailer
