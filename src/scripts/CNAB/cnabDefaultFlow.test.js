import { describe, it, expect } from 'vitest'
import LineGenerationValidator from './lineGenerationValidator'
import generateLine from './lineFactory'
import ContentFormatter from './contentFormatter'

// Replica o fluxo do botão "Adicionar N linhas de registro1" em
// LineGenerator.jsx (valida uma vez, gera as linhas) seguido do download via
// ContentFormatter — o caso mais comum do gerador: abrir, adicionar
// registro1 e baixar, sem mexer em header/trailer manualmente. Cobre
// especificamente a regressão de não quebrar esse fluxo ao endurecer o
// LineGenerationValidator (unicidade de header/trailer).
describe('fluxo padrão: gerar apenas registro1 e baixar', () => {
  const validator = LineGenerationValidator()
  const formatter = ContentFormatter()

  it('permite adicionar registro1 como primeira linha sem header/trailer', () => {
    const validation = validator.validate({ generatedLines: [], type: 'registro1' })

    expect(validation.valid).toBe(true)
  })

  it('permite adicionar múltiplas linhas de registro1 em sequência', () => {
    let generatedLines = []

    for (let i = 0; i < 3; i++) {
      const validation = validator.validate({ generatedLines, type: 'registro1' })
      expect(validation.valid).toBe(true)

      const line = generateLine({ type: 'registro1', generatedLines, settings: {} })
      generatedLines = [...generatedLines, line]
    }

    expect(generatedLines).toHaveLength(3)
    expect(generatedLines.every((line) => line.type === 'registro1')).toBe(true)
  })

  it('baixa um arquivo válido com header e trailer injetados automaticamente', () => {
    const line = generateLine({ type: 'registro1', generatedLines: [], settings: {} })
    const content = formatter.format([line])
    const lines = content.split('\n')

    expect(lines).toHaveLength(3)
    expect(lines[0][0]).toBe('0')
    expect(lines[1][0]).toBe('1')
    expect(lines[2][0]).toBe('9')
    lines.forEach((formattedLine) => expect(formattedLine.length).toBe(444))
  })
})
